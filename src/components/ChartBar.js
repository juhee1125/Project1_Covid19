import React from 'react'

const ChartBar = () => {
  return (
    <div>
    <div className={CovidWorldCss}>
      <button className={CovidWorldCss.button}
        onClick={() => {
          // 전송 버튼 클릭 시 처리
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
  </div></div>
  )
}

export default ChartBar