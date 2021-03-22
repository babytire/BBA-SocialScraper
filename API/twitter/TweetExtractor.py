"""
Created by: Griffin Fluet
Created on: Feb 2021
Version: 1.0
Description: This file contains two functions for scraping Twitter. One for 
building queries to pass into the api call. Another for making the call to the 
api and scraping the data and getting to ready for archiving.
"""
import csv, os, re, requests, threading, tweepy, xlsxwriter
from TwitterConfig import s_consumer_key, s_consumer_secret_key, s_access_token, s_access_token_secret
from datetime import datetime

def v_scrape_tweets(s_query, i_count=50, s_earliest=None, s_latest=None):
    """ 
    Tweet scraper function, collects tweets from Twitter's API and scrapes 
    the text as well as the media of a tweet if it exists. Function results in a 
    zip archive containing a CSV file with scraped text along with a directory for 
    the media that was scraped. 

    Arguments:
    - s_query - string - filter/rules of tweets to find. More on query structure here: 
    https://developer.twitter.com/en/docs/labs/recent-search/guides/search-queries
    - i_count - integer - number of tweets to collect
    - s_earliest - string - earliest date in yyyyMMddHHmm format to search from, this is None by default
    - s_latest - string - latest date in yyyyMMddHHmm format to search to, this is None by default

    Output: Function does not return a value.
    """
    
    # Making connection to API
    o_auth = tweepy.OAuthHandler(s_consumer_key,s_consumer_secret_key)
    o_auth.set_access_token(s_access_token,s_access_token_secret)
    # Creating api object to call tweepy functions
    o_api = tweepy.API(o_auth)
    # Setup of directories for scraped data
    s_now = datetime.now().strftime("%d-%m-%Y_%H")
    s_main_directory = f'./{s_now}/'
    s_media_directory = f'{s_main_directory}media/'
    os.makedirs(s_media_directory,exist_ok=True)
    # Creating the CSV file to be written to
    f_csv = open(f'{s_main_directory}scrape.csv', 'w', encoding = "utf-8")
    # Setting fields for csv formatting
    l_fields = [
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
    o_writer = csv.DictWriter(f_csv,dialect='excel',fieldnames=l_fields)
    o_writer.writeheader()

    # Call to api made here, this returns a list of tweet objects
    # Checkout the attributes of a tweet object here: 
    # https://developer.twitter.com/en/docs/twitter-api/v1/data-dictionary/object-model/tweet
    # Need to pass in the developer environment here to gain access to full archive
    # You can find more about the developer environment on the developer portal:
    # https://developer.twitter.com/en
    l_tweets = o_api.search_full_archive('dev',query=s_query,maxResults=i_count,fromDate=s_earliest,toDate=s_latest)
    
    # Using i as the iterative loop value and tweet id
    for i in range(len(l_tweets)):
        # Add 1 so counting is human like 
        i_tweet_id = i + 1
        s_created_at = l_tweets[i].created_at
        s_username = l_tweets[i].user.name
        s_screen_name = l_tweets[i].user.screen_name
        s_text = l_tweets[i].text
        i_reply_count = l_tweets[i].reply_count
        i_retweet_count = l_tweets[i].retweet_count
        i_likes = l_tweets[i].favorite_count
        s_location = l_tweets[i].place
        s_url = 'https://twitter.com/i/web/status/' + l_tweets[i].id_str

        # Need to parse out date and time from created_at attribute
        o_split_date = re.search(r'(\d\d\-\d\d\-\d\d) (\d\d\:\d\d\:\d\d)',str(s_created_at))
        s_date = o_split_date.group(1)
        s_time = o_split_date.group(2)

        # Writing scraped data points to csv file
        o_writer.writerow({
            'Post ID' : i_tweet_id,
            'Date' : s_date,
            'Time' : s_time,
            'Username' : s_username,
            'Screen Name' : s_screen_name,
            'Tweet' : s_text,
            'Reply Count' : i_reply_count,
            'Retweet Count' : i_retweet_count,
            'Likes' : i_likes,
            'Location' : s_location,
            'Link' : s_url
        })

        #Checking for media in the tweet
        if hasattr(l_tweets[i], "extended_entities"):
            media_count = 1
            #for all media in tweet
            for photo in l_tweets[i].extended_entities["media"]:
                #saving media link and file name
                if (photo['type'] == "photo"):
                    picture_name = f"{s_media_directory}pictureID#{str(i_tweet_id).zfill(5)}-{str(media_count)}.jpg"
                    link = photo['media_url_https']
                elif (photo['type'] == "video"):
                    picture_name = f"{s_media_directory}videoID#{str(i_tweet_id).zfill(5)}-{str(media_count)}.mp4"
                    link = photo['video_info']['variants'][0]['url']
                elif (photo['type'] == "animated_gif"):
                    picture_name = f"{s_media_directory}gifID#{str(i_tweet_id).zfill(5)}-{str(media_count)}.mp4"
                    link = photo['video_info']['variants'][0]['url']

                #download media
                r = requests.get(link)
                with open(picture_name, 'wb') as f:
                    f.write(r.content)

                media_count += 1
    
    # Zipping directory
    os.system(f'zip -r -qq -9 twitter_scrape_from_{s_now}.zip {s_now}')
    # Removing the directory
    os.system(f'rm -rf {s_now}') 

def build_query (hashtags=None, locations=None, phrases=None):
    """ Query builder function for calling Twitter's API. Returns a query built
    from the parameters passed into it. 

    Arguments:
    - hashtags - String array of hashtags, this is None by default.
    - locations - String array of locations, this is None by default.
    - phrases - String array of phrases, this is None by default.

    """

    query = ""

    if (hashtags != None and hashtags != [""] and hashtags != []):
        query = query + "("
        for tag in hashtags:
            old_tag = tag
            if (tag.find("#") != 0):
                tag = "#" + tag
            if (hashtags.index(old_tag) == len(hashtags) - 1):
                query = query + tag + ") "
            else:
                query = query + tag + " OR " 
    if (locations != None and locations != [""] and locations != []):
        query = query + "("
        for loc in locations:
            old_loc = loc
            if not(loc.startswith("\"") and loc.endswith("\"")):
                loc = "\"" + loc + "\""
            if (locations.index(old_loc) == len(locations) - 1):
                query = query + "place:" + loc + ") "
            else:
                query = query + "place:" + loc + " OR " 

    if (phrases != None and phrases != [""] and phrases != []):
        query = query + "("
        for phrase in phrases:
            old_phrase = phrase
            if not(phrase.startswith("\"") and phrase.endswith("\"")):
                phrase = "\"" + phrase + "\""
            if (phrases.index(old_phrase) == len(phrases) - 1):
                query = query + phrase + ") "
            else:
                query = query + phrase + " OR " 
    
    return query