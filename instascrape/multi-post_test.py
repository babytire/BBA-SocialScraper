from instascrape import *
import heady

posts = []
posts.append(Post('https://www.instagram.com/p/CKl-PQtH_x_/'))
posts.append(Post('https://www.instagram.com/p/CKl1UUeFwl5/'))
posts.append(Post('https://www.instagram.com/p/CKbzj-YF953/'))
posts.append(Post('https://www.instagram.com/p/CKb4KJSHtZU/'))
posts.append(Post('https://www.instagram.com/p/CKmB6uXpPxq/'))

for post in posts:
	post.scrape(headers=heady.headers)
	print('Username: ' + post.username + '\n')
	print('Caption: ' + post.caption + '\n')
