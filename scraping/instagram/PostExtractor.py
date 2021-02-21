from instascrape import Post
from heady import headers
from queue import Queue
from datetime import datetime
from time import sleep
import threading
import csv
import os


# Defining what a thread will do when created
def scrape_post(url_q,counter=[0]):
    """ Post scraping worker function 

    Arguments:
    - url_q - reference to queue holding instagram post links
    - counter - (list<int>) keeping track of number of posts scraped 
        to generate ids

    """
    while True:
        post = Post(url_q.get())
        post.scrape(headers=headers)
        timestamp = post.timestamp
        full_name = post.full_name
        username = post.username
        caption = post.caption
        likes = post.likes
        location = post.location

        # Waits here until able to write to file
        while global_lock.locked():
            sleep(0.01)
            continue

        # Thread gains access to write to file
        global_lock.acquire()
        # Increment counter before writing to csv file
       
        counter[0] += 1
        post_id = str(counter[0]).zfill(5)

        writer.writerow({
            'Post ID' : post_id,
            'Timestamp' : timestamp,
            'Full Name' : full_name,
            'Username' : username,
            'Caption' : caption,
            'Likes' : likes,
            'Location' : location})
        # Then releases lock once done
        global_lock.release()

        # Checks media type to ensure corrent naming and extension 
        if post.is_video:
            post.download(f'{directories}videoID#{post_id}.mp4')
        else:
            post.download(f'{directories}pictureID#{post_id}.jpg')

        # Let queue know task is done
        url_q.task_done()

# Setting up directories for scraped data
directories = './scraped_posts/media/'
os.makedirs(directories,exist_ok=True)
# Creating the CSV file to be written to
csv_file = open('./scraped_posts/scrape.csv', 'x')
# Setting fields for csv format
fields = ['Post ID',
    'Timestamp',
    'Full Name',
    'Username',
    'Caption',
    'Likes',
    'Location']
# Object to write to csv file
writer = csv.DictWriter(csv_file,dialect='excel',fieldnames=fields)
writer.writeheader()
# Lock for threads writing to file, this ensures only one writing at a time
global_lock = threading.Lock()
# Used for serializing posts
counter = [0]
# Threadsafe queue for holding in instagram links
url_q = Queue(maxsize=0)

# Creating threads. In this case, creating three
for i in range(5):
    thread = threading.Thread(target=scrape_post, args=(url_q,))
    thread.setDaemon(True)
    thread.start()

def read_to_queue():
    # Reading in urls from frontier
    url_frontier = open("URLFrontier.txt","r")
    url = url_frontier.readline()
    while url:
        url_q.put(url)
        url = url_frontier.readline()
    url_frontier.close()

    url_q.join()