// Functions for DataMuse

const rawResponse = (res) => {
    let trimmedResponse = res.slice(0, 10);
    
    responseField.innerHTML = `<text>${JSON.stringify(trimmedResponse)}</text>`;
}

const betterResponse = (res) => {
    
    let wordList = [];
    let rawJson = res.slice(0, 10);
    console.log(rawJson);
    for (let i = 0; i < rawJson.length; i++) {
        wordList.push(`<li>${rawJson[i].word}</li>`);
    }
    console.log(wordList);
    wordList = wordList.join('');
    console.log(wordList);

    responseField.innerHTML = `<p>Here are some words</p><ol>${wordList}</ol >`;
}

// Functions for finance API

const financeFormattedResponse = (res) => {
    let counter = 0;
    let quoteOpen = 1;
    let formattedJson = [];
    let stringifiedJson = JSON.stringify(res);
    let splittedJson = stringifiedJson.split("");
    for (let index in splittedJson) {
        char = splittedJson[index];
        switch (char) {
            case '{':
                counter++;
                formattedJson.push(char + '\n' + ' '.repeat(2*counter));
                break;
            case '}':
                counter--;
                formattedJson.push('\n' + ' '.repeat(2*counter) + char);
                break;
            case '"':
                if (quoteOpen % 2) {
                    quoteOpen++;
                    formattedJson.push(char);
                } else {
                    quoteOpen--;
                    formattedJson.push(char);
                }
                break;
            case ',':
                if (quoteOpen % 2) {
                    formattedJson.push(char + '\n' + ' '.repeat(2*counter));
                } else {
                    formattedJson.push(char);
                }
                break;
            case ':':
                if (splittedJson[index - 1] === '"') {
                    formattedJson.push(' ' + char + ' ');
                } else {
                    formattedJson.push(char);
                }
                break;
            default: 
                formattedJson.push(char);
        }
    }
    formattedJson = formattedJson.join("");
    responseField.innerHTML = `<pre>${formattedJson}</pre>`;
}

const financeRawResponse = (res) => {
    let price = res.profile.price;
    let companyName = res.profile.companyName;
    let phrase = `The price of ${companyName}'s stocks is $${price}.`;
    responseField.innerHTML = `<text>${JSON.stringify(res)}</text>`;
}

const financeIndividualElements = (res) => {
    // Get elements
    let image = res.profile.image;
    let companyName = res.profile.companyName;
    let symb = res.symbol;
    let changesPerc = res.profile.changesPercentage;
    changesPerc = Number(changesPerc.slice(1, (changesPerc.length - 2)));
    let price = res.profile.price;
    let description = res.profile.description;
    let ceo = res.profile.ceo;
    let website = res.profile.website;
    let industry = res.profile.industry;
    let sector = res.profile.sector;
    let exchange = res.profile.exchange;

    // Get DOM elements
    let imageEl = document.getElementById('companyLogo');
    let companyNameEl = document.getElementById('companyName');
    let symbEl = document.getElementById('symbol');
    let changesPercEl = document.getElementById('changesPerc');
    let priceEl = document.getElementById('price');
    let descriptionEl = document.getElementById('description').children[1];
    let ceoEl = document.getElementById('ceo').children[1];
    let websiteEl = document.getElementById('website').children[1].firstChild;
    let industryEl = document.getElementById('industry').children[1];
    let sectorEl = document.getElementById('sector').children[1];

    // Update Elements
    imageEl.src = image;
    companyNameEl.innerHTML = companyName;
    symbEl.innerHTML = symb;
    changesPercEl.innerHTML = plusSign(changesPerc);
    changesPercEl.style.color = colorPerc(changesPerc);
    priceEl.innerHTML = price;
    descriptionEl.innerHTML = description;
    ceoEl.innerHTML = ceo;
    websiteEl.setAttribute('href', website);
    websiteEl.innerHTML = website;
    industryEl.innerHTML = industry;
    sectorEl.innerHTML = sector;
}

const colorPerc = (number) => {
    if (number >= 0) {
        return 'darkgreen';
    } else {
        return 'red';
    }
}

const plusSign = (number) => {
    if (number > 0) {
        return `+${number}`;
    } else {
        return number;
    }
}