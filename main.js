 // Calculator Class

 class Calc{
    constructor(prev_val, current_val){
        this.prev_val = prev_val
        this.current_val = current_val
    }

    allclear() {
        this.current_op = ''
        this.prev_op = ''
        this.operation = undefined
      }
    
    clear() {
        this.current_op = this.current_op.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.current_op.includes('.')) return
        this.current_op = this.current_op.toString() + number
      }

      chooseOperation(operation) {
        if (this.current_op === '') return
        if (this.prev_op !== '') {
          this.compute()
        }
        this.operation = operation
        this.prev_op = this.current_op
        this.current_op = ''
      }
    
      compute() {
        let computation
        const prev = parseFloat(this.prev_op)
        const current = parseFloat(this.current_op)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
          case '+':
            computation = prev + current
            break
          case '-':
            computation = prev - current
            break
          case '*':
            computation = prev * current
            break
          case '÷':
            computation = prev / current
            break
          default:
            return
        }
        this.current_op = computation
        this.operation = undefined
        this.prev_op = ''
      }
    
      getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
      }


      updateDisplay() {
        this.current_val.innerText = this.getDisplayNumber(this.current_val)
        if (this.operation != null) {
          this.prev_val.innerText = `${this.getDisplayNumber(this.prev_val)} ${this.operation}`
        } else {
          this.prev_val.innerText = ''
        }
      }
 }


const ac_btn = document.querySelector('.ac')
const c_btn = document.querySelector('.c')
const num_btn = document.querySelectorAll('.num')
const op_btn = document.querySelectorAll('.op')
const eq_btn = document.querySelector('.eq')
const prev_val = document.querySelector('.prev-val')
const current_val = document.querySelector('.current-val')

const calc = new Calc(prev_val, current_val)

 num_btn.forEach(button => {
    button.addEventListener('click', () => {
      calc.appendNumber(button.innerText)
      calc.updateDisplay()
    })
  })
  
  op_btn.forEach(button => {
    button.addEventListener('click', () => {
      calc.chooseOperation(button.innerText)
      calc.updateDisplay()
    })
  })
  
  eq_btn.addEventListener('click', button => {
    calc.compute()
    calc.updateDisplay()
  })
  
  ac_btn.addEventListener('click', button => {
    calc.clear()
    calc.updateDisplay()
  })
  
  c_btn.addEventListener('click', button => {
    calc.delete()
    calc.updateDisplay()
  })