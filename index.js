const state = {
  INVALID: 'invalid',
  VALID: 'valid'
}

const BTN_TAG_NAME = 'BUTTON'

let tipBtnValue = 1

const tipAmount = document.getElementById('tip_amount')
const totalSum = document.getElementById('total_sum')

const customTip = document.getElementById('custom_tip')
customTip.addEventListener('change', (e) => {
  customTip.classList.remove(state.INVALID)
  customTip.classList.remove(state.VALID)

  if (isTipValid(customTip.value)) {
    customTip.classList.add(state.VALID)
    tipBtnValue = customTip.value
  } else {
    customTip.classList.add(state.INVALID)
  }
  checkAmount()
})

const selectTip = document.getElementById('select_tip')
selectTip.addEventListener('click', (e) => {
  resetTip(selectTip)

  resetInput(customTip)

  if (e.target.tagName !== BTN_TAG_NAME) return
  // add active to a btn that was clicked
  e.target.classList.add('active')
  tipBtnValue = e.target.innerText.slice(0, e.target.innerText.length - 1);
  checkAmount()
})

const bill = document.getElementById('bill');
bill.addEventListener('change', (e) => {
  bill.classList.remove(state.INVALID)
  bill.classList.remove(state.VALID)

  if (isBillValid(bill.value)) {
    bill.classList.add(state.VALID)
  } else {
    bill.classList.add(state.INVALID)
  }
  checkAmount()
});

const peopleSelection = document.getElementById('people_selection');
peopleSelection.addEventListener('change', (e) => {
  peopleSelection.classList.remove(state.INVALID)
  peopleSelection.classList.remove(state.VALID)

  if (isPeopleSelectionValid(peopleSelection.value)) {
    peopleSelection.classList.add(state.VALID)
  } else {
    peopleSelection.classList.add(state.INVALID);
  }
  checkAmount()
})

function isBillValid(bill) {
  return bill > 0 && bill < 10_000
}

function isPeopleSelectionValid(peopleSelection) {
  return peopleSelection > 0 && peopleSelection <= 20
}

function isTipValid(tip) {
  return tip > 0 && tip <= 100
}

function checkAmount() {
  if (!isBillValid(bill.value)) return 0
  if (!isPeopleSelectionValid(peopleSelection.value)) return 0
  if (!isTipValid(tipBtnValue)) return 0
  const calcTip = bill.value * (tipBtnValue / 100) / peopleSelection.value
  tipAmount.innerText = `$${calcTip.toFixed(2)}`
  const calcSum = bill.value / peopleSelection.value + calcTip
  totalSum.innerText = `$${calcSum.toFixed(2)}`
}

function resetInput(input) {
  input.classList.remove(state.INVALID)
  input.classList.remove(state.VALID)
  input.value = ''
}

function resetTip (selectTip) {
  const btns = selectTip.children
  for (i = 0; i < btns.length; i++) {
    if (btns[i].tagName !== BTN_TAG_NAME) continue
    btns[i].classList.remove('active')
  }
}

const resetBtn = document.getElementById('reset_btn')
resetBtn.addEventListener('click', (e) => {
  resetInput(customTip)
  resetInput(selectTip)
  resetInput(bill)
  resetInput(peopleSelection)
  tipAmount.innerText = "$0.00"
  totalSum.innerText = "$0.00"
})
