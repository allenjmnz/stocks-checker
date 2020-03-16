// Information to reach API
const url = 'https://financialmodelingprep.com/api/v3/company/profile/';

// Selecting page elements
const inputField = document.getElementById("input");
const submit = document.getElementById("submit");
const submitB = document.getElementById("submit2");
const responseField = document.getElementById("response");

// AJAX function for Stock Profiles
const getStocks = () => {
    const wordQuery = inputField.value;
    const xhr = new XMLHttpRequest();
    const endpoint = /* 'https://cors-anywhere.herokuapp.com/' +  */url + wordQuery;

    xhr.responseType = 'json';
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            financeIndividualElements(xhr.response);
        }
    }

    xhr.open('GET', endpoint);
    console.log(xhr);
    xhr.send();
}

const displayStocks = (event) => {
    event.preventDefault();
    getStocks();
}

if (submit) {
    submit.addEventListener('click', displayStocks);
}


