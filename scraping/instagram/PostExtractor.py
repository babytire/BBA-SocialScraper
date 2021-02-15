from instascrape import *
from heady import headers
from threading import Thread
from queue import Queue


# Defining what a "worker" will do
def worker(url_q):
    while True:
        #print("in worker")
        post = Post(url_q.get())
        post.scrape(headers=headers)
        print(str(post.username) + '\n')
        print(str(post.caption) + '\n')
        print(str(post.likes) + '\n')
        print(str(post.timestamp) + '\n')
        url_q.task_done()


url_q = Queue(maxsize=0)

# Creating workers. In this case, creating three
for i in range(3):
    thread = Thread(target=worker, args=(url_q,))
    thread.setDaemon(True)
    thread.start()

# Reading in urls from frontier
url_frontier = open("URLFrontier.txt","r")
url = url_frontier.readline()
while url:
    url_q.put(url)
    url = url_frontier.readline()
url_frontier.close()


url_q.join()




