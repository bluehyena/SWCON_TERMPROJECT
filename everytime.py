# Example Codes by P1nkjelly [Thank you :)]
 
import requests
import sys
from bs4 import BeautifulSoup as bs

def parse_soup_article(html):

    """
    Parsing data that we need

    :param html: text of html

    :return: parsed data

    """

    #hot_article = []

    soup = bs(html, 'html.parser')
    hot_list = soup.find_all(attrs={'class':'boardname'})

    print(hot_list)

    #return hot_article

LOGIN_INFO = {
    'userid': '',
    'password': '',
    'redirect': '/'
}

HOT_ARTICLE = {
    'id': 'hotarticle',
    'limit_num': '20',
    'start_num': '0',
    'moiminfo': 'true'
}

with requests.Session() as s:
    try:
        postData = LOGIN_INFO
        loginReq = s.post('https://khu.everytime.kr/user/login', data=postData)
        postData = HOT_ARTICLE
        response = s.post('https://api.everytime.kr/find/board/article/list', data=postData)
        html = response.text
        #soup = bs(html, 'html.parser')
        #print(soup)
        parse_soup_article(html)

    except Exception:
        print('인터넷 연결을 확인하세요')
        sys.exit()