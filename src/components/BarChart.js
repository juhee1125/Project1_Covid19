import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import CircularProgress from '@mui/material/CircularProgress';
import Check1 from './CheckBox'
const BarChart = () => {
  const chartRef = React.useRef(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState('');

  const fetchDataForSelectedCountry = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/data?country=${selectedCountry}`);
      if (response.ok) {
        const jsonData = await response.json();
        var index =jsonData.index.map(i=>new Date(i)).map(date=>
          {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1 ).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1 해주고, 두 자리로 포맷팅
            const day = date.getDate().toString().padStart(2, '0'); // 일을 두 자리로 포맷팅

            const formattedDate = `${year}-${month}-${day}`;
            return formattedDate
          })
          jsonData.index= index
        console.log(jsonData)
        setData(jsonData);
        drawChart(); // 데이터를 받았을 때 drawChart 호출
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const drawChart = () => {
    const ctx = chartRef.current?.getContext('2d'); // chartRef가 null인 경우를 방지하기 위해 ?. 연산자 사용
    if (!ctx) {
      // ctx가 null이면 작업을 중단
      return;
    }

    console.log('ctx 2) ', ctx);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.index,
        datasets: [{
          label: 'Bar Chart',
          data: data.data.reduce((i,j)=>i+j),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value); // 드롭다운에서 선택한 값을 selectedCountry로 업데이트
  };

  useEffect(() => {
    if (selectedCountry) {
      fetchDataForSelectedCountry();
    }
  }, [selectedCountry]);
  useEffect(() => {
    // 데이터가 업데이트되면 drawChart 함수를 호출
    drawChart();
  }, [data]);
  return (
    <div>
      <div>
        <label htmlFor="country">나라 선택:</label>
        <select id="country" onChange={handleCountryChange}>
          <option value="">나라를 선택하세요</option>
          <option value="가이아나">가이아나</option>
          <option value="몰도바">몰도바</option>
          <option value="몽골">몽골</option>
          <option value="웨일즈">웨일즈</option>
          {/* 원하는 나라 옵션을 추가 */}
          
        </select>
        
      </div>
      {loading ? (
        <div>
          <CircularProgress />로딩중...
        </div>
      ) : (
        <canvas id="barChart" width="400" height="200" ref={chartRef}></canvas>
      )}
    </div>
  );
};

export default BarChart;
