"""
#   File Name: App.py
#        Team: 소융개론텀프로젝트 이준혁,임성은
#  Programmer: 이준혁     
#  Start Date: 06/10/22
#  Update Num: 3
#First Update: Oct 22, 2020
# Last Update: Oct 25, 2020
#     Purpose: Crawling Instagram.
"""
import time
import requests
import os

from bs4 import BeautifulSoup
from selenium import webdriver

import env

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
        if not os.path.exists("image_dir"):
            os.mkdir("image_dir")
        
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
                with open("image_dir\mbti_image{}.jpg".format(self.img_idx), "wb") as f:
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
                with open("image_dir\mbti_image{}.jpg".format(self.img_idx), "wb") as f:
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
        self.login(url)
        self.change_url(url+"mbti_bot/")
        
        
        # for 게시물 in range(게시물 개수):
        #     if 화살표버튼:
        #         self.save_image()
        #         self.load_another_image()
        #     else:
        #         self.save_image()


        self.click_feed_image()
        self.save_feed_images()


if __name__ == "__main__":
    url = "https://www.instagram.com/"
    instagram = Instagram_crawler()
    # try:
    instagram.run()
    # except:
        # print("[ERROR]")