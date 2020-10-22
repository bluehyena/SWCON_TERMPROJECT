"""
#   File Name: App.py
#        Team: 소융개론텀프로젝트 이준혁,임성은
#  Programmer: 이준혁     
#  Start Date: 06/10/22
#First Update: Oct 22, 2020
# Last Update: Oct 22, 2020
#     Purpose: Crawling Instagram.
"""
import time

from bs4 import BeautifulSoup
from selenium import webdriver

import env

class Instagram_crawler:
    def __init__(self):
        self.__instagram_id = env.instagram_user_id
        self.__instagram_password = env.instagram_user_password
        # self.headers = {"User-Agent":env.User_Agent}
        # self.options = webdriver.ChromeOptions()
        # self.options.headless = True
        # self.options.add_argument("window-size=1920x1080")
        # self.options.add_argument(f"user-agent={env.User_Agent}")
        # self.browser = webdriver.Chrome(options=self.options)
        self.browser = webdriver.Chrome()

    def login(self, url: str) -> None:
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

    def scroll_down_once(self) -> None:
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

    def scroll_down_end(self) -> None:
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
    
    def change_url(self, url: str) -> None:
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

    def find_image(self) -> str:
        """
        Crawl image of instagram feed.
        
        Args:
            url: String value of url to be changed.

        Returns:
            If crawling success, return str of image's src. 

        Raises:
            None
        """
        self.browser.find_element_by_class_name("_9AhH0").send_keys.click()
      
        soup = BeautifulSoup(self.browser.page_source, "lxml")
        img = soup.find("img", attrs={"class":"FFVAD"})
        img_url = img["src"]

        return img_url

    def load_image(self):
        """
        Load other images by click button.
        """


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
        self.scroll_down_end()
        # self.crawl_image()
        
        # self.change_url(url+"my.mbti/")
        # self.change_url(url+"mbti_lab/")

if __name__ == "__main__":
    url = "https://www.instagram.com/"
    instagram = Instagram_crawler()
    try:
        instagram.run()
    except:
        print("[ERROR]")