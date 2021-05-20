/* Selecting DOM elements */
const display1 = document.querySelector('.pantalla__1');
const display2 = document.querySelector('.pantalla__2');

const eraseAll = document.querySelector('.borrar_todo');
const erase = document.querySelector('.borrar');
const back = document.querySelector('.retroceso');

const numbers = document.querySelectorAll('.numero');
const operators = document.querySelectorAll('.operador');

const squareRoot = document.querySelector('.raiz')
const percent = document.querySelector('.porcentaje')
const reverse = document.querySelector('.inverso')
const opposite = document.querySelector('.opuesto')

const equal = document.querySelector('.igual')

// variables for display and operations
let display1JS = '',
    display2JS = '',
    dot = false,
    lastOp = '',
    result = null;

// numbers and dot on the calculator display
numbers.forEach((number) => {
    number.addEventListener('click', (e) => {
        if(e.target.innerText === '.' && !dot) {
            dot = true;
        } else if (e.target.innerText === '.' && dot) {
            return;
        }

        // avoid more than 14 characters on the screen.
        if(display2JS.length < 14) {
            display2JS += e.target.innerText;
            display2.innerText = display2JS;
        }
        e.preventDefault();   
    }); 
});

operators.forEach(operator => {
    operator.addEventListener('click', (e) => {
        if(!display2JS) return;
        dot = false;

        let typeOperation = e.target.innerText;

        if(display1JS && display2JS && lastOp) {
            mathOp();
        } else {
            result = parseFloat(display2JS)
        }
        clearDisplays(typeOperation);
        console.log(result);
    });
});

// operaciones matemáticas - math operations
function mathOp() {
    CALCULATIONS = {
        '/': result = parseFloat(result) / parseFloat(display2JS),
        '*': result = parseFloat(result) * parseFloat(display2JS),
        '-': result = parseFloat(result) - parseFloat(display2JS),
        '+': result = parseFloat(result) + parseFloat(display2JS)
    }
    CALCULATIONS[lastOp];
};

// mostramos y borramos números en pantalla - displays and deletes numbers on the screen
const clearDisplays = (nam = '') => {
    display1JS += display2JS+ ' ' + nam + ' ';
    display1.innerText = display1JS;
    display2.innerText = display2JS;
    display2JS = '';
}

// boton igual - equal button








