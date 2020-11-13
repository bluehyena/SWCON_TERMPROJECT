"""
#   File Name: App.py
#        Team: 소융개론텀프로젝트 이준혁,임성은
#  Programmer: 이준혁     
#  Start Date: 06/10/22
#  Update Num: 9
#First Update: Oct 22, 2020
# Last Update: Nov 13, 2020
#     Purpose: Crawling Instagram.
"""
import time
import requests
import os
import csv

from bs4 import BeautifulSoup
from selenium import webdriver

import env

# Need Fix
class Instagram_crawler:
    def __init__(self):
        self.__instagram_id = env.instagram_user_id
        self.__instagram_password = env.instagram_user_password
        self.img_idx = 0
        self.img_slide = 0
        # self.headers = {"User-Agent":env.User_Agent}
        # self.options = webdriver.ChromeOptions()
        # self.options.headless = True
        # self.options.add_argument("window-size=1920x1080")
        # self.options.add_argument(f"user-agent={env.User_Agent}")
        # self.browser = webdriver.Chrome(options=self.options)
        self.browser = webdriver.Chrome()

    def login(self, url: str) -> None: #Fin
        """
        Login to instagram browser.

        Args:
            url: String value of url of instagram.

        Returns:
            None

        Raises:
            None
        """
        assert isinstance(url, str)

        self.browser.get(url)
        self.browser.maximize_window()
        id_box = self.browser.find_element_by_xpath("//*[@id='loginForm']/div/div[1]/div/label/input")
        password_box = self.browser.find_element_by_xpath("//*[@id='loginForm']/div/div[2]/div/label/input")
        id_box.send_keys(self.__instagram_id)
        password_box.send_keys(self.__instagram_password)
        self.browser.find_element_by_xpath("//*[@id='loginForm']/div/div[3]/button/div").click()
        time.sleep(3)

    def scroll_down_once(self) -> None: #Fin
        """
        Scroll down the browser just ONCE.

        Args:
            None

        Returns:
            None

        Raises:
            None
        """    
        self.browser.execute_script("window.scrollTo(0, document.body.scrollHeight)")

    def scroll_down_end(self) -> None: #Fin
        """
        Scroll down the browser to the end of the page.

        Args:
            None

        Returns:
            None

        Raises:
            None
        """
        prev_height = self.browser.execute_script("return document.body.scrollHeight")
        while True:
            self.browser.execute_script("window.scrollTo(0, document.body.scrollHeight)")
            time.sleep(2)
            curr_height = self.browser.execute_script("return document.body.scrollHeight")
            if curr_height == prev_height:
                break
            prev_height = curr_height
    
    def change_url(self, url: str) -> None: #Fin (time interval changeable)
        """
        Change browser to the other tab.

        Args:
            url: String value of url to be changed.

        Returns:
            None

        Raises:
            None
        """
        assert isinstance(url, str)
        
        self.browser.get(url)
        time.sleep(2)

    def click_feed_image(self) -> None: #Fin
        """
        Click image of instagram feed.
        
        Args:
            None

        Returns:
            None

        Raises:
            None
        """
        self.browser.find_element_by_class_name("_9AhH0").click()
        time.sleep(1)

    def save_feed_images(self) -> None:  #Need fix
        """
        Crawl image of instagram feed and save .
        
        Args:
            None

        Returns:
            None

        Raises:
            None
        """
        #Make directory for crawled images.
        if not os.path.exists("image_dir_instagram"):
            os.mkdir("image_dir_instagram")
        
        self.next_slide_button = self.browser.find_element_by_class_name("coreSpriteRightChevron")
        self.next_feed_button = self.browser.find_element_by_class_name("_65Bje.coreSpriteRightPaginationArrow")
        
        # img_idx 로 몇번째 사진인지 명시
        # img_slide 로 게시물당 몇번째의 사진인지 명시하여 다음 게시물로 넘어갈지 판단
        # 맨 끝 img_slide 일 경우 다음 게시물로 넘어가는 버튼클릭, img_slide = 0 으로 다시 초기화.
        # Try Except 추가 필요
        
        while True:
            self.img_idx += 1
            self.img_slide += 1

            if self.img_slide == 1:
                soup = BeautifulSoup(self.browser.page_source, "lxml")
                img = soup.find("img", attrs={"class":"FFVAD"})
                img_url = img["src"]
                img_res = requests.get(img_url)
                img_res.raise_for_status()

                # Save images into jpg file.
                with open("image_dir_instagram\mbti_image{}.jpg".format(self.img_idx), "wb") as f:
                    f.write(img_res.content)

                # Next button
                if self.next_slide_button:
                    self.next_slide_button.click()
                    time.sleep(0.3)
                # If next button isn't exist, click another feed button
                else:
                    self.next_feed_button.click()
                    self.img_slide = 0
                    time.sleep(1.5)

            else:
                soup = BeautifulSoup(self.browser.page_source, "lxml")
                img = soup.find("img", attrs={"class":"FFVAD"})
                img_url = img["src"]
                img_res = requests.get(img_url)
                img_res.raise_for_status()

                # Save images into jpg file.
                with open("image_dir_instagram\mbti_image{}.jpg".format(self.img_idx), "wb") as f:
                    f.write(img_res.content)

                # Next button
                if self.next_slide_button:
                    self.next_slide_button.click()
                    time.sleep(0.3)
                # If next button isn't exist, click another feed button
                else:
                    self.next_feed_button.click()
                    self.img_slide = 0
                    time.sleep(1.5)

    def run(self):
        """
        Run Functions
        
        Args:
            None

        Returns:
            None

        Raises:
            None
        """
        self.login(url1)
        self.change_url(url1+"mbti_bot/")
        
        
        # for 게시물 in range(게시물 개수):
        #     if 화살표버튼:
        #         self.save_image()
        #         self.load_another_image()
        #     else:
        #         self.save_image()


        self.click_feed_image()
        self.save_feed_images()

# Success
class Everytime_crawler:
    def __init__(self):
        self.__everytime_id = env.everytime_user_id
        self.__everytime_password = env.everytime_user_password
        self.extender = ".csv"
        # self.headers = {"User-Agent":env.User_Agent}
        # self.options = webdriver.ChromeOptions()
        # self.options.headless = True
        # self.options.add_argument("window-size=1920x1080")
        # self.options.add_argument(f"user-agent={env.User_Agent}")
        # self.browser = webdriver.Chrome(options=self.options)
        self.browser = webdriver.Chrome()
    
    def login(self, url: str) -> None:
        """
        Login to everytime browser.

        Args:
            url: String value of url of everytime.

        Returns:
            None

        Raises:
            None
        """
        assert isinstance(url, str)

        self.browser.get(url)
        self.browser.maximize_window()
        id_box = self.browser.find_element_by_xpath("//*[@id='container']/form/p[1]/input")
        password_box = self.browser.find_element_by_xpath("//*[@id='container']/form/p[2]/input")
        id_box.send_keys(self.__everytime_id)
        password_box.send_keys(self.__everytime_password)
        self.browser.find_element_by_xpath("//*[@id='container']/form/p[3]/input").click()
        time.sleep(2)
    
    def change_url(self, url: str) -> None: #Fin (time interval changeable)
        """
        Change browser to the other tab.

        Args:
            url: String value of url to be changed.

        Returns:
            None

        Raises:
            None
        """
        assert isinstance(url, str)
        
        self.browser.get(url)
        time.sleep(1)

    def crawl_mbti_article_button_click(self):
        """
        Crawl mbti article.

        Args:
            None

        Returns:
            None

        Raises:
            None
        """
        # Write as csv
        f = open("MBTI_Article" + self.extender, "w", encoding="utf-8-sig", newline="")
        writer = csv.writer(f)
        
        # Write first row
        title = "이름   작성시간    내용    공감    댓글".split("\t")
        writer.writerow(title)

        next_article_button = self.browser.find_element_by_class_name("next")

        while next_article_button:
            soup = BeautifulSoup(self.browser.page_source, "lxml")
            articles = soup.find_all("article")
            
            #I want to change codes.
            for article in articles:
                writer_name = article.find("h3", attrs={"class":"medium"}).get_text()
                write_time = article.find("time", attrs={"class":"medium"}).get_text()
                contents = article.find("p", attrs={"class":"medium"}).get_text()
                recommend = article.find("li", attrs={"class":"vote"}).get_text()
                comments = article.find("li", attrs={"class":"comment"}).get_text()
                data = [writer_name, write_time, contents, recommend, comments]
                # columns = article.find_all(attrs={"class":"medium"})
                # for columns in column:
                #     data = [column.get_text().strip()]
                writer.writerow(data)

            next_article_button.click()
            time.sleep(1)
            try:
                next_article_button = self.browser.find_element_by_class_name("next")
            except:
                break

    def crawl_mbti_article_by_requests(self, url: str) -> None: # X
        """
        Crawl mbti article.

        Args:
            String type -> url : "https://khu.everytime.kr/460213/p/"

        Returns:
            None

        Raises:
            None
        """
        # Write as csv
        f = open("MBTI_Article" + self.extender, "w", encoding="utf-8-sig", newline="")
        writer = csv.writer(f)
        
        # Write first row
        title = "이름   작성시간    내용    공감    댓글".split("\t")
        writer.writerow(title)


        for page in range(1, 10):
            self.change_url(url + str(page))
            res = requests.get(url + str(page))
            res.raise_for_status()
            soup = BeautifulSoup(res.text, "lxml")

            articles = soup.find("div", attrs={"class":"wrap articles"}).find_all("article")

            for article in articles:
                columns = article.find_all(attrs={"medium"})
                data = [column.get_text().strip() for column in columns]
                writer.writerow(data)

    def Crawl_MBTI_Articles(self) -> None:
        self.login(url2)
        self.crawl_mbti_article_button_click()
        # self.crawl_mbti_article_by_requests("https://khu.everytime.kr/460213/p/")

# Success
class Facebook_crawler:
    def __init__(self):
        self.__facebook_id = env.facebook_user_id
        self.__facebook_password = env.facebook_user_password
        self.img_idx = 0
        self.headers = {"User-Agent":env.User_Agent}
        self.options = webdriver.ChromeOptions()
        # self.options.headless = True
        # self.options.add_argument("window-size=1920x1080")
        self.options.add_argument(f"user-agent={env.User_Agent}")
        self.browser = webdriver.Chrome(options=self.options)
        # self.browser = webdriver.Chrome()

    def login(self, url: str) -> None:
        """
        Login to facebook browser.

        Args:
            url: String value of url of everytime.

        Returns:
            None

        Raises:
            None
        """
        assert isinstance(url, str)

        self.browser.get(url)
        self.browser.maximize_window()
        id_box = self.browser.find_element_by_xpath("//*[@id='email']")
        password_box = self.browser.find_element_by_xpath("//*[@id='pass']")
        id_box.send_keys(self.__facebook_id)
        password_box.send_keys(self.__facebook_password)
        self.browser.find_element_by_xpath("//*[@id='u_0_b']").click()
        time.sleep(5)

    def facebook_search(self, keyword: str) -> None:
        """
        Get url of photo search results.

        Args:
            keyword: String value of search keyword.

        Returns:
            None

        Raises:
            None
        """
        assert isinstance(keyword, str)

        self.browser.get("https://www.facebook.com/search/photos/?q={}&f=Abq5qXf0_ZNwIGQfFDy24hLClFdueEZblC7URUZKEA4l47eFSft1gTUGEOBFmfuN4ugqXCKaUApxvwx0ivjpyKWG738gZTaM6HueIn7brz0IwCXuwly1n1jnJm8_iwEyxj8".format(keyword))
        time.sleep(2)

    def scroll_down(self) -> None: #Fin
        """
        Scroll down the page of the browser. (100)

        Args:
            None

        Returns:
            None

        Raises:
            None
        """
        prev_height = self.browser.execute_script("return document.body.scrollHeight")
        scroll_num = 0

        while scroll_num <= 50:
            self.browser.execute_script("window.scrollTo(0, document.body.scrollHeight)")
            time.sleep(2)
            curr_height = self.browser.execute_script("return document.body.scrollHeight")
            if curr_height == prev_height:
                break
            prev_height = curr_height
            scroll_num += 1
    
    def crawl_facebook_image(self) -> None:
        if not os.path.exists("image_dir_instagram"):
            os.mkdir("image_dir_instagram")
        
        soup = BeautifulSoup(self.browser.page_source, "lxml")
        
        while True:
            img = soup.select("img")[self.img_idx]
            img_url = img["src"]
            img_res = requests.get(img_url)
            img_res.raise_for_status()
            self.img_idx += 1

            # Save images into jpg file.
            with open("image_dir_facebook\mbti_image{}.jpg".format(self.img_idx), "wb") as f:
                f.write(img_res.content)


    def run(self): 
        self.login(url3)
        self.facebook_search("MBTI")
        self.scroll_down()
        self.crawl_facebook_image()

# Success
class Dcinside_crawler:
    def __init__(self):
        self.browser = webdriver.Chrome()
        self.mbti_url = ["entp","enfp","entj","enfj","esfp","esfj","estj","esfp",
                         "intp_mbti","infp","intj","infj","isfp","isfj","istj","isfp"]
        self.keyword_idx = 0
        self.headers = {"User-Agent":env.User_Agent}
        self.options = webdriver.ChromeOptions()
        # self.options.headless = True
        # self.options.add_argument("window-size=1920x1080")
        self.options.add_argument(f"user-agent={env.User_Agent}")
        self.browser = webdriver.Chrome(options=self.options)

    def change_url(self):
        self.keyword_idx
        url = ("https://gall.dcinside.com/mgallery/board/lists?id={}").format(self.mbti_url[self.keyword_idx])
        self.browser.get(url)
        time.sleep(2)

if __name__ == "__main__":
    url1 = "https://www.instagram.com/"
    url2 = "https://khu.everytime.kr/460213/p/1"
    url3 = "https://www.facebook.com"
    # instagram = Instagram_crawler()
    # everytime = Everytime_crawler()
    facebook = Facebook_crawler()

    # try:
    # instagram.run()
    # everytime.Crawl_MBTI_Articles()
    facebook.run()
    # except:
        # print("[ERROR]")