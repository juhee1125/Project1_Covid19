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
const countries = ['전 세계','미국', '중국', '인도', '프랑스', '독일', '브라질', '대한민국',
'일본', '이탈리아', '영국', '러시아', '튀르키예', '스페인', '오스트레일리아','베트남',
'아르헨티나', '네덜란드', '멕시코', '이란', '인도네시아', '폴란드','콜롬비아', '오스트리아',
'포르투갈', '우크라이나', '그리스', '칠레','말레이시아', '이스라엘','벨기에','태국',
'캐나다', '체코','페루','스위스','필리핀','남아프리카공화국','루마니아','덴마크','스웨덴',
'싱가포르','세르비아','이라크','뉴질랜드','헝가리','방글라데시','슬로바키아','조지아','요르단',
'아일랜드','파키스탄','카자흐스탄','노르웨이','필란드','슬로베니아','리투아니아','불가리아',
'모로코','크로아티아','과테말라','푸에르토리코','레바논','코스타리카','볼리비아','튀니지',
'쿠바','에콰도르','아랍에미리트','파나마','우루과이','몽골','네팔','벨라루스','라트비아',
'사우디아라비아','아제르바이잔','파라과이','팔레스타인','바레인','스리랑카','도미니카공화국',
'쿠웨이트','사이프러스','미얀마','몰도바','에스토니아','베네수엘라','이집트','카타르',
'리비아','에티오피아','레위니옹','온두라스','아르메니아','보스니아헤르체고비나','오만',
'룩셈부르크','북마케도니아','잠비아','케냐','알바니아','보츠와나','브루나이 다루살람',
'모리셔스','코소보','알제리','나이지리아','짐바브웨','몬테네그로','모잠비크','마르티니크',
'아프카니스탄','라오스','아이슬란드','과들루프','엘살바도르','트리니다드토바고','몰디브',
'우즈베키스탄','나미비아','우간다','가나','자메이카','캄보디아','르완다','카메룬','몰타',
'바베이도스','앙골라','콩고민주공화국','프랑스령 기아나','세네갈','말라위','키르기스스탄',
'코트디부아르','수리남','뉴칼레도니아','프랑스령폴리네시아','에스와티니','가이아나',
'벨리즈','피지','마다가스카르','저지','카보베르데','수단','모리타니','부탄','시리아',
'부룬디','괌','세이셸','가봉','안도라','파푸아뉴기니','퀴라소','아루바','탄자니아','마요트섬',
'토고','기니','바하마','맨섬','레소토','건지','패로제도','아이티','말리','케이맨 제도',
'세인트루시아','베냉','소말리아','미크로네시아','솔로몬제도','미국령 버진아일랜드',
'산마리노','동티모르','부르키나파소','리히텐슈타인','지브롤터','그레나다','버뮤다','남수단',
'타지키스탄','적도기니','모나코','통가','사모아','마셜제도','니카라과','지부티','중앙아프리카공화국',
'북마리아나 제도','감비아','세인트마틴섬','바누아투','그린란드','예멘','신트마르턴','에리트레아',
'보나이러','세인트빈센트그레나딘','기니비사우','니제르','코모로','앤티가바부다','아메리칸사모아',
'라이베리아','시에라리온','차드','영국령 버진아일랜드','쿡 제도','터크스 케이커스 제도',
'세인트키츠네비스','상투메프린시페','팔라우','생바르텔레미','나우루','키리바시','앵귈라','왈리스에푸투나',
'생피에르 미클롱','투발루','세인트헬레나 어센션 트리스탄다쿠냐','포클랜드 제도','몬세라트',
'신트외스타티위스','니우에 섬','사바 섬','그 외','토켈라우','교황청','핏케언 제도','조선민주주의인민공화국','투르크메니스탄'];

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