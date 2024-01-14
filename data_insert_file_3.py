import csv
import pymysql

# Database connection setup
conn = pymysql.connect(host="localhost", port=3306, user="root", passwd="1234", db="jiendb")
cursor = conn.cursor()

import os

# 폴더 경로 설정
folder_path = 'file'

# 폴더 내의 파일과 디렉토리 이름 가져오기
file_names = os.listdir(folder_path)

# 파일명만 필요한 경우 디렉토리 제외
file_names = [f for f in file_names if os.path.isfile(os.path.join(folder_path, f))]

print(file_names)

for file_path in file_names:
    # Read the first line of the CSV file to get column names
    file_name= file_path[:-15];
    print(file_name)
    with open('file\\' + file_path, encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile, delimiter=',')
        for idx, row in enumerate(reader):
            sql_insert_1 = 'insert into '+  file_name + '(location,date,total_cases,total_deaths,reproduction_rate,positive_rate,total_vaccinations,people_vaccinated,people_fully_vaccinated,stringency_index,diabetes_prevalence,population) values(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'
            cur = conn.cursor()
            cur.execute(sql_insert_1, (row['location'], row['date'], row['total_cases'], row['total_deaths'], row['reproduction_rate'], row['positive_rate'], row['total_vaccinations'],row['people_vaccinated'], row['people_fully_vaccinated'], row['stringency_index'],row['diabetes_prevalence'], row['population']))
            conn.escape_string(sql_insert_1)
            conn.commit()
            if idx%100==0:
                print("데이터 저장중:" , file_path ,  idx)
print('완료')

