function appendValue(value) {
  const display = document.getElementById("display");

  if (display.value === 'Error') {
    display.value = '';
    display.classList.remove('error');
  }

  const current = display.value;
  const lastChar = current.slice(-1);
  const secondLastChar = current.slice(-2, -1);
  const operators = ['+', '-', '*', '/', '%'];

  if (!/[\d.+\-*/%]/.test(value)) return;

  if (
    operators.includes(secondLastChar) &&
    operators.includes(lastChar) &&
    operators.includes(value)
  ) return;

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
  const display = document.getElementById("display");
  display.value = '';
  display.classList.remove('error');
}

function backspace() {
  const display = document.getElementById("display");
  if (display.value === 'Error') {
    display.value = '';
    display.classList.remove('error');
    return;
  }
  display.value = display.value.slice(0, -1);
}

function squareRoot() {
  const display = document.getElementById("display");
  try {
    const value = parseFloat(display.value);
    if (!isNaN(value)) {
      const result = Math.sqrt(value);
      if (!isNaN(result)) {
        display.value = result;
      } else {
        showError();
      }
    } else {
      showError();
    }
  } catch {
    showError();
  }
}

function calculate() {
  const display = document.getElementById("display");
  const expression = display.value.replace(/%/g, "/100");

  try {
    const result = eval(expression);
    if (!isNaN(result)) {
      display.value = result;
    } else {
      showError();
    }
  } catch {
    showError();
  }
}

function showError() {
  const display = document.getElementById("display");
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