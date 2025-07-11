const display = document.getElementById("display");

function appendValue(value) {
  if (display.value === 'Error') {
    display.value = '';
    display.classList.remove('error');
  }

  const current = display.value;
  const lastChar = current.slice(-1);
  const secondLastChar = current.slice(-2, -1);
  const operators = ['+', '-', '*', '/', '%'];

  // Block invalid characters
  if (!/[\d.+\-*/%]/.test(value)) return;

  // Prevent multiple decimals in the same number
  if (value === '.') {
    const parts = current.split(/[\+\-\*\/%]/);
    const lastPart = parts[parts.length - 1];
    if (lastPart.includes('.')) {
      showError();
      return;
    }
  }

  // Prevent triple operators
  if (
    operators.includes(secondLastChar) &&
    operators.includes(lastChar) &&
    operators.includes(value)
  ) return;

  // Handle double operator entry
  if (operators.includes(lastChar) && operators.includes(value)) {
    if (
      (lastChar === '*' || lastChar === '/' || lastChar === '%' || lastChar === '+' || lastChar === '-') &&
      (value === '+' || value === '-')
    ) {
      display.value += value;
      return;
    } else {
      display.value = current.slice(0, -1) + value;
      return;
    }
  }

  display.value += value;
}

function clearDisplay() {
  display.value = '';
  display.classList.remove('error');
}

function backspace() {
  if (display.value === 'Error') {
    display.value = '';
    display.classList.remove('error');
    return;
  }
  display.value = display.value.slice(0, -1);
}

function squareRoot() {
  try {
    const value = parseFloat(display.value);
    if (!isNaN(value)) {
      const result = Math.sqrt(value);
      display.value = parseFloat(result.toFixed(10)).toString();
    } else {
      showError();
    }
  } catch {
    showError();
  }
}

function calculate() {
  const expression = evalPercent(display.value);
  try {
    let result = eval(expression);
    if (!isNaN(result)) {
      result = parseFloat(result.toFixed(10)).toString(); // Fix floating-point error
      display.value = result;
    } else {
      showError();
    }
  } catch {
    showError();
  }
}

// Convert 90% → (90/100), but leave 7%2 as is
function evalPercent(expr) {
  return expr.replace(/(\d+(\.\d+)?)%(?!\d)/g, (_, num) => `(${num}/100)`);
}

function showError() {
  display.value = 'Error';
  display.classList.add('error');
  setTimeout(() => {
    display.classList.remove('error');
    display.value = '';
  }, 1500);
}

function toggleTheme() {
  document.body.classList.toggle('dark');
}
