const s1 = document.getElementById("string1");
const s2 = document.getElementById("string2");
const result = document.getElementById("result");

function stringLength() {
    result.textContent = "Length: " + s1.value.length;
}

function reverseString() {
    result.textContent = s1.value.split("").reverse().join("");
}

function toUpper() {
    result.textContent = s1.value.toUpperCase();
}

function toLower() {
    result.textContent = s1.value.toLowerCase();
}

function checkPalindrome() {
    const str = s1.value.replace(/\s+/g, "").toLowerCase();
    const rev = str.split("").reverse().join("");
    result.textContent = (str === rev) ? "Yes!! Palindrome " : "No, Not a Palindrome ";
}

function countVowels() {
    const matches = s1.value.match(/[aeiou]/gi);
    result.textContent = "Vowels: " + (matches ? matches.length : 0);
}

function appendStrings() {
    result.textContent = s1.value + s2.value;
}

function goBack() {
    window.location.href = "scientific.html"; 
}
