import logo from './logo.svg';
import './App.css';
import React,{ useState, useEffect,Component } from "react";
import { useMediaQuery } from 'react-responsive';
import { BsBatteryFull,BsBatteryHalf, BsBattery} from 'react-icons/bs';
import { BiSolidAmbulance } from 'react-icons/bi';
import img1 from "./img/image1.png";
import img2 from "./img/image2.png";
import img3 from "./img/image3.png";
import img4 from "./img/image4.png";
import img5 from "./img/image5.png";
import axios from 'axios';

  function App() {
    
    const backgroundArr = [img1, img2, img3, img4, img5];
    let randomIndex = localStorage.getItem('backgroundIndex');

    if (randomIndex === null) {
      randomIndex = Math.floor(Math.random() * backgroundArr.length);
      localStorage.setItem('backgroundIndex', randomIndex);
    }
    
    const backgroundImg = backgroundArr[randomIndex];
    const appStyle ={ 
      backgroundImage: `url(${backgroundImg})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
    const clockStyle ={
      fontSize: "18px",
      fontFamily: "tway_sky",
      color: "white",
    }
    const today = new Date();
    const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
    

    const [time, setTime] = useState(new Date());
    const [data, setDate] = useState({})
    useEffect(() => {

      const apiUrl = ' https://api.corona-19.kr/korea/?serviceKey=cQXvdqNL2Uh6KnGisxEkto598VDTaBHpl';
      const apiKey = 'cQXvdqNL2Uh6KnGisxEkto598VDTaBHpl';
      // 1초마다 데이터 업데이트
      const fetchData = async () => {
        try{
          const response =await axios.get(apiUrl,{   
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          },
          );
          setDate(response.data);
        }  catch (error){
          if (error.response){
            console.error('API Error Response:', error.response.data);
          } else if (error.request){
            console.error('No response received:', error.request);
          } else{
            console.error('Error:', error.message);
          }
        }
      };
      fetchData();
      const intervalId = setInterval(() => {
        fetchData();
        setTime(new Date());
      }, 1000);

      return () => clearInterval(intervalId);
    }, []); //인자는 함수와 배열 2개, []에 들어있는 값이 변경되면 자동으로 브라우저가 랜더링
    const hPntCnt = "id";
    return (
        <div style={appStyle}>
          <div className='clock'>
          <div className='App'>
            <div className='App text-animation'>
              신종코로나바이러스
            </div>
          <div className='App'>
            실시간 현황 🚑
            <h1 style={clockStyle}>
              마지막 업데이트: 
              <day>{formattedDate}</day>
              <span>{time.toLocaleTimeString()}</span>
            </h1>
            </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <BsBatteryFull size={100} color='white' />
              <span style={{ marginLeft: 200 }}></span>
              <BsBatteryHalf size={100} color='white' />
              <span style={{ marginLeft: 200 }}></span>
              <BsBattery size={100} color='white' />
              <span style={{ marginLeft: 200 }}></span>
              <BiSolidAmbulance size={100} color='white' />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className='App' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className='center'>{data.korea}</div>
              <div className='center_down'>입원</div>
              <span style={{ marginTop: '200px' }}></span>
            </div>
            <span style={{ marginLeft: '130px' }}></span>
            <div className='App' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className='center'>{data.total}</div>
            <div className='center_down'>입원</div>
              <span style={{ marginTop: '200px' }}></span>
            </div>
            <span style={{ marginLeft: '130px' }}></span>
            <div className='App' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className='center'>{data.chuncheon}</div>
              <div className='center_down'>안녕</div>
              <span style={{ marginTop: '200px' }}></span>
            </div>
            <span style={{ marginLeft: '130px' }}></span>
            <div className='App' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className='center'>{data.seoul}</div>
            <div className='center_down'>확진</div>
              <span style={{ marginTop: '200px' }}></span>
              
            </div>
            </div>      
          </div>
          
        </div>
  );
}

export default App;
