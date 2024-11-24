const arrow = document.getElementById("arrow");
const yearText = document.getElementById("years");
const monthText = document.getElementById("months");
const dayText = document.getElementById("days");
const year = document.getElementById("year");
const month = document.getElementById("month");
const day = document.getElementById("day");
const date = new Date();
const currYear = date.getFullYear();
const currMonth = date.getMonth() + 1;
const currDay = date.getDate();

const inputValidation = () => {
  let isValid = true;
  //Leap Year Validation
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (
    (year.value % 4 == 0 && year.value % 100 != 100) ||
    year.value % 400 == 0
  ) {
    days[1] = 29;
  }
  //Day Validation
  if (day.value == "") {
    error("day");
    isValid = false;
    day.nextElementSibling.innerText = "The field is empty";
  } else if (day.value > days[month.value - 1] || day.value < 1) {
    error("day");
    isValid = false;
    day.nextElementSibling.innerText = "Invalid Day";
  } else if (day.value > 31) {
    isValid = false;
    day.nextElementSibling.innerText = "Invalid Day";
    error("day");
  } else if (day.value.length > 2) {
    error("day");
    isValid = false;
    day.nextElementSibling.innerText = "Invalid Day";
  } else {
    valid("day");
  }

  //Month Validation
  if (month.value == "") {
    error("month");
    month.nextElementSibling.innerText = "The field is empty";
    isValid = false;
  } else if (month.value.length > 2) {
    error("month");
    isValid = false;
    month.nextElementSibling.innerText = "Invalid Month";
  } else if (month.value > 12 || month.value < 1) {
    error("month");
    isValid = false;
    month.nextElementSibling.innerText = "Invalid Month";
  } else {
    valid("month");
  }
  //Year Validation
  if (year.value == "") {
    error("year");
    isValid = false;
    year.nextElementSibling.innerText = "The field is empty";
  } else if (year.value.length < 4) {
    error("year");
    isValid = false;
    year.nextElementSibling.innerText = "Invalid Year";
  } else if (year.value < 1) {
    error("year");
    isValid = false;
    year.nextElementSibling.innerText = "Invalid Year";
  } else if (year.value >= currYear) {
    error("year");
    isValid = false;
    year.nextElementSibling.innerText = "Invalid Year";
  } else {
    valid("year");
  }
  return isValid;
};

const error = (id) => {
  document.getElementById(`${id}`).classList.add("border-[hsl(0_100%_67%)]");
  document.getElementById(`${id}`).classList.remove("border-[hsl(0_0%_86%)]");
  document
    .getElementById(`${id}`)
    .nextElementSibling.classList.remove("hidden");
};
const valid = (id) => {
  document.getElementById(`${id}`).classList.add("border-[hsl(0_0%_86%)]");
  document.getElementById(`${id}`).classList.remove("border-[hsl(0_100%_67%)]");
  document.getElementById(`${id}`).nextElementSibling.classList.add("hidden");
};

function data() {
  if (inputValidation()) {
    const userYear = year.value;
    const userMonth = month.value;
    const userDay = day.value;
    let totalYear = currYear - userYear;
    let totalMonth = currMonth - userMonth;
    let totalDay = currDay - userDay;
    //Day Calculation if negative number occurs
    if (totalDay < 0) {
      totalMonth -= 1;
      const prevMonth = new Date(currYear, currMonth - 1, 0).getDate();
      totalDay += prevMonth;
    }
    //Month Calculation if negative number occurs
    if (totalMonth < 0) {
      totalYear -= 1;
      totalMonth += 12;
    }
    yearText.innerText = totalYear;
    monthText.innerText = totalMonth;
    dayText.innerText = totalDay;
    yearText.classList.remove("sm:tracking-[12px]");
    monthText.classList.remove("sm:tracking-[12px]");
    dayText.classList.remove("sm:tracking-[12px]");
    yearText.classList.add("mr-3");
    monthText.classList.add("mr-3");
    dayText.classList.add("mr-3");
  } else {
    yearText.innerText = "--";
    monthText.innerText = "--";
    dayText.innerText = "--";
  }
}

document.querySelector("form").addEventListener("input", (e) => {
  e.preventDefault();
  if (!inputValidation()) {
    yearText.innerText = "--";
    monthText.innerText = "--";
    dayText.innerText = "--";
    yearText.classList.add("sm:tracking-[12px]");
    monthText.classList.add("sm:tracking-[12px]");
    dayText.classList.add("sm:tracking-[12px]");
    yearText.classList.remove("mr-3");
    monthText.classList.remove("mr-3");
    dayText.classList.remove("mr-3");
  }
});
arrow.addEventListener("click", (e) => {
  e.preventDefault();
  data();
});
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  data();
});
