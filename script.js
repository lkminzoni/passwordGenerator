const resultEl = document.querySelector('#result');
const lengthEl = document.querySelector('#length');
const upperCaseEl = document.querySelector('#uppercase');
const lowerCaseEl = document.querySelector('#lowercase');
const numbersEl = document.querySelector('#numbers');
const symbolsEl = document.querySelector('#symbols');
const generateEl = document.querySelector('#generate');
const clipboardEl = document.querySelector('#clipboard');
const randomFunc = {
    lower:getRandomLower,
    upper:getRandomUpper,
    number:getRandomNumber,
    symbol:getRandomSymbols
}

clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password){return}

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove()
    alert('Password is copied to clipboard!')
})

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value
    const hasLower = lowerCaseEl.checked
    const hasUpper = upperCaseEl.checked
    const hasNumber = numbersEl.checked
    const hasSymbols = symbolsEl.checked

    resultEl.innerText = generatePassword(hasLower,hasNumber,hasUpper,hasSymbols,length)
})

function generatePassword(lower,number,upper,symbol,length){
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{lower},{upper},{number},{symbol}].filter(item => Object.values(item)[0]);

    if(typesCount === 0){
        return ''
    }

    for(let i = 0; i < length; i += typesCount){
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]()
            
        })
    }

    const finalPassword = generatedPassword.slice(0,length)

    return finalPassword


}

function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbols(){
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)];
}
