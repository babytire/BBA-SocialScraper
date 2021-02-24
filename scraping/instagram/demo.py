from InstagramKeywordURLExtractor import url_extractor
from PostExtractor import read_to_queue


tag = input('Enter hashtag to search by: ')
posts = input('Enter number of posts to get: ')

# Gathers urls for scraping here
url_extractor(tag,int(posts))
# Reads links to queue for threads
read_to_queue()

