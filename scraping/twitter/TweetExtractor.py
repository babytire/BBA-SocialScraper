import csv
import os
import threading
import tweepy
import re
from queue import Queue
from time import sleep
from tokens import api_key,api_secret_key,access_token,access_token_secret
import requests


#Passing in tokens
auth = tweepy.OAuthHandler(api_key,api_secret_key)
auth.set_access_token(access_token,access_token_secret)

# Creating api object
api = tweepy.API(auth)
directories = './scraped_posts/media/'
os.makedirs(directories,exist_ok=True)
# Creating the CSV file to be written to
csv_file = open('./scraped_posts/scrape.csv', 'w', encoding = "utf-8")
# Setting fields for csv format
fields = [
    'Post ID',
    'Date',
    'Time',
    'Username',
    'Screen Name',
    'Tweet',
    'Reply Count',
    'Retweet Count',
    'Likes',
    'Location',
    'Link']
# Object to write to csv file
writer = csv.DictWriter(csv_file,dialect='excel',fieldnames=fields)
writer.writeheader()

def scrape_tweet(query,count):
    tweets = api.search(q=query,count=count)

    for i in range(len(tweets)):
        tweet_id = i
        created_at = tweets[i].created_at
        username = tweets[i].user.name
        screen_name = tweets[i].user.screen_name
        text = tweets[i].text
        #reply_count = tweets[i].reply_count
        retweet_count = tweets[i].retweet_count
        likes = tweets[i].favorite_count
        #location = tweets[i].place.country
        url = 'https://twitter.com/i/web/status/' + tweets[i].id_str

        split_date = re.search(r'(\d\d\-\d\d\-\d\d) (\d\d\:\d\d\:\d\d)',str(created_at))
        date = split_date.group(1)
        time = split_date.group(2)

        writer.writerow({
            'Post ID' : tweet_id,
            'Date' : date,
            'Time' : time,
            'Username' : username,
            'Screen Name' : screen_name,
            'Tweet' : text,
            'Retweet Count' : retweet_count,
            'Likes' : likes,
            'Link' : url
        })





scrape_tweet('biden',10)
    



