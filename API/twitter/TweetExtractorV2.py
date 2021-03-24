import csv,os,threading,tweepy,re,requests,pickle
from TwitterConfig import s_consumer_key, s_consumer_secret_key

auth = tweepy.AppAuthHandler(s_consumer_key,s_consumer_secret_key)
api = tweepy.API(auth)

def make_pickles(query):
    file_counter = 1
    for page in tweepy.Cursor(api.search,q=query).pages(25):
        temp = []
        for status in page:
            temp.append(status)
        pickle.dump(temp, open(f'pickle{file_counter}.p','wb'))
        file_counter += 1
        if file_counter % 6 == 0:
            file_counter = 1

def load_pickles():
    pass
make_pickles('eggs')