import React, { useState ,useEffect } from "react";
import CovidWorldCss from './CovidWorld.module.css'
import Chart from 'chart.js/auto';
import CircularProgress from '@mui/material/CircularProgress';
const CheckBox = ()=>{
  
const [searchInput, setSearchInput] = useState("");
const chartRef = React.useRef(null);
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [selectedCountry, setSelectedCountry] = useState('');
const countries = ['아프가니스탄', '알바니아', '알제리','아메리칸사모아','안도라','앙골라','앵귈라', '앤티가_바부다', '아르헨티나',
'아르메니아','아루바','호주', '오스트리아','아제르바이잔','바하마','바레인','방글라데시','바베이도스','벨라루스',
'벨기에','벨리즈','베냉','버뮤다','부탄','볼리비아','보나르 신트 유스타티우스와 사바','보스니아 헤르체고비나',
'보츠와나','브라질','영국령_버진아일랜드','브루나이','불가리아','부르키나파소','부룬디','캄보디아','카메룬','캐나다',
'카보베르데','케이맨_제도','중앙아프리카공화국','차드','칠레','중국','콜롬비아','코모로','콩고','쿡_제도','코스타리카',
'코트디부아르','크로아티아','쿠바','퀴라소','키프로스','체코','콩고_민주_공화국','덴마크','지부티','도미니카',
'도미니카공화국','에콰도르','이집트','엘살바도르','잉글랜드','적도 기니','에리트레아','에스토니아','에스와티니',
'에티오피아','페로스_제도','포클랜드_제도','피지','핀란드','프랑스','프랑스령_기아나','프랑스령_폴리네시아',
'가봉','감비아','조지아','독일','가나','지브롤터','그리스','그린란드','그레나다','과들루프','괌','과테말라',
'건지_섬','기니','기니비사우','가이아나','아이티','온두라스','홍콩','헝가리','아이슬란드','인도','인도네시아',
'이란','이라크','아일랜드','맨섬','이스라엘','이탈리아','자메이카','일본','저지섬','요르단','카자흐스탄','케냐',
'키리바시','코소보','쿠웨이트','키르기스스탄','라오스','라트비아','레바논','레소토','라이베리아','리비아','리히텐슈타인',
'리투아니아','룩셈부르크','마카오','마다가스카르','말라위','말레이시아','몰디브','말리','몰타','마샬_군도',
'마르티니크','모리타니아','모리셔스','마요트','멕시코','미크로네시아 연방','몰도바','모나코','몽골','몬테네그로',
'몬세라트','모로코','모잠비크','미얀마','나미비아','나우루','네팔','네덜란드','누벨칼레도니','뉴질랜드','니카라과',
'니제르','나이지리아','니우에','조선민주주의인민공화국','북마케도니아','북키프로스','북아일랜드','북마리아나_제도',
'노르웨이','오만','파키스탄','팔라우','팔레스타인','파나마','파푸아뉴기니','파라과이','페루','필리핀','핏케언_제도',
'폴란드','포르투갈','푸에르토리코','카타르','레위니옹','루마니아','러시아','르완다','생바르텔레미','세인트헬레나',
'세인트키츠 네비스','세인트루시아','생마르탱','생피에르_미클롱','세인트빈센트 그레나딘','사모아','산마리노',
'상투메 프린시페','사우디아라비아','스코틀랜드','세네갈','세르비아','세이셸','시에라리온','싱가포르','신트마르턴',
'슬로바키아','슬로베니아','솔로몬 제도','소말리아','대한민국','south_수단','스페인','스리랑카','수단','수리남',
'스웨덴','스위스','시리아','대만','타지키스탄','탄자니아','태국','티모르','토고','토켈라우','통가','트리니다드_토바고',
'튀니지','터키','투르크메니스탄','터크스_케이커스_제도','투발루','우간다','우크라이나','아랍에미리트','영국',
'미국','미국령 버진아일랜드','우루과이','우즈베키스탄','바누아투','바티칸_시국','베네수엘라','베트남','웨일즈',
'왈리스_푸투나','사하라사막','전세계','예멘','잠비아','짐바브웨'];

const fetchDataForSelectedCountry = async () => {
  try {
    setLoading(true);
    const response = await fetch(`http://localhost:5000/api/data?country=${selectedCountry}`);
    if (response.ok) {
      const jsonData = await response.json();
      var index =jsonData.index.map(i=>new Date(i)).map(date=>
        {
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1 해주고, 두 자리로 포맷팅
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
// 함수 추가: 검색어를 업데이트합니다.
const handleSearchInputChange = (e) => {
  setSearchInput(e.target.value);
};

// 함수 추가: 검색어에 따라 필터링된 나라 목록을 반환합니다.
const filterCountries = () => {
  return countries.filter((country) =>
    country.toLowerCase().includes(searchInput.toLowerCase())
  );
};

return (
  <div className={CovidWorldCss.card}>
    {countries.map(()=>( <input type="theckbox" />))}
    <input
      type="text"
      placeholder="검색..." // 나라 검색창
      value={searchInput}
      onChange={handleSearchInputChange} // 검색어 입력 시 호출
    />

    <form className={`${CovidWorldCss.all_checked} ${CovidWorldCss.check}`}>
      <input
        type="checkbox"
       
        defaultChecked={false}
       
       
      />
      <span>모두 선택</span>
    </form>
  
    <div className={CovidWorldCss}>
    <button className={CovidWorldCss.button}
      onClick={() => {
        //checkedNum();
      }}
    >
      전송
    </button>
    {loading ? (
        <div>
          <CircularProgress />로딩중...
        </div>
      ) : (
        <canvas id="barChart" width="400" height="200" ref={chartRef}></canvas>
      )}
    </div>
  </div>
);
};

export default CheckBox;