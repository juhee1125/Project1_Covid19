import { useEffect, useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import './Nav.css'

function Nav() {

  const navigate=useNavigate();

  const [checkAnim, setCheckAnim] = useState(true);

  const menuBtn = useRef();  //빈 참조변수 생성
  const sub1Btn = useRef();
  const sub2Btn = useRef();
  const sub3Btn = useRef();
  const M1Text=useRef();
  const M2Text=useRef();
  const M3Text=useRef();
  const blurPage=useRef();

  const buttons = [sub1Btn, sub2Btn, sub3Btn];
  const clickMenu = () => {
    if (sub1Btn.current.style.display === 'block') {
      buttons.forEach(btn => {
        btn.current.classList.remove("appear");
        btn.current.classList.add("disappear");
      });
    } else {
      buttons.forEach(btn => {
        btn.current.classList.remove("disappear");
        btn.current.classList.add("appear");
        btn.current.style.display = 'block'; // ref ={}로 참조한 요소 변수에 담기
      });
  
      blurPage.current.style.display = 'block';
      setCheckAnim(true);
    }
  };  


  const clicksub1 = () => {
    blurPage.current.style.display='none';
    clickMenu();
    navigate('/live');
   
  };
  const clicksub2 = () => {
    blurPage.current.style.display='none';
    clickMenu();
    navigate('/World');
  };
  const clicksub3 = () => {
    blurPage.current.style.display='none';
    clickMenu();
    navigate('/');
  };

  const animSub1 = () => { // animation 종료 시 실행
    if (checkAnim) {
      setCheckAnim(false);
    } else {
      buttons.forEach(btn => btn.current.style.display = 'none');
      blurPage.current.style.display = 'none';
      setCheckAnim(true);
    }
  };

  const detailSub1 = () => {              // 서브메뉴 :hover
    if( M1Text.current.style.display=="block"){
      M1Text.current.style.display="none";
    }else{
      M1Text.current.style.display="block";
    }
  }
  const detailSub2 = () => {              // 서브메뉴 :hover
    if( M2Text.current.style.display=="block"){
      M2Text.current.style.display="none";
    }else{
      M2Text.current.style.display="block";
    }
  }
  const detailMain = () => {              // 서브메뉴 :hover
    if( M3Text.current.style.display=="block"){
      M3Text.current.style.display="none";
    }else{
      M3Text.current.style.display="block";
    }
  }
  

  return (
    <div>
      <input type="button" id="menu" value="Menu" ref={menuBtn} onClick={clickMenu}></input>
      <input type="button" className="submenu1 disappear" ref={sub1Btn} onClick={clicksub1} onMouseEnter={detailSub1} onMouseLeave={detailSub1} onAnimationEnd={animSub1}></input>
      <input type="button" className="submenu2 disappear" ref={sub2Btn} onClick={clicksub2} onMouseEnter={detailSub2} onMouseLeave={detailSub2} onAnimationEnd={animSub1}></input>
      <input type="button" className="submenu3 disappear" ref={sub3Btn} onClick={clicksub3} onMouseEnter={detailMain} onMouseLeave={detailMain} onAnimationEnd={animSub1}></input>
      <div id="M1Text" ref={M1Text}>Covid-19 Live</div>
      <div id="M2Text" ref={M2Text}>Covid-19 World</div>
      <div id="M3Text" ref={M3Text}>Main</div>
      <div id="blur" ref={blurPage} onClick={clickMenu}></div>
      
    </div>

    );
}


export default Nav;