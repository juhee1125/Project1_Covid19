import MainMenuCss from "./MainMenu.module.css";
import React from 'react'
import video from '../../src/backVideo.mp4'


const MainMenu = () => {
  const CovidLiveClick = () =>{
    window.location.href = '/live';}
  const CovidWorldClick = () => {
    window.location.href = '/world';
  }
  return (
    
    <div className={MainMenuCss}>
      <video autoPlay loop muted>
        <source src={video} type='video/mp4' />
      </video>
      <h1 className={MainMenuCss.h1}>
      Development of COVID-19 reinfection rate
      </h1>
      <h1 className={MainMenuCss.h2}>
      Covid-19 국내외 재감염률 개발
      </h1>
      <div className={MainMenuCss.frame}>
        <button className={`${MainMenuCss.button} ${MainMenuCss["custom-btn"]} ${MainMenuCss["btn-2"]}`}onClick={CovidLiveClick}>Covid-19 Live</button>
        <button className={`${MainMenuCss.button} ${MainMenuCss["custom-btn"]} ${MainMenuCss["btn-2"]}`}onClick={CovidWorldClick}>Covid-19 World</button>
      </div>
    </div>
  )
}

export default MainMenu