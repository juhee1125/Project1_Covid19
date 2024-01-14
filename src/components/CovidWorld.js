import CovidWorldCss from "./CovidWorld.module.css";
import React, { useRef, useState, useEffect, useCallback } from "react";
import CheckBox from "./CheckBox";
import SelectedItem from "./SelectedItem";
import Nav from '../navigation/Nav'
import BarChart from "./BarChart";
import Chart from 'chart.js/auto';
function CovidWorld() {
  const checkboxesRef = useRef({});
  const chartRef = useRef(null);
  const resultRef = useRef([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState('bar');
  var list_date = [];

  const [chartData, setChartData] = useState({
    diabetes_prevalence: [],
    location: [],
    people_fully_vaccinated: [],
    population: [],
    positive_rate: [],
    reproduction_rate: [],
    stringency_index: [],
    total_cases: [],
    total_deaths: [],
    total_vaccinations: [],
  });

  const [countries, setCountries] = useState([]);
  const [titles, setTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    // 전체 나라 이름 Countries 에 저장
    const fetchData = async () => {
      try {
        // url 주소는 파이참에서 지정
        const response = await fetch(`http://localhost:5000/api/country`);
      if (response.ok) {
        const jsonData = await response.json();
        var countriesArray = [];
        for (var [index,value] of Object.entries(jsonData)) {
            countriesArray.push(value)
        }
        setCountries(countriesArray);
      }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // 전체 주제 이름 Titles 에 저장
    const fetchData2 = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/title`);
      if (response.ok) {
        const jsonData = await response.json();
        var titlesArray = [];
        for (var [index,value] of Object.entries(jsonData)) {
            titlesArray.push(value)
        }
        setTitles(titlesArray);
      }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData2();
  }, []);

  const fetchDataForSelectedCountry = async () => {
    try {
      setLoading(true);
      setChartData({total_cases: [],
        total_deaths: [],
        diabetes_prevalence: [],
        location: [],
        people_fully_vaccinated: [],
        population: [],
        positive_rate: [],
        reproduction_rate: [],
        stringency_index: [],
        total_vaccinations:[]

      })
      const response = await fetch(`http://localhost:5000/api/data?country=${selectedCountry}`);
      if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData)
        var index = jsonData.index
        .map(i => new Date(i))
        .map(date => {
          const year = date.getFullYear();
          const month = parseInt(date.getMonth() + 1).toString().padStart(2, '0');
          return parseInt(year+month)
        })
        jsonData.index = index
       var formatted_data =  getDates(jsonData)
       var year = 2020;
       var month = 6;
       
       for (var i = 0; i < 8; i++) {
         list_date.push(year * 100 + month); // 날짜로부터 년과 월을조합 
         month += 6; // 6개월 증가 
         if (month > 12) {//12개월이 증가하면 12개월을 제거하고 년을 증가함 
           month -= 12;
           year++;
         }
       }

       console.log('list_date:',list_date);
      //  for ((변수) of Object.entries(범위)){}
      // 초기값 지정(리셋)
       for (var [key, value] of Object.entries(formatted_data)) {
        if (key === 'index') {
          // 날짜 표기되는 수 만큼 리스트에 0 입력
          var sum_diabetes_prevalence = [0, 0, 0, 0, 0, 0, 0, 0];
          var sum_location= [0, 0, 0, 0, 0, 0, 0, 0];
          var sum_people_fully_vaccinated= [0, 0, 0, 0, 0, 0, 0, 0];
          var sum_population= [0, 0, 0, 0, 0, 0, 0, 0];
          var sum_positive_rate= [0, 0, 0, 0, 0, 0, 0, 0];
          var sum_reproduction_rate= [0, 0, 0, 0, 0, 0, 0, 0];
          var sum_stringency_index= [0, 0, 0, 0, 0, 0, 0, 0];
          var sum_total_cases= [0, 0, 0, 0, 0, 0, 0, 0];
          var sum_total_death= [0, 0, 0, 0, 0, 0, 0, 0];
          var sum_total_vaccinations= [0, 0, 0, 0, 0, 0, 0, 0];

          for (var v in value) {
            for (var i = 0; i < 8; i++) {
              // 6개월씩 쪼갠 날짜로 조건문 실행(6개월치 누적 데이터 생성)
              if (value[v] >= list_date[i] && value[v] < list_date[i + 1]) {
                var data_total_cases = Number(formatted_data['total_cases'][v][i]);
                
                var data_total_death = Number(formatted_data['total_deaths'][v][i]);
                
                var data_diabetes_prevalence = Number(formatted_data['diabetes_prevalence'][v][i]);
                
                var data_location = Number(formatted_data['location'][v][i]);
               
                var data_people_fully_vaccinated = Number(formatted_data['people_fully_vaccinated'][v][i]);
                
                var data_population = Number(formatted_data['population'][v][i]);
                
                var data_positive_rate = Number(formatted_data['positive_rate'][v][i]);
                
                var data_reproduction_rate = Number(formatted_data['reproduction_rate'][v][i]);
                
                var data_stringency_index = Number(formatted_data['stringency_index'][v][i]);
                
                var data_total_vaccinations = Number(formatted_data['total_vaccinations'][v][i]);
                
                sum_total_cases[i] += data_total_cases;
                sum_total_death[i] += data_total_death;
                sum_diabetes_prevalence[i] += data_diabetes_prevalence;
                sum_location[i] += data_location;
                sum_people_fully_vaccinated[i] += data_people_fully_vaccinated;
                sum_population[i] += data_population;
                sum_positive_rate[i] += data_positive_rate;
                sum_reproduction_rate[i] += data_reproduction_rate;
                sum_stringency_index[i] += data_stringency_index;
                sum_total_vaccinations[i] += data_total_vaccinations;
                break;
              }
            }
          }
          
          // React 상태를 업데이트합니다.
          setChartData((prevChartData) => ({
            ...prevChartData,
            total_cases: [...prevChartData.total_cases, ...sum_total_cases],
            total_deaths: [...prevChartData.total_deaths, ...sum_total_death],
            diabetes_prevalence: [...prevChartData.diabetes_prevalence, ...sum_diabetes_prevalence],
            location: [...prevChartData.location, ...sum_location],
            people_fully_vaccinated: [...prevChartData.people_fully_vaccinated, ...sum_people_fully_vaccinated],
            population: [...prevChartData.population, ...sum_population],
            positive_rate: [...prevChartData.positive_rate, ...sum_positive_rate],
            reproduction_rate: [...prevChartData.reproduction_rate, ...sum_reproduction_rate],
            stringency_index: [...prevChartData.stringency_index, ...sum_stringency_index],
            total_vaccinations: [...prevChartData.total_vaccinations, ...sum_total_vaccinations]
          }));
        }
      }
        setData(chartData);
        drawChart();
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
// data=나라 체크박스에서 선택한 데이터(나라명), columns=주제
  function getDates({index, data,columns}) {
    var obj={}
    for (var i of columns){
      obj[i]=[]
    }
    console.log('1)',obj)
    for (let i = 0; i < columns.length; i++) {
      for (const row of data) {
        obj[columns[i]].push(row[i]);
      }
    }
  obj['index']=index
  return obj
}

const drawChart = useCallback(() => {
  var ChartDataSet = {
    datasets: []
  }
  for (const [key, value] of Object.entries(chartData)) {
    if(selectedTitle == null || selectedTitle == undefined || selectedTitle == ""){
      ChartDataSet.datasets.push({
        label: key,
        backgroundColor: generateRandomColors(), 
        data: value
      });
    }else{
      if(key == selectedTitle)
      {ChartDataSet.datasets.push({
        label: key,
        backgroundColor: generateRandomColors(), 
        data: value
      });}
    }
  };

  const ctx = chartRef.current?.getContext('2d');
  if (!ctx) {
    return;
  }
  const newChart = new Chart(ctx, {
    type: chartType,
    data: {
      labels:  [202006, 202012, 202106, 202112, 202206, 202212, 202306]
      ,
      datasets: ChartDataSet.datasets
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
  chartRef.current = newChart;

  return () => {
    newChart.destroy();
  };
}, [data, chartType]);

const generateRandomColors = () => {
    const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`;
return color;
};

// checkbox.js 에서 값(나라 체크박스 선택했을 경우)이 넘어오면 실행
useEffect(() => {
  if (selectedCountry) {
    fetchDataForSelectedCountry();
  }
}, [selectedCountry]);

useEffect(() => {
  if (selectedCountry) {
    fetchDataForSelectedCountry();
  }
}, [selectedTitle]);

useEffect(() => {
  if (selectedCountry) {
    fetchDataForSelectedCountry();
  }
}, [chartType]);

  useEffect(() => {
    drawChart();
  }, [drawChart]);
  
// 각 페이지에서 쓸 변수 지정(다른 페이지에서 변수 공유를 위해 필요)
  return (
    <div className={CovidWorldCss.App}>
      <Nav/>
      <CheckBox
        checkboxesRef={checkboxesRef}
        setSelectedCountry={setSelectedCountry}
        chartRef={chartRef}
        countries={countries}
        setSelectedTitle={setSelectedTitle}
        titles={titles}
      />
      <SelectedItem
        selected={selected}
        setSelected={setSelected}
        resultRef={resultRef}
        loading={loading}
        setChartType={setChartType}
        chartRef={chartRef}
      />
    </div>
  );
}

export default CovidWorld;
