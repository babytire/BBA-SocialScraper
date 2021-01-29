import tweepy
import Tokens

#Passing in tokens
auth = tweepy.OAuthHandler(Tokens.API_key,Tokens.API_secret_key)
auth.set_access_token(Tokens.Access_token,Tokens.Access_token_secret)

# Creating api object
api = tweepy.API(auth)

def testAuth():
	try:
		api.verify_credentials()
		print('Authentication Success')
	except:
		print('Error at authentication')

testAuth()

def getAUser(name):
	user = api.get_user(name)
	print('Name: ' + user.name)
	print('Desc: ' + user.description)
	print('Location: ' + user.location)

	print('Last 20 Followers: ')
	for follower in user.followers():
		print(follower.name)

query = input('Enter phrases or hashtags separated by commas: ')
count = input('Max tweets to find?: ')

tweets = api.search(q=query,count=count,tweet_mode="extended")

for x in tweets:
	print('\n' + x.full_text + '\n')
	print(x)





