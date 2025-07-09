function appendValue(value) {
  document.getElementById("display").value += value;
}

function clearDisplay() {
  document.getElementById("display").value = '';
}

function backspace() {
  const display = document.getElementById("display");
  display.value = display.value.slice(0, -1);
}

function squareRoot() {
  try {
    const value = parseFloat(document.getElementById("display").value);
    if (!isNaN(value)) {
      document.getElementById("display").value = Math.sqrt(value);
    } else {
      alert("Enter a valid number first!");
    }
  } catch (e) {
    alert("Error calculating square root");
  }
}

function calculate() {
  try {
    const expression = document.getElementById("display").value.replace(/%/g, "/100");
    const result = eval(expression);
    document.getElementById("display").value = result;
  } catch (e) {
    alert("Invalid input!");
  }
}