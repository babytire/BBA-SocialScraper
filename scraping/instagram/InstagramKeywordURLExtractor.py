from time import sleep
from selenium import webdriver
import re
from heady import insta_username,insta_password

<<<<<<< HEAD
pixels = 1080   #number of pixels to scroll down
posts = 25      #number of posts to scrape
page = 'https://www.instagram.com/explore/tags/minecraft/' # link to explre page with search results
listOfLinks = [] #List of links being scraped
regex = re.compile('(https:\/\/www\.instagram\.com\/p\/)(\w|_){11}(\/)')  #regex for matching only links to posts
=======
# InstagramURLExtractor - Scrapes links to instagram posts of the internet and compiles them into a text document. 
>>>>>>> 91d96fcf1e45ea21732245a718754aee4b91c683

# search - your search term weather its a hashtag, profile, or location
#        - if scraping a hashtag, dont include the #
#        - if scraping a location, this must be the link to the location explore page on instagram 
#           (example: www.instagram.com/explore/locations/498870164/new-delhi/)
# posts - number of posts to be scraped
# category - what type of search your doing 'hashtag', 'person', or 'location'
# category2 - If searching a person, what type of posts you are scraping 'posts', 'reels', 'igtv', or 'tagged'


def InstagramkeywordURLExtractor(search, posts = 100, category = None, category2 = None):

    pixels = 1080   #number of pixels to scroll down
    listOfLinks = [] #List of links being scraped

    if(category == 'hashtag'):
        page = 'https://www.instagram.com/explore/tags/' + search + '/'
        regex = re.compile('(https:\/\/www\.instagram\.com\/p\/)(\w|_){11}(\/)')

<<<<<<< HEAD
username_input.send_keys(insta_username) #Replace 'Username' with Instagram username
password_input.send_keys(insta_password) #Replace 'Password' with Instagram password
=======
    elif (category == 'person'):
        
        if (category2 == 'reels'):
            page = 'https://www.instagram.com/' + search + '/reels/'
            regex = re.compile('(https:\/\/www\.instagram\.com\/reel\/)(\w|_){11}(\/)')
>>>>>>> 91d96fcf1e45ea21732245a718754aee4b91c683

        elif (category2 == 'igtv'):
            page = 'https://www.instagram.com/' + search + '/channel/'
            regex = re.compile('(https:\/\/www\.instagram\.com\/tv\/)(\w|_){11}(\/)')

        elif (category2 == 'tagged'):
            page = 'https://www.instagram.com/' + search + '/tagged/'
            regex = re.compile('(https:\/\/www\.instagram\.com\/p\/)(\w|_){11}(\/)')

        else:
            page = 'https://www.instagram.com/' + search + '/'
            regex = re.compile('(https:\/\/www\.instagram\.com\/p\/)(\w|_){11}(\/)')

    elif (category == 'location'):
        page = search
        regex = re.compile('(https:\/\/www\.instagram\.com\/p\/)(\w|_){11}(\/)')


    #Load Chromedriver
    browser = webdriver.Chrome(executable_path = 'C:/Users/ryanh/Desktop/School/COS 397/Python/chromedriver_win32/chromedriver.exe') #Replace with path to chromedriver.exe
    browser.implicitly_wait(5)

    #Load and login to Instagram
    browser.get('https://www.instagram.com/')

    sleep(2)

    username_input = browser.find_element_by_css_selector("input[name='username']")
    password_input = browser.find_element_by_css_selector("input[name='password']")

    username_input.send_keys("Username") #Replace 'Username' with Instagram username
    password_input.send_keys("Password") #Replace 'Password' with Instagram password

    login_button = browser.find_element_by_xpath("//button[@type='submit']")
    login_button.click()

    sleep(5)

    #Load page to be scraped
    browser.get(page)

    #Iterate till requested # of posts scraped
    lastx = 0
    count = 0
    x = 0
    while(x < posts):
        #scroll down page, get links
        browser.execute_script("window.scrollBy(0, " + str(pixels) + ")")

        elems = browser.find_elements_by_xpath("//a[@href]")

        #Sometimes theres an error where the page hasn't loaded posts yet, so you have to wait a bit. Thats why theres this try catch block.
        try:

            #for each link, if its a link to a post and no been scraped yet, add it to the list
            for elem in elems:
                if elem.get_attribute("href") not in listOfLinks and regex.match(elem.get_attribute("href")) != None:
                    listOfLinks.append(elem.get_attribute("href"))
                    x += 1
                    count = 0
                    print(x)
            #If we havent scraped new links in 50 iterations, there are no more
            if x == lastx and count == 50:
                break
            else:
                lastx = x
                count += 1

        except:
            sleep(0.1)

    #Write scraped post links to URLFrontier text document
    f = open("URLFrontier.txt", "w", encoding= 'utf-8')

    for x in listOfLinks:   
        f.write(x + "\n")
    f.close()

    browser.close()
