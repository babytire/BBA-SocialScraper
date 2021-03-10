To run instascrape tests, 

First install by running `pip install insta-scrape`

Make sure to include the heady.py file in the same directory as the instagram directory.
You can find heady.py within our discord in the resources text channel. Please make sure to add your session id where it says `YOUR_SESSION_ID`.
Your own seesion id can be found by visting instagram and opening inspector. It should be listed somewhere under cookies. 

Once you've added your own session id you are able to run both tests by calling them with python.

To run InstagramKeywordURLExtractor,

Google Chrome must be installed and the Chromium Web driver must be downloaded and put on system path. Instructions for the latter can be found here 'https://www.selenium.dev/documentation/en/webdriver/driver_requirements/'

Please add the path to your Chromedriver where it says 'C:/path/to/chromedriver.exe' as well as your Instagram Username and Password where it says "Username" and "Password"

What hashtag and the number of posts you are scraping can be changed by altering their associated variables. 

Output will be provided in "URLFrontier.txt" text file in the same directory this was run in.