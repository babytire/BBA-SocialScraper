from instascrape import *
from heady import headers
import threading, queue

url_frontier = open("URLFrontier.txt","r")

url_q = queue.Queue(url_frontier.readlines())

def worker():
    while True:
        post = Post(url_q.get())
        post.scrape(headers=headers)
        print(post.username)
        url_q.task_done()

threading.Thread(target=worker, daemon=True).start()

for post in range(209):
    url_q.put(post)

url_q.join()
print("finished")




