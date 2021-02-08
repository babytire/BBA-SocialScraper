from time import sleep
from selenium import webdriver
import re

pixels = 1080   #number of pixels to scroll down
posts = 200     #number of posts to scrape
page = 'https://www.instagram.com/explore/tags/minecraft/' # link to explre page with search results
listOfLinks = [] #List of links being scraped
regex = re.compile('(https:\/\/www\.instagram\.com\/p\/)(\w|_){11}(\/)')  #regex for matching only links to posts

#Load Chromedriver
browser = webdriver.Chrome(executable_path = 'C:/path/to/chromedriver.exe') #Replace with path to chromedriver.exe
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
                print(x)
    except:
        sleep(0.1)

#Write scraped post links to URLFrontier text document
f = open("URLFrontier.txt", "w", encoding= 'utf-8')

for x in listOfLinks:   
    f.write(x + "\n")
f.close()

browser.close()