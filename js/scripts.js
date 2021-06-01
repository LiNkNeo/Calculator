/* Selecting DOM elements */
const display1 = document.querySelector(".pantalla__1");
const display2 = document.querySelector(".pantalla__2");

const eraseAll = document.querySelector(".borrar_todo");
const erase = document.querySelector(".borrar");
const back = document.querySelector(".retroceso");

const numbers = document.querySelectorAll(".numero");
const operators = document.querySelectorAll(".operador");

const squareRoot = document.querySelector(".raiz");
const percent = document.querySelector(".porcentaje");
const reverse = document.querySelector(".inverso");
const opposite = document.querySelector(".opuesto");

const equal = document.querySelector(".igual");

// variables for display and operations
let display1JS = "",
  display2JS = "",
  dot = false,
  lastOp = "",
  result = null;

// numbers and dot on the calculator display
numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !dot) {
      dot = true;
    } else if (e.target.innerText === "." && dot) {
      return;
    }

    // avoid more than 14 characters on the screen.
    if (display2JS.length < 15) {
      display2JS += e.target.innerText;
      display2.innerText = display2JS;
    }
    e.preventDefault();
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    if (!display2JS) return;
    dot = false;

    let typeOperation = e.target.innerText;

    if (display1JS && display2JS && lastOp) {
      mathOp();
    } else {
      result = parseFloat(display2JS);
    }
    clearDisplays(typeOperation);
    lastOp = typeOperation;
  });
});

// operaciones matemáticas - math operations
const mathOp = () => {
  switch (lastOp) {
    case "+":
      result = parseFloat(result) + parseFloat(display2JS);

      break;

    case "-":
      result = parseFloat(result) - parseFloat(display2JS);
      break;

    case "/":
      result = parseFloat(result) / parseFloat(display2JS);
      break;

    case "*":
      result = parseFloat(result) * parseFloat(display2JS);
      break;

    default:
      break;
  }
};

// mostramos y borramos números en pantalla - displays and deletes numbers on the screen
const clearDisplays = (nam = "") => {
  display1JS += display2JS + " " + nam + " ";
  display1.innerText = display1JS;
  display2.innerText = result;
  display2JS = "";
};

// boton igual - equal button
equal.addEventListener("click", () => {
  if (!display1JS || !display2JS) return;
  dot = false;
  mathOp();
  clearDisplays();
  display2.innerText = result;

  display2JS = result;
  display1JS = "";
});

// button square root
squareRoot.addEventListener("click", () => {
  if (!display2JS) return;
  display2JS = Math.sqrt(display2JS);
  if (isNaN(display2JS) === true) {
    display2.innerText = "Entrada no válida";
    display1.innerText = "√";
  } else {
    display2.innerText = display2JS;
    display1.innerText = "√";
  }
});

// buton percent
percent.addEventListener("click", () => {
  if (!display2JS) return;
  display2JS = display2JS / 100;
  display2.innerText = display2JS;
  display1.innerText = "%";
});

// button opposite
opposite.addEventListener("click", () => {
  if (!display2JS) return;
  opp = display2JS;
  opp = -opp;
  display2JS = opp;
  display2.innerText = display2JS;
});

// button inverse
reverse.addEventListener("click", () => {
  if (!display2JS) return;
  display2JS = 1 / display2JS;
  display2.innerText = display2JS;
});

// button back
back.addEventListener("click", backFunction);

// button erase
erase.addEventListener("click", () => {
  display2.innerText = "";
  display2JS = "";
  if (dot === true) dot = false;
});

// button erase all
eraseAll.addEventListener("click", () => {
  display1.innerText = "";
  display2.innerText = "";
  display1JS = "";
  display2JS = "";
  if (dot === true) dot = false;
});

// function button back
function backFunction() {
  chaDisplay = display2JS.length;
  lastCha = display2JS.substring(chaDisplay - 1, chaDisplay);
  display2JS = display2JS.substring(0, chaDisplay - 1);
  if (lastCha === ".") dot = false;
  if (display2JS === "") display2JS = "";
  display2.innerText = display2JS;
}

// keyboard events(numbers and dot)
window.addEventListener("keydown", (e) => {
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "."
  ) {
    pressButton(e.key);
  } else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    keyBoardOpKeys(e.key);
  } else if (e.key === "Enter" || e.key === "=") {
    equal.click();
  } else if (e.keyCode === 8) {
    back.click();
  } else if (e.keyCode === 46) {
    eraseAll.click();
  }
});

// function for keyboard events(numbers and dot)
function pressButton(proper) {
  numbers.forEach((number) => {
    if (number.innerText === proper) {
      number.click();
    }
  });
}

// function for keyboard events(operators)
function keyBoardOpKeys(proper) {
  operators.forEach((operator) => {
    if (operator.innerText === proper) {
      operator.click();
    }
  });
}
