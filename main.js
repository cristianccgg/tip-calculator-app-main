const inputBill = document.getElementById("input-bill");
const numOfPeople = document.getElementById("num-people");
const tipAmount = document.getElementById("result-per-people");
const total = document.getElementById("total");
const btnContainer = document.getElementById("btns-container");
const customBtn = document.getElementById("custom-btn");
const resetBtn = document.getElementById("reset-btn");
let tipPercentage = 0;

btnContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("tip-btn")) {
    tipPercentage = parseFloat(event.target.dataset.percentage);
    updateTotals();
  }
});

const calcTotal = (tipPercentage) => {
  const billValue = parseFloat(inputBill.value) || 0;
  let peopleValue = parseInt(numOfPeople.value) || 1;
  let customValue = parseFloat(customBtn.value) || 0;

  let tipValue = tipPercentage;
  if (customValue > 0) {
    tipValue = customValue;
  }

  const billWithTip =
    (billValue * tipPercentage) / 100 / peopleValue ||
    (billValue * customValue) / 100 / peopleValue;
  const billPlusTip = billWithTip + billValue / peopleValue;

  return [billWithTip, billPlusTip];
};

const updateTotals = () => {
  const results = calcTotal(tipPercentage);
  total.innerText = `$${results[1].toLocaleString()}`;
  tipAmount.innerText = `$${results[0].toLocaleString()}`;
};

inputBill.addEventListener("input", updateTotals);
numOfPeople.addEventListener("input", updateTotals);
customBtn.addEventListener("input", updateTotals);
resetBtn.addEventListener("click", () => {
  inputBill.value = "";
  numOfPeople.value = "";
  customBtn.value = "";
  tipPercentage = 0;

  updateTotals();
});
