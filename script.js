document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');
    let currentExpression = "";

   
    function calculate() {
        try {
           
            let expressionToEvaluate = currentExpression.replace(/%/g, '/100');
            
            let result = eval(expressionToEvaluate);
            
            if (!isFinite(result)) {
                display.value = 'Error';
                currentExpression = '';
            } else {
                currentExpression = result.toString();
                display.value = currentExpression;
            }
        } catch {
            display.value = 'Error';
            currentExpression = '';
        }
    }

  
    function updateDisplay(value) {
       
        if (display.value === 'Error') {
            currentExpression = '';
        }
        currentExpression += value;
        display.value = currentExpression;
    }


    function clearDisplay() {
        currentExpression = "";
        display.value = currentExpression;
    }

  
    function deleteLastChar() {
        currentExpression = currentExpression.slice(0, -1);
        display.value = currentExpression;
    }

    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const value = e.target.innerHTML;

            if (value === '=') {
                calculate();
            } else if (value === 'AC') {
                clearDisplay();
            } else if (value === 'DEL') {
                deleteLastChar();
            } else {
                updateDisplay(value);
            }
        });
    });

   
    document.addEventListener('keydown', (e) => {
        const key = e.key;

        if (/[0-9+\-*/.%]/.test(key)) {
            e.preventDefault(); 
            updateDisplay(key);
        } else if (key === 'Enter' || key === '=') {
            e.preventDefault();
            calculate();
        } else if (key === 'Backspace') {
            e.preventDefault();
            deleteLastChar();
        } else if (key === 'Escape') {
            e.preventDefault();
            clearDisplay();
        }
    });
});
