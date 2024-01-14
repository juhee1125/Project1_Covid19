import React, { useState, useEffect, useRef,useCallback } from "react";
import Chart from 'chart.js/auto';
import CovidWorldCss from './CovidWorld.module.css';
import { json } from "react-router-dom";


const CheckBox = ({ checkboxesRef, setSelectedCountry, countries, setSelectedTitle, titles }) => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedButton, setSelectedButton] = useState(null);
  

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className={CovidWorldCss.App}>
      <div className={CovidWorldCss.search_container}>
        <input
          type="text"
          placeholder="검색..."
          className={CovidWorldCss.search_input}
          value={searchInput}
          onChange={handleSearchInputChange}
        />

        <form className={`${CovidWorldCss.check} ${CovidWorldCss.checkNum}`}>
          {countries
            .filter((country) =>
              country.toLowerCase().includes(searchInput.toLowerCase())
            )
            .map((country, index) => (
              <label key={index}>
                <button
  className={`${CovidWorldCss.buttonCountry} ${selectedButton === country ? CovidWorldCss.selected : ''}`}
  type="button"
  onClick={() => {
    // 변경된 부분: 누를 때마다 선택 상태를 토글합니다.
    const newSelectedButton = selectedButton === country ? '' : country;

    // 변경된 부분: 선택 상태를 업데이트합니다.
    setSelectedCountry(newSelectedButton);
    setSelectedButton(newSelectedButton);

    if (selectedButton === country) {
      console.log(`선택 해제된 국가: ${country}`);
    } else {
      console.log(`선택된 국가: ${country}`);
    }
  }}
>
  {country}
</button>
              </label>
            ))}
        </form>
      </div>

      <div style={{ marginTop: '30px' }}>
        <form className={`${CovidWorldCss.check} ${CovidWorldCss.checkNum_2}`}>
          {titles.map((title, index) => (
            <label key={index}>
              <input
                type="checkbox"
                name="checkbox"
                className={CovidWorldCss.input}
                onChange={(e) => {
                  const checked = e.target.checked;
                  const selectedTitle = titles[index];

                  if (checked) {
                    console.log(`선택된 컬럼: ${selectedTitle}`);
                    setSelectedTitle(selectedTitle);
                  } else {
                    console.log(`선택 해제된 컬럼: ${selectedTitle}`);
                    setSelectedTitle('');
                  }
                }}
                ref={(ref) => (checkboxesRef.current[index] = ref)}
              />
              {title}
            </label>
          ))}
        </form>
      </div>
    </div>
  );
};

export default CheckBox;
