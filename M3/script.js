let currencyFrom = document.querySelector('.currencyFrom');
let currencyTo = document.querySelector('.currencyTo');
document.addEventListener("DOMContentLoaded", function () {
    let defaultCurrency = document.querySelector(".currency .selected");
    let handleCurrencyClick = (event) => {
        document.querySelectorAll(".currency button").forEach((button) => {
            button.classList.remove("selected");
        });
        event.target.classList.add("selected");
    };
    document.querySelectorAll(".currency button").forEach((button) => {
        button.addEventListener("click", handleCurrencyClick);
    });
    defaultCurrency.click();
});

document.addEventListener("DOMContentLoaded", function () {
    let defaultCurrencyButton = document.querySelector(".currency2 button:nth-child(2)");
    defaultCurrencyButton.classList.add("selected");

    // Valyuta düymələrinə klik hadisəsi əlavə edirik
    let currencyButtons = document.querySelectorAll(".currency2 button");

    currencyButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            // Seçilmiş düymənin üstündəki effekti silirik
            defaultCurrencyButton.classList.remove("selected");

            // Yeni seçilmiş düymənin üstündə seçilmiş effekti əlavə edirik
            button.classList.add("selected");

            // Yeni seçilmiş düyməni əsas düymə kimi təyin edirik
            defaultCurrencyButton = button;
        });
    });
});

let from = 'RUB'
let to = 'USD'
const apiKey = '4766e7989eab647f05dbfaa00850d3af'
let amount1 = document.querySelector('.amount1')
let amount2 = document.querySelector('.amount2')
async function Convert(type) {

    let apiUrl
    if(type == "amount1"){
        amount = +amount1.value
        apiUrl = `http://api.exchangerate.host/convert?access_key=${apiKey}&from=${from}&to=${to}&amount=${amount}`
    }
    else if(type == "amount2"){
        amount = +amount1.value
        apiUrl = `http://api.exchangerate.host/convert?access_key=${apiKey}&from=${to}&to=${from}&amount=${amount}`
    }
    let response = await fetch(apiUrl);
    let data = await response.json();
    if(type == "amount1"){
        amount2.value = data.result
    }
    else if(type == "amount2"){
        amount1.value = data.result
    }
    console.log(data.result)
    console.log(data)
    
    let apiUrl2 = `http://api.exchangerate.host/convert?access_key=${apiKey}&from=${from}&to=${to}&amount=1`
    const response2 = await fetch(apiUrl2);
    const data2 = await response2.json();
    currencyFrom.innerText = "1 "+from+" = "+data2.result+" "+to;

    let apiUrl3 = `http://api.exchangerate.host/convert?access_key=${apiKey}&from=${to}&to=${from}&amount=1`
    const response3 = await fetch(apiUrl3);
    const data3 = await response3.json();
    currencyTo.innerText = "1 "+to+" = "+data3.result+" "+from;
}

amount1.addEventListener('input', () => {
    Convert("amount1")
})
amount2.addEventListener('input', () => {
    Convert("amount2")
})
function fromButton(e) {
    from = e.target.id
    console.log(from)
    Convert("amount1")
}
function toButton(e) {
    to = e.target.id
    console.log(to)
    Convert("amount1")

}
let buttons = document.querySelectorAll('button')
buttons.forEach(btn => {
    if ((btn.classList == 'from')||(btn.classList == 'from selected')) {
        btn.addEventListener('click', fromButton)
    }
    else {
        btn.addEventListener('click',toButton)
}
})
