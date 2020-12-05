import time
import requests
import os
import csv

from bs4 import BeautifulSoup
from selenium import webdriver

import env

class Everytime_crawler:
    def __init__(self):
        self.mbti_urls = ["entp","enfp","entj","enfj","esfp","esfj","estj","esfp",
                         "intp_mbti","infp","intj","infj","isfp","isfj","istj","isfp"]
        self.keyword_idx = 0
        self.url_idx = 0
        self.headers = {"User-Agent":env.User_Agent}
        self.options = webdriver.ChromeOptions()
        # self.options.headless = True
        # self.options.add_argument("window-size=1920x1080")
        self.options.add_argument(f"user-agent={env.User_Agent}")
        self.browser = webdriver.Chrome(options=self.options)
    
    def change_url(self, keyword: str) -> str: 
        """ 
        Change browser to the other tab.

        Args:
            url: String value of url to be changed.

        Returns:
            None

        Raises:
            None
        """
        
        assert isinstance(keyword, str)
        
        url = ("https://gall.dcinside.com/mgallery/board/lists?id={}&exception_mode=recommend").format(keyword)
        self.browser.get(url)
        self.keyword_idx += 1
        time.sleep(2)

        self.url = url


    def crawl_mbti_article(self):
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
        f = open("MBTI_"+ self.mbti_urls[self.keyword_idx] + self.extender, "w", encoding="utf-8-sig", newline="")
        writer = csv.writer(f)

        # Write first row
        title = "제목"
        writer.writerow(title)

        for mbti in self.mbti_urls:
            writer.writerow(mbti)
            for i in range(1, 31):
                self.browser.get('https://gall.dcinside.com/mgallery/board/lists/?id={}&page={}'.format(mbti, i))
                soup = BeautifulSoup(self.browser.page_source, "html.parser")
                articles = soup.find("table", attrs={"class":"gall_list  "}).find("tbody").find_all("tr")

                for article in articles:
                    columns = article.find_all("td", attrs={"class":"gall_tit ub-word"}).get_text()
                    if len(columns) <= 1:
                       continue
                    data = [column.get_text().strip() for column in columns]
                    writer.writerow(data)
