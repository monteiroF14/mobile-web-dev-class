const numerosOnMain = document.querySelector(".numeros");
const estrelasOnMain = document.querySelector(".estrelas");
const generateBtn = document.querySelector("button");

const gerarNumeros = (qnt, maxValue) => {
    const numerosGerados = new Set();

    while (numerosGerados.size < qnt) {
        const randomNumber = Math.floor(Math.random() * maxValue);

        numerosGerados.add(randomNumber);
    }

    return [...numerosGerados];
};

const displayOnMain = (numeros, estrelas) => {
    const createNumberParagraphs = (numbers) => {
        return numbers.map((num) => {
            const p = document.createElement("p");
            p.textContent = num;
            return p;
        });
    };

    const numParagraphs = createNumberParagraphs(numeros);
    const estParagraphs = createNumberParagraphs(estrelas);

    numerosOnMain.innerHTML = "";
    estrelasOnMain.innerHTML = "";

    numerosOnMain.append(...numParagraphs);
    estrelasOnMain.append(...estParagraphs);
};

const getUserData = () => {
    const userData = window.location.search;

    if (userData.length > 0) {
        const urlParameters = new URLSearchParams(userData);
        const name = urlParameters.get("name");
        const email = urlParameters.get("email");
        const phone = urlParameters.get("phone");
        const nif = urlParameters.get("nif");
        const address = urlParameters.get("address");
        const observations = urlParameters.get("observations");
        
        document.querySelector('.helloUser')?.innerHTML = `Bem vindo ${name}`

        return true
    } else {
        return false
    }
};

window.addEventListener("load", () => {
    if(getUserData()){
        document.querySelector('header > a')?.innerHTML = "Sair"
    }

    displayOnMain(gerarNumeros(5, 50), gerarNumeros(2, 12));
});

generateBtn.addEventListener("click", () => {
    displayOnMain(gerarNumeros(5, 50), gerarNumeros(2, 12));
});
