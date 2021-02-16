from instascrape import *
from heady import headers

test_post_1 = Post('https://www.instagram.com/p/CLHNJs1r3Mo/')
test_post_2 = Post('https://www.instagram.com/p/CLG9IuWAayv/')

def scrape_it_up(post):
    post.scrape(headers=headers)
    if post.is_video():
        post.download(f'post.mp4')
    else:
        post.download(f'post.png')

    print('Username: ' + post.username + '\n')
    print('Caption: ' + post.caption + '\n')
    print('Likes: ' + str(post.likes) + '\n')
    print('Timestamp: ' + str(post.timestamp) + '\n')
    print('Location: ' + str(post.location) + '\n')
    print('\n')

scrape_it_up(test_post_1)
scrape_it_up(test_post_2)
