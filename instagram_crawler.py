import urllib.request
import selenium.webdriver as webdriver
import urllib.parse
import time
import env
import os 

from selenium.common.exceptions import NoSuchElementException 
from selenium import webdriver
from bs4 import BeautifulSoup
from urllib.request import Request, urlopen

def my_url_list(browser):
    search = input("크롤링한 인스타그램의 아이디를 입력하세요: " )
    limit = int(input("크롤링할 게시글 수 입력 (0을 입력하면 끝까지 크롤링) : " ))
    url = 'https://www.instagram.com/'
    browser.get(url)
    browser.maximize_window()
    id_box = browser.find_element_by_xpath("//*[@id='loginForm']/div/div[1]/div/label/input")
    password_box = browser.find_element_by_xpath("//*[@id='loginForm']/div/div[2]/div/label/input")
    id_box.send_keys(env.instagram_user_id)
    password_box.send_keys(env.instagram_user_password)
    browser.find_element_by_xpath("//*[@id='loginForm']/div/div[3]/button/div").click()
    time.sleep(3)

    url = 'https://www.instagram.com/' + str(search)
    stop = False

    browser.get(url) 
    time.sleep(5)

    SCROLL_PAUSE_TIME = 4.0
    reallink = []

    while True:
        pageString = browser.page_source
        bsObj = BeautifulSoup(pageString, "lxml")
        
        for link1 in bsObj.find_all(name="div",attrs={"class":"Nnq7C weEfm"}):
                try:
                    title = link1.select('a')[0] 
                    if title:
                        real = title.attrs['href']
                        reallink.append(real)

                    if limit != 0 and limit == len(reallink):
                        stop = True
                        break
                    
                    title = link1.select('a')[1]
                    if title: 
                        real = title.attrs['href']
                        reallink.append(real) 

                    if limit != 0 and limit == len(reallink):
                        stop = True
                        break

                    title = link1.select('a')[2] 
                    if title:
                        real = title.attrs['href']
                        reallink.append(real)
                    
                    if limit != 0 and limit == len(reallink):
                        stop = True
                        break
                except:
                    break

        if stop == True:
            break

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

    reallink = list(set(reallink))
    reallinknum = len(reallink)
    print(str(reallinknum)+"개의 URL")
    return reallink

def get_img_url():
    temp = {'img' : [], 'video' : []}
    browser = webdriver.Chrome()
    myurl = my_url_list(browser)
    for i in myurl:
        url = 'https://www.instagram.com/'+str(i)
        browser.get(url)

        while(1):
            time.sleep(1)
            pageString = browser.page_source 
            soup = BeautifulSoup(pageString, "lxml")
            try:
                videos = soup.select('.tWeCl')
                videos = soup.select('src')
                print(video)
                temp['video'] += [videos]
            except:
                imgs = soup.select('img')[1]
                imgs = imgs.attrs['src']
                if imgs:
                    temp['img'] += [imgs]
                else:
                    imgs = imgs.attrs['srcset']
                    temp['img'] += [imgs]
            try :
                browser.find_element_by_class_name("coreSpriteRightChevron").click()

            except NoSuchElementException :
                break

    browser.close()
    print('Finish')
    return temp

if __name__ == '__main__':
    
    myimg = get_img_url()

    if myimg['img']:
        num = 0
        imgs = list(set(myimg['img']))
        print(f"총 {len(imgs)}개의 이미지")

        for img in imgs:
            urllib.request.urlretrieve(img,'save_insta_image'+str(num)+'.png')
            num += 1
            print(f"{num}/{len(imgs)}")

    if myimg['video']:
        num = 0
        videos = list(set(myimg['video']))
        print(f"총 {len(videos)}개의 동영상 수집")

        for video in videos:
            urllib.request.urlretrieve(video,'save_insta_video'+str(num)+'.mp4')
            num += 1
            print(f"{num}/{len(videos)}")

    print('Save Compelete')