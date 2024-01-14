import React, { useState, useEffect, useRef,useCallback } from "react";
import Chart from 'chart.js/auto';
import CircularProgress from '@mui/material/CircularProgress';
import CovidWorldCss from './CovidWorld.module.css';

const CheckBox = () => {
  const [chartData, setChartData] = useState({
    total_cases: [],
    total_deaths: [],
    // 나머지 데이터 필드도 필요한 대로 추가하세요
  });
  const [searchInput, setSearchInput] = useState("");
  const chartRef = useRef(null);
  const checkboxesRef = useRef([]);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [chartType, setChartType] = useState('bar');
  const countries = ['아프가니스탄', '알바니아', '알제리','아메리칸사모아','안도라','앙골라','앵귈라', '앤티가_바부다', '아르헨티나',
  '아르메니아','아루바','호주', '오스트리아','아제르바이잔','바하마','바레인','방글라데시','바베이도스','벨라루스',
  '벨기에','벨리즈','베냉','버뮤다','부탄','볼리비아','보나르_신트_유스타티우스와_사바','보스니아_헤르체고비나',
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
  var chart_dict={'total_cases':[],"total_deaths":[],"reproduction_rate":[],"positive_rate":[],"total_vaccinations":[],"people_vaccinated":[]}
  var list_date = [];
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
  //console.log(obj);
  obj['index']=index
  return obj
}

  const fetchDataForSelectedCountry = async () => {
    try {
      setLoading(true);
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
       console.log('formatted data ',formatted_data)
       var total_cases = formatted_data.total_cases;
      var total_deaths = formatted_data.total_deaths;
      var total = total_cases.map(i=>Number(i)).reduce((i,j)=>i+j)
      console.log('총합',total)
      console.log(total_cases, total_deaths)

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
       for (var [key, value] of Object.entries(formatted_data)) {
        if (key === 'index') {
          var sum_total_cases = [0, 0, 0, 0, 0, 0, 0, 0];
          var sum_total_death = [0, 0, 0, 0, 0, 0, 0, 0];
          for (var v in value) {
            for (var i = 0; i < 8; i++) {
              if (value[v] >= list_date[i] && value[v] < list_date[i + 1]) {
                var data_total_cases = Number(formatted_data['total_cases'][v][i]);
                var data_total_death = Number(formatted_data['total_deaths'][v][i]);
                sum_total_cases[i] += data_total_cases;
                sum_total_death[i] += data_total_death;
                break;
              }
            }
          }
          
          // React 상태를 업데이트합니다.
          setChartData((prevChartData) => ({
            ...prevChartData,
            total_cases: [...prevChartData.total_cases, ...sum_total_cases],
            total_deaths: [...prevChartData.total_deaths, ...sum_total_death],
          }));
        }
      }
      console.log(chartData);
        setData(chartData);
        drawChart();
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

   const drawChart = useCallback(() => {
    const ctx = chartRef.current?.getContext('2d');
    if (!ctx) {
      return;
    }
    const newChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels:  [202006, 202012, 202106, 202112, 202206, 202212, 202306, 202312]
        ,
        datasets: [
          {
            label: 'Total Cases',
            data: chartData.total_cases, 
            backgroundColor: 'blue', 
          },
          {
            label: 'Total Deaths',
            data: chartData.total_deaths,
            backgroundColor: 'red', 
          },
        ]
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

   useEffect(() => {
    if (selectedCountry) {
      fetchDataForSelectedCountry();
    }
  }, [selectedCountry]);

  useEffect(() => {
    drawChart();
  }, [drawChart]);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className={CovidWorldCss.card}>
      <input
        type="text"
        placeholder="검색..."
        value={searchInput}
        onChange={handleSearchInputChange}
      />

      <form className={`${CovidWorldCss.all_checked} ${CovidWorldCss.check}`}>
        <input
          type="checkbox"
          onChange={(e) => {
            const checked = e.target.checked;
            countries.forEach((country, index) => {
              checkboxesRef.current[index].checked = checked;
            });
          }}
        />
        <span>모두 선택</span>
      </form>

      <form className={`${CovidWorldCss.check} ${CovidWorldCss.checkNum}`}>
        {countries.map((country, index) => (
          <label key={index}>
            <input
              type="checkbox"
              name="checkbox"
              onChange={(e) => {
                const checked = e.target.checked;
                const selectedCountry = countries[index];

                if (checked) {
                  console.log(`선택된 국가: ${selectedCountry}`);
                  setSelectedCountry(selectedCountry);
                } else {
                  console.log(`선택 해제된 국가: ${selectedCountry}`);
                }
              }}
              ref={(ref) => (checkboxesRef.current[index] = ref)}
            />
            {country}
          </label>
        ))}
      </form>

      <div className={CovidWorldCss}>
        <button className={CovidWorldCss.button}
          onClick={() => {
            setChartType('bar');
            // 전송 버튼 클릭 시 처리
          }}
        >
          Bar Chart
        </button>
        <button
          className={CovidWorldCss.button}
          onClick={() => {
            setChartType('line');
          }}
        >
          Line Chart
        </button>
        <button
          className={CovidWorldCss.button}
          onClick={() => {
            setChartType('radar');
          }}
        >
          PolarArea Chart
        </button>
        {loading ? (
          <div>
            <CircularProgress />로딩중...
          </div>
        ) : (
          <canvas id="barChart" width="800" height="600" ref={chartRef}></canvas>
        )}
      </div>
    </div>
  );
};

export default CheckBox;