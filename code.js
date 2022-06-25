document.addEventListener(("DOMContentLoaded"), () => {
    let firstOperand,
        secondOperand = '',
        operator = '',
        finish = false;

    const digits = [`0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, '.'],
        operators = [`+`, `-`, `/`, '*'];

    const culcWrapper = document.querySelector('.culc-wrapper'),
        out = document.querySelector('.out')
    firstOperand = out.textContent


    function changeSizeAndCheck() {
        switch (out.textContent.length) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                out.style.fontSize = 96 + 'px'
                break;
            case 6:
            case 7:
                out.style.fontSize = 80 + 'px'
                break;
            case 8:
                out.style.fontSize = 72 + 'px'
                break;
            case 9:
                out.style.fontSize = 66 + 'px'
                break;
            case 10: out.style.fontSize = 60 + 'px'
                break;
            case 11:
                out.style.fontSize = 54 + 'px'
                break;
            case 12: out.style.fontSize = 48 + 'px'
                break;

        }
        stop()

    }


    function stop() {
        if (out.textContent.length > 12) {
            out.textContent = out.textContent.slice(0, 12)
            firstOperand = +out.textContent
        }

        if ((secondOperand + '').length > 12) {
            secondOperand = +out.textContent
        }

    }


    culcWrapper.addEventListener('click', (e) => {
        let key = e.target.textContent


        if (e.target.classList.contains('cBtn')) {
            firstOperand = '',
                secondOperand = '',
                operator = '',
                finish = false
            out.textContent = 0

        }


        if (e.target.classList.contains('bSpaceBtn')) {
            if (out.textContent.length - 1 > 0) {
                out.textContent = out.textContent.slice(0, out.textContent.length - 1)
            } else {
                out.textContent = '0'
            }

            if (out.textContent[out.textContent.length - 1] === '.') {
                out.textContent = out.textContent.slice(0, out.textContent.length - 1)
            }

            if (firstOperand !== '') {
                firstOperand = out.textContent
            } else if (secondOperand !== '') {
                secondOperand = out.textContent
            }


        }


        if (digits.includes(key)) {
            if (firstOperand === 0 && secondOperand === 0 && operator !== '') {
                operator = ''
                firstOperand = ''
                secondOperand = ''
                finish = false
            }

            if (secondOperand === '' && operator === '') {
                firstOperand += key
                out.textContent = firstOperand
            } else if (firstOperand !== '' && secondOperand !== '' && finish) {
                secondOperand += key
                out.textContent = secondOperand
                finish = false
            } else {
                secondOperand += key
                out.textContent = secondOperand
            }
            changeSizeAndCheck()
            console.log(firstOperand, operator, secondOperand)
        }


        if (operators.includes(key)) {
            secondOperand = ''
            operator = key
            out.textContent = operator
        }


        if (key === '=') {
            if (secondOperand === '') secondOperand = firstOperand
            switch (operator) {
                case '+':
                    firstOperand = +firstOperand + +secondOperand
                    break;
                case '-':
                    firstOperand = +firstOperand - +secondOperand
                    break;
                case '*':
                    firstOperand = +firstOperand * +secondOperand
                    break;
                case '/':
                    if (secondOperand === `0`) { 
                        firstOperand = "Помилка" 
                    } else{
                        firstOperand = +firstOperand / +secondOperand
                    break;
                    }
            }
            if (firstOperand === 0) secondOperand = 0

            out.textContent = firstOperand
            finish = true
            changeSizeAndCheck()
            console.log(firstOperand, operator, secondOperand)
        }
    })

})