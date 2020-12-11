"""
#   File Name: imgocr.py
#        Team: 소융개론텀프로젝트 이준혁,임성은
#  Programmer: 이준혁     
#     Purpose: Get text of image. By using easyOCR
"""
import easyocr
import csv

a = []
i = 0

while True:
    
    img_list = 'instagram_img\save_insta_image{}.png'.format(str(i))
    reader = easyocr.Reader(['ko','en'])
    result = reader.readtext(img_list)
    i += 1
    if i == 1204:
        break
    else:
        a.append(result)
        print(str(i) + '\n')
        print(result)

    f = open("MBTI_OCR" + keyword, "w", encoding="utf-8-sig", newline="")
    writer = csv.writer(f)
    
    for img in a:
        writer.writerow(img)

    break
