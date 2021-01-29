from instascrape import *

test_post = Post('https://www.instagram.com/p/CKFKyULrAWm/')
test_hashtag = Hashtag('https://www.instagram.com/explore/tags/minecraft/')

test_post.scrape()
test_hashtag.scrape()
recent = test_hashtag.get_recent_posts(5)
test_post.download(f'post.png')
print('Username: ' + test_post.username + '\n')
print('Caption: ' + test_post.caption + '\n')
print('Likes: ' + str(test_post.likes) + '\n')
print('Timestamp: ' + str(test_post.timestamp) + '\n')
print('Location: ' + str(test_post.location) + '\n')
print('\n')

print(len(recent))
