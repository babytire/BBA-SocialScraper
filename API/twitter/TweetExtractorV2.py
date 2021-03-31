"""
Created by: Griffin Fluet and Ryan Handlon
Created on: March 2021
Version: 2.0
Description: This file contains two functions for scraping Twitter. One for 
building queries to pass into the api call. Another for making the call to the 
api and scraping the data and getting to ready for archiving.
"""
import csv,os,pickle,re,requests,tweepy
from datetime import datetime as o_datetime
from TwitterConfig import s_consumer_key, s_consumer_secret_key

class ScrapeHelper:
    def __init__(self,o_user):
        self._v_make_api_connection()
        self._v_set_working_directories(o_user)
    def _v_make_api_connection(self):
        o_auth = tweepy.AppAuthHandler(s_consumer_key,s_consumer_secret_key)
        o_api = tweepy.API(o_auth)
        self.o_api = o_api
    def _v_set_working_directories(self,o_user):
        s_now = o_datetime.now().strftime("%d-%m-%Y_%H")
        self.s_top_directory = f'./{o_user}_{s_now}/'
        self.s_pickle_directory = f'{self.s_top_directory}pickles/'
        self.s_media_directory = f'{self.s_top_directory}media/'

def v_query_api(s_query,o_scrape_helper):
    """
    takes in query and scrape helper object
    makes call to api and results are returned one "page" at a time
    each page is written to a pickle file
    scrape function is called once complete
    """
    i_file_count = 0
    os.makedirs(o_scrape_helper.s_pickle_directory,exist_ok = True)
    for o_page in tweepy.Cursor(o_scrape_helper.o_api.search,q=s_query).pages(3):
        pickle.dump(o_page, open(f'{o_scrape_helper.s_pickle_directory}pickle{i_file_count}.p', 'wb'))
        i_file_count += 1
    v_scrape_tweets(i_file_count,o_scrape_helper)


def v_scrape_tweets(i_pickles,o_scrape_helper):
    """

    """
    i_id = 1
    # Creation of directories for scraped data
    os.makedirs(o_scrape_helper.s_media_directory,exist_ok=True)
    os.makedirs(o_scrape_helper.s_pickle_directory,exist_ok=True)
    # Creating the CSV file to be written to
    f_csv = open(f'{o_scrape_helper.s_top_directory}scrape.csv', 'w', encoding = "utf-8")
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
    for i in range(i_pickles):
        o_page = pickle.load(open(f'{o_scrape_helper.s_pickle_directory}pickle{i}.p', 'rb'))
        for o_tweet in o_page:
            i_tweet_id = i_id
            i_id += 1
            s_created_at = o_tweet.created_at
            s_username = o_tweet.user.name
            s_screen_name = o_tweet.user.screen_name
            s_text = o_tweet.text
            i_reply_count = 'na'
            #i_reply_count = tweet.reply_count
            i_retweet_count = 'na'
            #i_retweet_count = tweet.retweet_count
            i_likes = o_tweet.favorite_count
            s_location = o_tweet.place
            s_url = 'https://twitter.com/i/web/status/' + o_tweet.id_str

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

            # Checking for media in the extended_entities attribute of tweet object
            # More info about the extended_entities attribute can be found here:
            # https://developer.twitter.com/en/docs/twitter-api/v1/data-dictionary/object-model/extended-entities
            if hasattr(o_tweet, "extended_entities"):
                i_media_count = 1       # Integer, used to index media names should the tweet object have more than one
                # For each piece of media in extended entities
                for o_media in o_tweet.extended_entities["media"]:
                    # Find media type, build file name with associated type and ID, and save link to media in s_media_link
                    if (o_media['type'] == "photo"):
                        s_media_name = f"{o_scrape_helper.s_media_directory}photoID#{str(i_tweet_id).zfill(5)}-{str(i_media_count)}.jpg"
                        s_media_link = o_media['media_url_https']
                    elif (o_media['type'] == "video"):
                        s_media_name = f"{o_scrape_helper.s_media_directory}videoID#{str(i_tweet_id).zfill(5)}-{str(i_media_count)}.mp4"
                        s_media_link = o_media['video_info']['variants'][0]['url']
                    elif (o_media['type'] == "animated_gif"):
                       # Gif's are saved as .mp4's because that's how twitter stores them, as shown in the extended_entities object link above
                        s_media_name = f"{o_scrape_helper.s_media_directory}gifID#{str(i_tweet_id).zfill(5)}-{str(i_media_count)}.jpg"
                        s_media_link = o_media['video_info']['variants'][0]['url']

                    # Request s_media_link and download it's contents to s_media_name
                    o_request = requests.get(s_media_link)
                    with open(s_media_name, 'wb') as f_media:
                        f_media.write(o_request.content)

                    i_media_count += 1



def s_build_query (l_hashtags=None, l_locations=None, l_phrases=None):
    """ 
    Query builder function, builds a query specifying the 
    types of tweets wished to be returned when query is passed to 
    a tweet search using the Twitter API. Function results in a 
    string being returned that is the built query.
    Info on query string being built can be found here:
    https://developer.twitter.com/en/docs/labs/recent-search/guides/search-queries

    No more than 10 total hashtags, locations, and phrases should be inputted.

    Arguments:
    - l_hashtags  - list   - a list of strings, the strings representing hashtags to be searched by
                           - strings should be in the format of "#hashtag" or "hashtag" 
                           - This is None by defalt
    - l_locations - list   - a list of strings, the strings representing locations to be searched by
                           - strings should be in the format of "New York" or ""New York"" 
                           - This is None by defalt
    - l_phrases   - list   - a list of strings, the strings representing phrases to be searched by
                           - strings should be in the format of "I hate Mondays!" or ""I hate Mondays!"" 
                           - This is None by defalt

    Output: 
    - s_query     - string - the query to be used to search tweets
                           - final query will look like "(#hashtag OR #hashtag) ("location" OR "location") ("phrase" OR "phrase")"
                    
    """

    s_query = ""      # String, holds query as it's being built

    # If there are hashtags to be added to query
    if (l_hashtags != None and l_hashtags != [""] and l_hashtags != []):
        s_query = s_query + "("
        # Iterate through each hashtag 
        for s_tag in l_hashtags:
            # Store original hashtag in case it needs do be formatted
            s_old_tag = s_tag
            # Add "#" in front of hashtag if not already there
            if (s_tag.find("#") != 0):
                s_tag = "#" + s_tag
            # If last hashtag add hashtag + ")", else add hashtag + " OR"
            if (l_hashtags.index(s_old_tag) == len(l_hashtags) - 1):
                s_query = s_query + s_tag + ") "
            else:
                s_query = s_query + s_tag + " OR "

    # If there are locations to be added to query
    if (l_locations != None and l_locations != [""] and l_locations != []):
        s_query = s_query + "("
        # iterate through each location 
        for s_loc in l_locations:
            s_old_loc = s_loc
            # Surround locations in quotes if not already there
            if not(s_loc.startswith("\"") and s_loc.endswith("\"")):
                s_loc = "\"" + s_loc + "\""
            # If last hashtag add hashtag + ")", else add hashtag + " OR"
            if (l_locations.index(s_old_loc) == len(l_locations) - 1):
                s_query = s_query + "place:" + s_loc + ") "
            else:
                s_query = s_query + "place:" + s_loc + " OR " 

    # If there are phrases to be added to query
    if (l_phrases != None and l_phrases != [""] and l_phrases != []):
        s_query = s_query + "("
        # Iterate through each phrase 
        for s_phrase in l_phrases:
            s_old_phrase = s_phrase
            # Surround phrase in quotes if not already there
            if not(s_phrase.startswith("\"") and s_phrase.endswith("\"")):
                s_phrase = "\"" + s_phrase + "\""
            # If last phrase add phrase + ")", else add phrase + " OR"
            if (l_phrases.index(s_old_phrase) == len(l_phrases) - 1):
                s_query = s_query + s_phrase + ") "
            else:
                s_query = s_query + s_phrase + " OR " 
    
    # Return query
    return s_query

o_scrape_helper = ScrapeHelper('griffin')
v_query_api('eggs',o_scrape_helper)
