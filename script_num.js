const numInput = document.getElementById("numberInput");
const numBtn = document.getElementById("numConvertButton");
const wordsInput = document.getElementById("wordsInput");
const wordsBtn = document.getElementById("wordConvertButton");

const numResult = document.getElementById("numResult");
const wordsResult = document.getElementById("wordsResult");

function numberToWords(num) {
    if (num === 0) return "zero";
    const ones = [
        "", "One", "Two", "Three", "Four", "Five",
        "Six", "Seven", "Eight", "Nine", "Ten",
        "Eleven", "Twelve", "Thirteen", "Fourteen",
        "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"
    ];
    const tens = [
        "", "", "Twenty", "Thirty", "Forty",
        "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
    ];
    function twoDigits(n) {
        if (n < 20) return ones[n];
        return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + ones[n % 10] : "");
    }
    function threeDigits(n) {
        let result = "";
        if (n >= 100) {
            result += ones[Math.floor(n / 100)] + " hundred ";
            n %= 100;
        }
        if (n > 0) result += twoDigits(n);
        return result.trim();
    }
    let result = "";
    if (num >= 10000000) {
    result += threeDigits(Math.floor(num / 10000000)) + " crore ";
    num %= 10000000;
    }
    if (num >= 1000000) {
    result += threeDigits(Math.floor(num / 1000000)) + " million ";
    num %= 1000000;
    }
    if (num >= 100000) {
        result += twoDigits(Math.floor(num / 100000)) + " lakh ";
        num %= 100000;
    }
    if (num >= 1000) {
        result += twoDigits(Math.floor(num / 1000)) + " thousand ";
        num %= 1000;
    }
    if (num > 0) {
        result += threeDigits(num);
    }
    return result.trim();
}
function wordsToNumber(words) {
    const wordMap = {
        zero: 0, one: 1, two: 2, three: 3, four: 4,
        five: 5, six: 6, seven: 7, eight: 8, nine: 9,
        ten: 10, eleven: 11, twelve: 12, thirteen: 13,
        fourteen: 14, fifteen: 15, sixteen: 16,
        seventeen: 17, eighteen: 18, nineteen: 19,
        twenty: 20, thirty: 30, forty: 40, fifty: 50,
        sixty: 60, seventy: 70, eighty: 80, ninety: 90
    };
    let total = 0;
    let current = 0;
    const tokens = words.toLowerCase().split(/\s+/);
    for (let word of tokens) {
        if (word === "lakh") {
            total += current * 100000;
            current = 0;
        }
        else if (word === "million") {
            total += current * 1000000;
            current = 0;
        }
        else if (word === "crore") {
            total += current * 10000000;
            current = 0;
        }
        else if (word === "thousand") {
            total += current * 1000;
            current = 0;
        } else if (word === "hundred") {
            current *= 100;
        } else if (wordMap[word] !== undefined) {
            current += wordMap[word];
        } else {
            return "Invalid input";
        }
    }
    return total + current;
}
numBtn.addEventListener("click", () => {
    const numValue = parseInt(numInput.value);
    if (isNaN(numValue)) {
        numResult.textContent = "Please enter a valid number";
        return;
    }
    numResult.textContent = numberToWords(numValue);
});

wordsBtn.addEventListener("click", () => {
    const words = wordsInput.value.trim();
    if (words === "") {
        wordsResult.textContent = "Please enter valid words";
        return;
    }
    wordsResult.textContent = wordsToNumber(words);
});
