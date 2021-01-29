class Calculator {
  constructor(previousCalculation, currentCalculation) {
    this.previousCalculation = previousCalculation;
    this.currentCalculation = currentCalculation;
    this.clear();
  }
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }
  compute() {
    let compution
    const previous = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if(isNaN(previous) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
          compution = previous + current;
        break;
      case '-':
        compution = previous - current;
        break;
      case '*':
        compution = previous * current;
        break;
      case '/':
        compution = previous / current;
      default:
        return
        break;
    }
    this.currentOperand = compution;
    this.operation = undefined;
    this.previousOperand = ''
  }
  updateDisplay() {
    this.currentCalculation.innerText = this.currentOperand;
    this.previousCalculation.innerText = `${this.previousOperand}${this.operation? this.operation : ''}`;
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equal]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const previousCalculation = document.querySelector(".previous-calculation");
const currentCalculation = document.querySelector(".current-calculation");

const calculatorObject = new Calculator(
  previousCalculation,
  currentCalculation
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculatorObject.appendNumber(button.dataset.number);
    calculatorObject.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculatorObject.chooseOperation(button.dataset.operation);
    calculatorObject.updateDisplay();
  });
});

equalButton.addEventListener("click", () => {
  calculatorObject.compute();
  calculatorObject.updateDisplay()
});


allClearButton.addEventListener('click', ()=> {
  calculatorObject.clear()
  calculatorObject.updateDisplay()
})

deleteButton.addEventListener('click', ()=> {
  calculatorObject.delete()
  calculatorObject.updateDisplay()
})