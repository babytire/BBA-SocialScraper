import tweepy
from tokens import consumer_key,consumer_secret_key,access_token,access_token_secret


def test_api_connection():
    auth = tweepy.OAuthHandler(consumer_key,consumer_secret_key)
    auth.set_access_token(access_token,access_token_secret)
    api = tweepy.API(auth)
    if api.verify_credentials():
        return True
    else:
        return False 

assert test_api_connection() == True, "Connection failed"
    