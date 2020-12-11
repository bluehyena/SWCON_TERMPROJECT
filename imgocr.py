import easyocr
import csv

keywords = ['연애','직업','팩폭','궁합','공부','소득','사랑','우정','가치관','술주정','평균','소득','마블','캐릭터','고정관념','소울메이트','시험']
a = []

for keyword in keywords:
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