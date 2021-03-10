import csv,os,threading, tweepy,re,requests
from tokens import api_key,api_secret_key,access_token,access_token_secret
from datetime import datetime

def scrape_tweet(query,count=50,earliest=None,latest=None):
    """ Tweet scraper function, collects tweets from Twitter's API and scrapes 
    the text as well as the media of a tweet if it exists. Function results in a 
    zip archive containing a CSV file with scraped text along with a directory for 
    the media that was scraped. 


    Arguments:
    - query - filter/rules of tweets to find. More on query structure here: 
    https://developer.twitter.com/en/docs/labs/recent-search/guides/search-queries
    - count - number of tweets to collect
    - earliest - earliest date in yyyyMMddHHmm format to search from, this is None by default
    - latest - latest date in yyyyMMddHHmm format to search to, this is None by default
    """
    
    ##### Setup starts #####

    # Passing in tokens
    auth = tweepy.OAuthHandler(api_key,api_secret_key)
    auth.set_access_token(access_token,access_token_secret)
    # Creating api object
    api = tweepy.API(auth)
    # Setup of directories for scrape data
    now = datetime.now().strftime("%d-%m-%Y_%H")
    main_directory = f'./{now}/'
    media_directory = f'{main_directory}media/'
    os.makedirs(media_directory,exist_ok=True)
    # Creating the CSV file to be written to
    csv_file = open(f'{main_directory}scrape.csv', 'w', encoding = "utf-8")
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

    ##### Setup ends #####

    # Call to api made here
    tweets = api.search_full_archive('dev',query=query,maxResults=count,fromDate=earliest,toDate=latest)

    for i in range(len(tweets)):
        # Collecting data points of interest
        tweet_id = i
        created_at = tweets[i].created_at
        username = tweets[i].user.name
        screen_name = tweets[i].user.screen_name
        text = tweets[i].text
        reply_count = tweets[i].reply_count
        retweet_count = tweets[i].retweet_count
        likes = tweets[i].favorite_count
        location = tweets[i].place
        url = 'https://twitter.com/i/web/status/' + tweets[i].id_str

        # Need to parse out date and time from created_at attribute
        split_date = re.search(r'(\d\d\-\d\d\-\d\d) (\d\d\:\d\d\:\d\d)',str(created_at))
        date = split_date.group(1)
        time = split_date.group(2)

        # Writing scraped data points to csv file
        writer.writerow({
            'Post ID' : tweet_id,
            'Date' : date,
            'Time' : time,
            'Username' : username,
            'Screen Name' : screen_name,
            'Tweet' : text,
            'Reply Count' : reply_count,
            'Retweet Count' : retweet_count,
            'Likes' : likes,
            'Location' : location,
            'Link' : url
        })

        #Checking for media in the tweet
        if hasattr(tweets[i], "extended_entities"):
            count = 1
            #for all media in tweet
            for photo in tweets[i].extended_entities["media"]:
                #saving media link and file name
                if (photo['type'] == "photo"):
                    picture_name = f"{media_directory}pictureID#{str(i).zfill(5)}-{str(count)}.jpg"
                    link = photo['media_url_https']
                elif (photo['type'] == "video"):
                    picture_name = f"{media_directory}videoID#{str(i).zfill(5)}-{str(count)}.mp4"
                    link = photo['video_info']['variants'][0]['url']
                elif (photo['type'] == "animated_gif"):
                    picture_name = f"{media_directory}gifID#{str(i).zfill(5)}-{str(count)}.mp4"
                    link = photo['video_info']['variants'][0]['url']

                #download media
                r = requests.get(link)
                with open(picture_name, 'wb') as f:
                    f.write(r.content)

                count += 1
    # Zipping directory
    os.system(f'zip -rqq twitter_scrape_from_{now}.zip {now}')
    # Removing the directory
    os.system(f'rm -rf {now}') 

def build_query (hashtags=None, locations=None, phrases=None):
    """ Query builder function for calling Twitter's API. Returns a query built
    from the parameters passed into it. 

    Arguments:
    - hashtags - String array of hashtags, this is None by default.
    - locations - String array of locations, this is None by default.
    - phrases - String array of phrases, this is None by default.

    """

    query = ""

    if (hashtags != None):
        query = query + "("
        for tag in hashtags:
            if (tag.find("#") != 0):
                tag = "#" + tag
            if (hashtags.index(tag) == len(hashtags) - 1):
                query = query + tag + ") "
            else:
                query = query + tag + " OR " 
        
    if (locations != None):
        query = query + "("
        for loc in locations:
            if (loc.find(" ") != -1):
                loc = "\"" + loc + "\""
            if (locations.index(loc) == len(locations) - 1):
                query = query + "place:" + loc + ") "
            else:
                query = query + "place:" + loc + " OR " 

    if (phrases != None):
        query = query + "("
        for phrase in phrases:
            if (phrases.index(phrase) == len(phrases) - 1):
                query = query + "\"" + phrase + "\"" + ") "
            else:
                query = query + "\"" + phrase + "\"" + " OR " 
    
    return query