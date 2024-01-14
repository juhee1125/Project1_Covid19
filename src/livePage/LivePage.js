import LiveCss from './LivePage.module.css'
import React,{ useState, useEffect } from "react";
import { BsBatteryFull,BsBatteryHalf, BsBattery} from 'react-icons/bs';
import { BiSolidAmbulance } from 'react-icons/bi';
import img1 from "./img/image1.png";
import img2 from "./img/image2.png";
import img3 from "./img/image3.png";
import img4 from "./img/image4.png";
import img5 from "./img/image5.png";
import Nav from '../navigation/Nav';
import Counter from './counter';


  function LivePage() {
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
      overflow: "hidden",
      justifyContent: "center"

    }
    const clockStyle ={
      fontSize: "18px",
      fontFamily: "tway_sky",
      color: "white",
    }
    const today = new Date();
    const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
    const [liveCovid, setLiveCovid] = useState([{}])

    const [time, setTime] = useState(new Date());
    const textArray = "신종 코로나바이러스";
    const [showText, setShowText] = useState(false);

    const [examTextIndex, setExamTextIndex] = useState(0);
    const [deathTextIndex, setDeathTextIndex] = useState(0);
    const [confirmedTextIndex, setConfirmedTextIndex] = useState(0);

    const updateExamText = () => {
      if (examTextIndex < "누적 검사수".length) {
        setExamTextIndex((prevIndex) => prevIndex + 1);
      }
    };
    
    const updateDeathText = () => {
      if (deathTextIndex < "사망자 수".length) {
        setDeathTextIndex((prevIndex) => prevIndex + 1);
      }
    };
    
    const updateConfirmedText = () => {
      if (confirmedTextIndex < "확진자 수".length) {
        setConfirmedTextIndex((prevIndex) => prevIndex + 1);
      }
    };

    useEffect(() => {

      fetch("/data").then(
        response => response.json()
      ).then(
        data => {
          // 받아온 데이터를 data 변수에 update
          setLiveCovid(data);
        }
      ).catch(
        (err) => console.log(err)
      )

      // 1초마다 데이터 업데이트
      const intervalId = setInterval(() => {
        setTime(new Date());
      }, 200);
      const animationTimeout = setTimeout(() => {
        setShowText(true);
      }, 500);

      const examInterval = setInterval(updateExamText, 100);
      const deathInterval = setInterval(updateDeathText, 100);
      const confirmedInterval = setInterval(updateConfirmedText, 100);

      return () => {clearTimeout(animationTimeout);
      clearInterval(intervalId);
      clearInterval(examInterval);
      clearInterval(deathInterval);
      clearInterval(confirmedInterval);
      }
    }, []); //인자는 함수와 배열 2개, []에 들어있는 값이 변경되면 자동으로 브라우저가 랜더링
    const hPntCnt = "id";
    return (

        <div className={LiveCss}>
        <Nav/>
        <div style={appStyle}>
          <div className='clock'>
          <div className={`${LiveCss.App} ${showText ? LiveCss.fadeIn : ''}`}>
            {textArray}
          <div className={LiveCss.App}>
            현재까지 현황 🚑
            <h1 style={clockStyle}>
              현재 시간: 
              <day>{formattedDate}</day>
              <span>{time.toLocaleTimeString()}</span>
            </h1>
            </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <BsBatteryHalf size={100} color='white' />
              <span style={{ marginLeft: 270 }}></span>
              <BsBattery size={100} color='white' />
              <span style={{ marginLeft: 200 }}></span>
              <BiSolidAmbulance size={100} color='white' />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

            <span style={{ marginLeft: '10px' }}></span>
            <div className={LiveCss.App} style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
            <div className={LiveCss.center}>
            { (typeof liveCovid.response === 'undefined') ? (
                // fetch가 완료되지 않았을 경우에 대한 처리
                "Loading"
              ) : (
                <Counter number={liveCovid.response.body.items.item.accExamCnt}/>
                // data.response.body.items.item.map((u) => <p>{u.hPntCnt}</p>)
              )}
            </div>
            <div className={LiveCss.center_down}>
                {("누적 검사수".slice(0, examTextIndex))}
            </div>
              <span style={{ marginTop: '200px' }}></span>
            </div>
            <span style={{ marginLeft: '180px' }}></span>
            <div className={LiveCss.App} style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
            <div className={LiveCss.center}>
            { (typeof liveCovid.response === 'undefined') ? (
                // fetch가 완료되지 않았을 경우에 대한 처리
                "Loading"
              ) : (
                <Counter number={liveCovid.response.body.items.item.gPntCnt}/>
                // data.response.body.items.item.map((u) => <p>{u.hPntCnt}</p>)
              )}
            </div>
              <div className={LiveCss.center_down}>
                  {("사망자 수".slice(0, deathTextIndex))}
                </div>
              <span style={{ marginTop: '200px' }}></span>
            </div>
            <span style={{ marginLeft: '100px' }}></span>
            <div className={LiveCss.App} style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
            <div className={LiveCss.center}>
              { (typeof liveCovid.response === 'undefined') ? (
                // fetch가 완료되지 않았을 경우에 대한 처리
                "Loading"
              ) : (
                <Counter number={liveCovid.response.body.items.item.hPntCnt}/>
                // data.response.body.items.item.map((u) => <p>{u.hPntCnt}</p>)
              )}
        </div>
            <div className={LiveCss.center_down}>
              {("확진자 수".slice(0, confirmedTextIndex))}
            </div>
              <span style={{ marginTop: '200px' }}></span>
              
            </div>
            </div>      
          </div>
          </div>
        </div>
  );
}

export default LivePage;