const State = {
  INVALID: 'invalid',
  VALID: 'valid'
}

const BTN_TAG_NAME = 'BUTTON'

let tipBtnValue = 1

const tipAmount = document.getElementById('tip_amount')
const totalSum = document.getElementById('total_sum')

const customTip = document.getElementById('custom_tip')
customTip.addEventListener('change', e => {
  customTip.classList.remove(State.INVALID)
  customTip.classList.remove(State.VALID)

  if (isTipValid(customTip.value)) {
    customTip.classList.add(State.VALID)
    tipBtnValue = customTip.value
  } else {
    customTip.classList.add(State.INVALID)
  }
  checkAmount()
})

const selectTip = document.getElementById('select_tip')
selectTip.addEventListener('click', e => {
  resetSelectTipState(selectTip)
  resetInput(customTip)

  if (e.target.tagName !== BTN_TAG_NAME) return

  // add 'active' class to a btn that was clicked
  e.target.classList.add('active')
  tipBtnValue = e.target.innerText.slice(0, e.target.innerText.length - 1)
  checkAmount()
})

const bill = document.getElementById('bill')
bill.addEventListener('change', e => {
  bill.classList.remove(State.INVALID)
  bill.classList.remove(State.VALID)

  if (isBillValid(bill.value)) {
    bill.classList.add(State.VALID)
  } else {
    bill.classList.add(State.INVALID)
  }
  checkAmount()
})

const peopleSelection = document.getElementById('people_selection')
peopleSelection.addEventListener('change', e => {
  peopleSelection.classList.remove(State.INVALID)
  peopleSelection.classList.remove(State.VALID)

  if (isPeopleSelectionValid(peopleSelection.value)) {
    peopleSelection.classList.add(State.VALID)
  } else {
    peopleSelection.classList.add(State.INVALID)
  }
  checkAmount()
})

function isBillValid (bill) {
  return bill > 0 && bill < 10_000
}

function isPeopleSelectionValid (peopleSelection) {
  return peopleSelection > 0 && peopleSelection <= 20
}

function isTipValid (tip) {
  return tip > 0 && tip <= 100
}

function checkAmount () {
  if (!isBillValid(bill.value)) return
  if (!isPeopleSelectionValid(peopleSelection.value)) return
  if (!isTipValid(tipBtnValue)) return
  const calcTip = (bill.value * (tipBtnValue / 100)) / peopleSelection.value
  tipAmount.innerText = `$${calcTip.toFixed(2)}`
  const calcSum = bill.value / peopleSelection.value + calcTip
  totalSum.innerText = `$${calcSum.toFixed(2)}`
}

function resetInput (input) {
  input.classList.remove(State.INVALID)
  input.classList.remove(State.VALID)
  input.value = ''
}

function resetSelectTipState (selectTip) {
  const btns = selectTip.children
  for (i = 0; i < btns.length; i++) {
    if (btns[i].tagName !== BTN_TAG_NAME) continue
    btns[i].classList.remove('active')
  }
}

const resetBtn = document.getElementById('reset_btn')
resetBtn.addEventListener('click', e => {
  resetInput(customTip)
  resetSelectTipState(selectTip)
  resetInput(bill)
  resetInput(peopleSelection)
  tipAmount.innerText = '$0.00'
  totalSum.innerText = '$0.00'
})
