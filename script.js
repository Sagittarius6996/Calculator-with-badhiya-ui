document.addEventListener('keydown', function(e) {
    const display = document.getElementById('display');
    // Allow numbers, operators, decimal, and percent
    if (/[0-9+\-*/.%]/.test(e.key)) {
        display.value += e.key;
    }
    // Handle Backspace (delete last character)
    if (e.key === 'Backspace') {
        display.value = display.value.slice(0, -1);
    }
    // Handle Enter (evaluate expression, handle %)
    if (e.key === 'Enter') {
        try {
            let expression = display.value.replace(/%/g, '/100');
            display.value = eval(expression);
        } catch {
            display.value = 'Error';
        }
    }
    // Handle Escape (clear display)
    if (e.key === 'Escape') {
        display.value = '';
    }
});

let string = "";
let buttons = document.querySelectorAll('.button');
const display = document.getElementById('display');

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        let value = e.target.innerHTML;
        if (value == '=') {
            try {
                let expression = string.replace(/%/g, '/100');
                string = eval(expression).toString();
                display.value = string;
            } catch {
                display.value = 'Error';
                string = '';
            }
        } else if (value == 'AC') {
            string = "";
            display.value = string;
        } else if (value == 'DEL') {
            string = string.slice(0, -1);
            display.value = string;
        } else {
            string += value;
            display.value = string;
        }
    });
});