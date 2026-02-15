// ====== SELECT ELEMENTS ======
const screen = document.getElementById("screen");
const buttons = document.querySelectorAll(".btn");
const clearBtn = document.getElementById("clear");
const deleteBtn = document.getElementById("delete");
const equalsBtn = document.getElementById("equals");

// ====== BUTTON CLICK HANDLER ======
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");
        if (value) appendValue(value);
    });
});

// ====== APPEND VALUE TO SCREEN ======
function appendValue(value) {
    screen.value += value;
}

// ====== CLEAR SCREEN ======
clearBtn.addEventListener("click", () => {
    screen.value = "";
});

// ====== DELETE LAST CHARACTER ======
deleteBtn.addEventListener("click", () => {
    screen.value = screen.value.slice(0, -1);
});

// ====== CALCULATE RESULT ======
equalsBtn.addEventListener("click", calculate);

function calculate() {
    try {
        let expression = screen.value;

        // Replace constants and functions
        expression = expression.replace(/PI/g, Math.PI);
        expression = expression.replace(/sin\(/g, "Math.sin(");
        expression = expression.replace(/cos\(/g, "Math.cos(");
        expression = expression.replace(/tan\(/g, "Math.tan(");
        expression = expression.replace(/log\(/g, "Math.log10(");
        expression = expression.replace(/ln\(/g, "Math.log(");
        expression = expression.replace(/sqrt\(/g, "Math.sqrt(");
        expression = expression.replace(/\^2/g, "**2");
        expression = expression.replace(/\^/g, "**");

        // Evaluate expression safely
        let result = eval(expression);

        if (!isFinite(result)) throw Error("Invalid");

        screen.value = result;

        // Result animation
        screen.style.transition = "0.3s";
        screen.style.transform = "scale(1.05)";
        setTimeout(() => {
            screen.style.transform = "scale(1)";
        }, 200);

    } catch {
        screen.value = "Error";
    }
}

// ====== KEYBOARD SUPPORT ======
document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (!isNaN(key) || "+-*/().".includes(key)) {
        appendValue(key);
    }

    if (key === "Enter") {
        calculate();
    }

    if (key === "Backspace") {
        screen.value = screen.value.slice(0, -1);
    }

    if (key === "Escape") {
        screen.value = "";
    }
});
