from instascrape import *
from heady import headers

posts = []
posts.append(Post('https://www.instagram.com/p/CKl-PQtH_x_/'))
posts.append(Post('https://www.instagram.com/p/CKl1UUeFwl5/'))
posts.append(Post('https://www.instagram.com/p/CKbzj-YF953/'))
posts.append(Post('https://www.instagram.com/p/CKb4KJSHtZU/'))
posts.append(Post('https://www.instagram.com/p/CKmB6uXpPxq/'))

x = 1
for post in posts:
	post.scrape(headers=headers)
	post.download(f'scraped_post_{x}.jpg')
	print('Username: ' + post.username + '\n')
	print('Caption: ' + post.caption + '\n')
	x = x + 1
