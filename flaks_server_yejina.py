from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import json
import pymysql
import pandas as pd
import requests
import xmltodict

app = Flask(__name__)
CORS(app, support_credentials=True)

def to_json2(df, orient='split'):
    df_json = df.to_json(orient=orient, force_ascii=False)
    return json.loads(df_json)

@app.route('/api/data')
def index():
    print("여기는 Flask 서버 실행중 ")
    selected_country = request.args.get('country')
    print('1)', selected_country)
    if not selected_country:
        return jsonify({'error': 'No country selected'})

    covid_db = pymysql.connect(host='localhost', user='root', password='1234', db='jiendb')
    cursor = covid_db.cursor()
    sql_covid1_date = "SELECT * FROM " + selected_country
    cursor.execute(sql_covid1_date)
    data_list = cursor.fetchall()

    dict_mapping = {"0": "location",
                    "1": "date",
                    "2": "total_cases",
                    "3": "total_deaths",
                    "4": "reproduction_rate",
                    "5": "positive_rate",
                    "6": "total_vaccinations",
                    "7": "people_vaccinated",
                    "8": "people_fully_vaccinated",
                    "9": "stringency_index",
                    "10": "diabetes_prevalence",
                    "11": "population"}

    dict = {}
    for i in data_list:
        for idx, data in enumerate(i):
            key = dict_mapping[str(idx)]
            if key not in dict.keys():
                dict[key] = []
                dict[key].append(data)
            else:
                dict[key].append(data)

    df = pd.DataFrame(dict)
    df['date'] = pd.to_datetime(df['date'])
    df.set_index('date', inplace=True)
    json2 = to_json2(df)
    return jsonify(json2)

@app.route('/api/country')
def country():
    covid_db = pymysql.connect(host='localhost', user='root', password='1234', db='jiendb')
    cursor = covid_db.cursor()
    sql_covid1_date = "SELECT table_name FROM information_schema.tables where table_schema = 'jiendb'"
    cursor.execute(sql_covid1_date)
    data_list = cursor.fetchall()

    array1=[]
    for i in data_list:
        for idx, data in enumerate(i):
            array1.append(data)

    return jsonify(array1)

@app.route('/api/title')
def title():
    covid_db = pymysql.connect(host='localhost', user='root', password='1234', db='jiendb')
    cursor = covid_db.cursor()
    sql_covid1_date = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'jiendb' AND TABLE_NAME = '가나' AND COLUMN_NAME != 'date'"
    cursor.execute(sql_covid1_date)
    data_list = cursor.fetchall()

    array1 = [data for i in data_list for data in i]

    return jsonify(array1)



@app.route('/data')
def data():
    url = 'http://apis.data.go.kr/1352000/ODMS_COVID_02/callCovid02Api'
    params = {'serviceKey': 'B+fCbBBMC553TaSUTl0PaTwxSzI9vcpgNR0qdMqoqZBLQ+liYSdI2LM0+/j5dk1n/Kps+sjhe+n+NQJjZISWvQ==',
              'pageNo': '1', 'numOfRows': '500', 'apiType': 'json', 'status_dt': '20230831'}

    response = requests.get(url, params=params)
    print(response.content)

    dictionary = xmltodict.parse(response.content)
    json_object = json.dumps(dictionary)

    return json_object

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)