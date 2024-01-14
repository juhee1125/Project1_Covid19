import CovidWorldCss from "./CovidWorld.module.css";

const SelectedItem = ({ setSelected, selected, resultRef }) => {
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
    <div className={CovidWorldCss.card}>
      <form onSubmit={btnHandler}>
        {selected.length === 0 ? (
          <span>선택한 국가가 없습니다.</span>
        ) : (
          <div>
            <label>
              <input
                type="checkbox"
                name="selectAll"
                id="selectAll"
                onChange={handleSelectAll}
              />
              <form className={CovidWorldCss.allClear}>
                <span>전체 삭제</span>
              </form>
            </label>
            {selected.map((l, index) => {
              return (
                <label key={index} ref={(ref) => (resultRef.current[index] = ref)}>
                  <input type="checkbox" name="checkbox" id={`checkbox-${index}`} />
                  {l}
                </label>
              );
            })}
          </div>
        )}
        <div className={CovidWorldCss}>
        {selected.length === 0 ? (
          ""
        ) : (
          
          <button className={CovidWorldCss.button} type="submit">삭제</button>
          
        )}
        </div>
      </form>
    </div>
  );
};

export default SelectedItem;