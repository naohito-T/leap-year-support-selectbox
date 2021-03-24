/**
 * @author naohito-T
 * @desc   閏年対応のselectを作成します。
 * @use    html側で以下の<div>要素を作成しこのスクリプトを読み込んで下さい。
 *         1. `<select id="year" name="year"></select>`
 *         2. `<select id="month" name="month"></select>`
 *         3. `<select id="day" name="day"></select>`
 */
(() => {
  // 4の倍数の年はうるう年でよいが、2100年や2200年は平年として扱う(西暦の年号が100で割り切れて400で割り切れない年)
  // DOM
  const yearBox = document.getElementById('year'); // div id="year"
  const monthBox = document.getElementById('month'); // div id="month"
  const dayBox = document.getElementById('day'); // div id="day"
  // 日付
  const today = new Date(); // 今日の日付
  const thisYear = today.getFullYear(); // 現在の年
  const thisMonth = today.getMonth() + 1; // 現在の月
  const thisDay = today.getDate(); // 現在の日

  /**
   * @desc 任意の年が閏年であるかをチェックする。
   * @param {number} year
   * @return  {boolean} 閏年であるかを示す真偽値
   */
  // prettier-ignore
  const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

  /**
   * 任意の年の2月の日数を数える
   * @param {number} チェックしたい西暦年号
   * @return {number} その年の2月の日数
   */
  const countDatesOfFeb = (year) => (isLeapYear(year) ? 29 : 28);

  // prettier-ignore
  let datesOfYear = [31, countDatesOfFeb(thisYear), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 各月の日数
  /**
   * @desc  selectBox to option tag create
   * @param {String} id       HTML ID
   * @param {number} startNum option start number
   * @param {number} endNum   option end number
   * @param {number} current  current time
   */
  const getSelect = (id, startNum, endNum, current) => {
    const selectDom = document.getElementById(id);
    let optionDom;
    for (let i = startNum; i <= endNum; i++) {
      i === current
        ? (option = '<option value="' + i + '" selected>' + i + '</option>')
        : (option = '<option value="' + i + '">' + i + '</option>');
      optionDom += option;
    }
    selectDom.insertAdjacentHTML('beforeend', optionDom);
  };

  yearBox.addEventListener('change', (e) => {
    monthBox.innerHTML = '';
    dayBox.innerHTML = '';
    const updatedYear = e.target.value;
    // prettier-ignore
    datesOfYear = [31, countDatesOfFeb(updatedYear), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    getSelect('month', 1, 12, 1);
    getSelect('day', 1, datesOfYear[0], 1);
  });

  monthBox.addEventListener('change', (e) => {
    dayBox.innerHTML = '';
    const selectedMonth = e.target.value;
    getSelect('day', 1, datesOfYear[selectedMonth - 1], 1);
  });

  // ロード時
  getSelect('year', 1900, thisYear, thisYear);
  getSelect('month', 1, 12, thisMonth);
  getSelect('day', 1, datesOfYear[thisMonth - 1], thisDay);
})();
