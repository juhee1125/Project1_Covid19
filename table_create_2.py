import csv
import MySQLdb

import os


# 폴더 경로 설정
folder_path = 'file'

# 폴더 내의 파일과 디렉토리 이름 가져오기
file_names = os.listdir(folder_path)

# 파일명만 필요한 경우 디렉토리 제외
file_names = [f for f in file_names if os.path.isfile(os.path.join(folder_path, f))]

print(file_names)


conn = MySQLdb.connect(host="localhost", port=3306, user="root", passwd="1234", db="jiendb")
cursor = conn.cursor()

for file_path in file_names:
    # Read the first line of the CSV file to get column names
    file_name= file_path[:-15];
    print(file_name)
    with open("file\\"+file_path, mode='r' ,encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile)
        header = next(reader)

    # Generate CREATE TABLE SQL statement
    create_table_sql = f"CREATE TABLE {file_name} ("
    for column in header:
        create_table_sql += f"{column} VARCHAR(255), "
    create_table_sql = create_table_sql[:-2] + ");"

    # Execute CREATE TABLE SQL statement
    cursor.execute(create_table_sql)
    conn.commit()
