from selenium.webdriver import Chrome
from selenium import webdriver
import re


pixels = 1000000000 #number of pixels wanted to scroll down
page = 'https://www.instagram.com/explore/tags/minecraft/' # link to explre page with search results

driver = webdriver.Chrome(executable_path = 'C:/Users/ryanh/Desktop/School/COS 397/Python/chromedriver_win32/chromedriver.exe')

driver.maximize_window()

driver.get(page)
#print(driver.title)

driver.execute_script("window.scrollTo(0, " + str(pixels) + ")")

#html = driver.page_source
#html = driver.execute_script("return document.body.innerHTML;")
html = driver.execute_script("return document.body.outerHTML;")

#print(html)

regex = re.compile('(\/p\/)(\w|_){11}(\/)')

f = open("innerhtmlbodyoutput.txt", "w", encoding= 'utf-8')
f.write(html)
f.close()

print(regex.match(html))

driver.quit()