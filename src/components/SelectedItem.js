import CovidWorldCss from "./CovidWorld.module.css";
import CircularProgress from '@mui/material/CircularProgress';
import React, { useState, useRef, useEffect } from "react";

const SelectedItem = ({ setSelected, selected, resultRef, loading, setChartType, chartRef}) => {

  const btnHandler = (e) => {
    e.preventDefault();
    const checkedLabels = Array.from(resultRef.current)
      .filter((ref) => ref && ref.childNodes[0] && ref.childNodes[0].checked && ref.childNodes[0].id !== 'selectAll') // Exclude the "selectAll" checkbox
      .map((ref) => ref.childNodes[1].textContent);

    const updateSelected = selected.filter(
      (item) => !checkedLabels.includes(item)
    );
    setSelected(updateSelected);

    // 체크박스 선택 해제
    Array.from(resultRef.current).forEach((ref) => {
      if (ref && ref.childNodes[0] && ref.childNodes[0].checked) {
        ref.childNodes[0].checked = false;
      }
    });
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    Array.from(resultRef.current).forEach((ref) => {
      if (ref && ref.childNodes[0]) {
        ref.childNodes[0].checked = isChecked;
      }
    });
  };

  return (
    <div className={CovidWorldCss.selectedCard}>
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
            setChartType('polarArea');
          }}
        >
          PolarArea Chart
        </button>
      </div>
      {loading ? (
          <div>
            {/* <CircularProgress />로딩중... */}
          </div>
        ) : (
          <canvas id="barChart" width="800" height="600" ref={chartRef}></canvas>
        )}
        
    </div>
  );
};

export default SelectedItem;