import csv,os,threading,tweepy,re,requests,pickle
from tokens import api_key,api_secret_key,access_token,access_token_secret

auth = tweepy.OAuthHandler(api_key,api_secret_key)
auth.set_access_token(access_token,access_token_secret)
api = tweepy.API(auth)



def make_pickles(query,count):
    file_counter = 1
    for page in tweepy.Cursor(api.search,q=query,count=count).pages(25):
        temp = []
        for status in page:
            temp.append(status)
        pickle.dump(temp, open(f'pickle{file_counter}.p','wb'))
        file_counter += 1
        if file_counter % 6 == 0:
            file_counter = 1

def load_pickles():
    pass
make_pickles('eggs',50)