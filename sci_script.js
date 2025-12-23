const display = document.getElementById("display");
let pendingOperation = null;
let shouldResetDisplay = false;

/* ===== BASIC INPUT ===== */
function append(value) {
    if (shouldResetDisplay) {
        display.value = "";
        shouldResetDisplay = false;
    }
    
    // Prevent multiple dots in current number
    if (value === ".") {
        let parts = display.value.split(/[\+\-\*\/]/);
        let lastPart = parts[parts.length - 1];
        if (lastPart.includes(".")) return;
    }
    display.value += value;
}

function clearDisplay() {
    display.value = "";
    pendingOperation = null;
    shouldResetDisplay = false;
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

/* ===== SCIENTIFIC FUNCTIONS (APPEND & SET) ===== */
function setScientific(op) {
    let currentValue = parseFloat(display.value) || 0;
    let result;
    
    switch (op) {
        case "sin":
            result = Math.sin(toRadians(currentValue));
            break;
        case "cos":
            result = Math.cos(toRadians(currentValue));
            break;
        case "tan":
            result = Math.tan(toRadians(currentValue));
            break;
        case "log":
            result = Math.log10(currentValue);
            break;
        case "sqrt":
            result = Math.sqrt(currentValue);
            break;
        case "square":
            result = Math.pow(currentValue, 2);
            break;
        case "pi":
            display.value += Math.PI.toFixed(6);
            return;
    }
    
    display.value = result.toString();
    shouldResetDisplay = true;
}

/* ===== π BUTTON ===== */
function appendPi() {
    append(Math.PI.toFixed(8));
}

/* ===== DEG → RADIAN CONVERSION ===== */
function toRadians(deg) {
    return deg * (Math.PI / 180);
}

/* ===== ARITHMETIC OPERATIONS ===== */
function setOperation(op) {
    if (shouldResetDisplay) {
        shouldResetDisplay = false;
        return;
    }
    
    if (pendingOperation !== null && display.value) {
        calculate();
    }
    
    pendingOperation = op;
    shouldResetDisplay = true;
}

function calculate() {
    try {
        if (!display.value) return;
                let expression = display.value
            .replace(/sin/g, 'sin')
            .replace(/cos/g, 'cos')
            .replace(/tan/g, 'tan')
            .replace(/log/g, 'log10')
            .replace(/sqrt/g, 'sqrt')
            .replace(/π|pi/g, Math.PI);
        
        let result = Function('"use strict"; return (' + expression + ')')();
        
        if (isNaN(result) || !isFinite(result)) {
            throw new Error("Invalid");
        }
        
        display.value = parseFloat(result.toFixed(10)).toString();
        pendingOperation = null;
        shouldResetDisplay = true;
        
    } catch (error) {
        display.value = "Error";
        pendingOperation = null;
        shouldResetDisplay = true;
    }
}
function startStrings() {
    window.location.href = "string_op.html";
}
