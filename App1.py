import time
# import requests
# import os
# import csv

from urllib.request import Request, urlopen
import urllib.parse
import time
import pandas
import env

from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException,StaleElementReferenceException

# import env
browser = webdriver.Chrome()

def get_article_url():
    SCROLL_PAUSE_TIME = 1.0
    reallink = []

    search = input('Input keyword :')
    search = urllib.parse.quote(search)
    url = 'https://www.instagram.com/explore/tags/' + str(search) + '/'
    browser = webdriver.Chrome()
    browser.get(url)
    time.sleep(3)

    while True:
        pageString = browser.page_source
        bs0bj = BeautifulSoup(browser.page_source, "html.parser")

        for link1 in bs0bj.find_all(name='div',attrs={"class":"Nnq7C weEfm"}):
            title = link1.select('a')[0]
            real = title.attrs=['href']
            reallink.append(real)
            title = link1.select('a')[1]
            real = title.attrs=['href']
            reallink.append(real)
            title = link1.select('a')[2]
            real = title.attrs=['href']
            reallink.append(real)

        last_height = browser.execute_script("return document.body.scrollHeight")
        browser.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(SCROLL_PAUSE_TIME)
        new_height = browser.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            browser.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(SCROLL_PAUSE_TIME)
            new_height = browser.execute_script("return document.body.scrollHeight")
            if new_height == last_height:
                break

            else:
                last_height = new_height
                continue
    
    csvtext = []

    reallinknum = len(reallink)
    print("총"+str(reallinknum)+"개의 데이터.")
    
    try:
        for i in range(0, reallinknum):
            csvtext.append([])
            req = Request('https://www.instagram.com/p' + reallink[i], headers={env.User_Agent})

            webpage = urlopen(req).read()
            soup = BeautifulSoup(webpage, "html.parser", from_encoding='utf-8-sig')
            soup1 = soup.find("meta", attrs={"property":"og:description"})

            reallink1 = soup['context']
            reallink1 = reallink[reallink1.find("@")+1:reallink1.find(")")]
            reallink1 = reallink1[:20]
            if reallink1 =='':
                reallink1 = 'Null'
            csvtext[i].append(reallink1)

            for reallink2 in soup.find_all("meta", attrs={"property":"instapp:hashtags"}):
                reallink2 = reallink2['content']
                csvtext[i].append(reallink2)
            
            print(str(i+1)+"개의 데이터 받아오는 중.")
            print(csvtext)
            data = pandas.DataFrame(csvtext)
            data.to_csv('insta.txt', encoding='utf-8')  
    except:
        print("오류발생"+str(i+1)+"개의 데이터를 저장합니다.")
        data = pandas.DataFrame(csvtext)
        data.to_csv('insta.txt', encoding='utf-8') 

    print("저장성공")  

def get_img_url():
    temp = []
    myurls = ['mbti_lab']
    browser = webdriver.Chrome()
    
    for myurl in myurls:
        url = "https://www.instagram.com/" + myurl
        browser.get(url)

        while True:
            soup = BeautifulSoup(browser.page_source, 'html.parser')
            imgs = soup.select('img')[1]
            imgs = imgs.attrs['src']
            temp.append(imgs)
           
            try:
                browser.find_element_by_class_name("coreSpriteRightChevron").click()
            except NoSuchElementException:
                break
            
        browser.close()
        print("Success")
        
        return temp

if __name__ == "__main__":
    get_article_url()

    