"use strict";
//DATE 객체 생성
let DATE = new Date();
//달력 그리는 함수
function renderCalendar() {
  //year-month 나타내기
  const YEAR = DATE.getFullYear();
  const MONTH = DATE.getMonth();

  document.querySelector(
    ".year-month"
  ).textContent = `${YEAR} ${DATE.toLocaleString("en-US", { month: "short" })}`;
  //지난달, 이번달 마지막 날짜 구하기
  const prevLastDate = new Date(YEAR, MONTH, 0);
  const thisLastDate = new Date(YEAR, MONTH + 1, 0);
  const PLDate = prevLastDate.getDate();
  const PLDay = prevLastDate.getDay();
  const TLDate = thisLastDate.getDate();
  const TLDay = thisLastDate.getDay();
  //지난달, 이번달, 다음달 배열 만들기
  const prevDates = [];
  const thisDates = [...Array(TLDate + 1).keys()].slice(1);
  const nextDates = [];
  //지난달 배열
  if (PLDay !== 6) {
    for (let i = 0; i < PLDay + 1; i++) {
      prevDates.unshift(PLDate - i);
    }
  }
  //다음달 배열
  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i);
  }
  //지난달 + 이번달 + 다음달 배열 합치기
  const dates = prevDates.concat(thisDates, nextDates);
  //이번달 1일의 인덱스값 구하기
  const firstDateIndex = dates.indexOf(1);
  //이번달 마지막날 인덱스값 구하기
  const lastDateIndex = dates.lastIndexOf(TLDate);
  //dates배열을 html에 나타내기
  dates.forEach((date, i) => {
    const condition =
      i >= firstDateIndex && i < lastDateIndex + 1 ? "this" : "other";

    dates[
      i
    ] = `<div class="date"><span class="${condition}">${date}</span></div>`;
  });
  document.querySelector(".dates").innerHTML = dates.join("");

  const today = new Date();
  if (MONTH === today.getMonth() && YEAR === today.getFullYear()) {
    for (let date of document.querySelectorAll(".this")) {
      if (+date.innerText === today.getDate()) {
        //+ 단항 연산자를 앞에 붙여서 문자열을 숫자로 변환
        date.classList.add("today");
        break;
      }
    }
  }
}

renderCalendar();

//지난달 달력 그리기
function prevMonth() {
  DATE.setMonth(DATE.getMonth() - 1);
  renderCalendar();
}
//오늘 날짜가 있는 달력으로 돌아오기
function goToday() {
  DATE = new Date();
  renderCalendar();
}
//다음달 달력 그리기
function nextMonth() {
  DATE.setMonth(DATE.getMonth() + 1);
  renderCalendar();
}

const goPrevBtn = document.querySelector(".go-prev");
goPrevBtn.addEventListener("click", prevMonth);
const goTodayBtn = document.querySelector(".go-today");
goTodayBtn.addEventListener("click", goToday);
const goNextBtn = document.querySelector(".go-next");
goNextBtn.addEventListener("click", nextMonth);
