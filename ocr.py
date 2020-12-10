import torch
x = torch.rand(5, 3)
print(x)

# import easyocr
# import csv

# keywords = ['연애','직업','팩폭','궁합','공부','소득','사랑','우정','가치관','술주정','평균','소득','마블','캐릭터','고정관념','소울메이트','시험']
# a = []


# for keyword in keywords:
#     f = open("MBTI_OCR" + keyword, "w", encoding="utf-8-sig", newline="")
#     writer = csv.writer(f)
#     while True:
#         i = 0
#         img_list = 'instagram_img\save_insta_image{}.png'.format(str(i))        
#         reader = easyocr.Reader(['ko','en'])
#         result = reader.readtext(img_list)
#         i += 1
#         if i == 1204:
#             break
#         else:
#             a.append(result)


# # Write as csv

#         # Write first row
#         title = "이름   작성시간    내용    공감    댓글".split("\t")
#         writer.writerow(title)

#         next_article_button = self.browser.find_element_by_class_name("next")

#         while next_article_button:
#             soup = BeautifulSoup(self.browser.page_source, "lxml")
#             articles = soup.find_all("article")
            
#             #I want to change codes.
#             for article in articles:
#                 writer_name = article.find("h3", attrs={"class":"medium"}).get_text()
#                 write_time = article.find("time", attrs={"class":"medium"}).get_text()
#                 contents = article.find("p", attrs={"class":"medium"}).get_text()
#                 recommend = article.find("li", attrs={"class":"vote"}).get_text()
#                 comments = article.find("li", attrs={"class":"comment"}).get_text()
#                 data = [writer_name, write_time, contents, recommend, comments]
#                 # columns = article.find_all(attrs={"class":"medium"})
#                 # for columns in column:
#                 #     data = [column.get_text().strip()]
#                 writer.writerow(data)

#             next_article_button.click()
#             time.sleep(1)
#             try:
#                 next_article_button = self.browser.find_element_by_class_name("next")
#             except:
#                 break