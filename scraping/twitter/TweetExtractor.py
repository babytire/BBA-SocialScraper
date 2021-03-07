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

    for i in range(len(tweets)):
        tweet_id = i
        created_at = tweets[i].created_at
        username = tweets[i].user.name
        screen_name = tweets[i].user.screen_name
        text = tweets[i].text
        retweet_count = tweets[i].retweet_count
        likes = tweets[i].favorite_count
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

        #Checking for media in the tweet
        if hasattr(tweets[i], "extended_entities"):
            count = 1
            #for all media in tweet
            for photo in tweets[i].extended_entities["media"]:
                #saving media link and file name
                if (photo['type'] == "photo"):
                    picture_name = "./scraped_posts/media/" + str(i) + "-" + str(count) + ".jpg"
                    link = photo['media_url_https']
                elif (photo['type'] == "video"):
                    picture_name = "./scraped_posts/media/" + str(i) + "-" + str(count) + ".mp4"
                    link = photo['video_info']['variants'][0]['url']
                elif (photo['type'] == "animated_gif"):
                    picture_name = "./scraped_posts/media/" + str(i) + "-" + str(count) + ".mp4"
                    link = photo['video_info']['variants'][0]['url']

                #download media
                r = requests.get(link)
                with open(picture_name, 'wb') as f:
                    f.write(r.content)

                count += 1

#scrape_tweet('#gif',10)
    