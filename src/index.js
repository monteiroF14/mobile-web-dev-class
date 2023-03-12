import { getUserFromDB } from "./getUserFromDB.js";

const numerosOnMain = document.querySelector(".numeros");
const estrelasOnMain = document.querySelector(".estrelas");
const generateBtn = document.querySelector("button");
const createAccount = document.querySelector("header > a");
const userGreeting = document.querySelector(".helloUser");

export const indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;

const gerarNumeros = (qnt, maxValue) => {
    const numerosGerados = new Set();

    while (numerosGerados.size < qnt) {
        let randomNumber = Math.floor(Math.random() * maxValue);
        while (randomNumber === 0) {
            randomNumber = Math.floor(Math.random() * maxValue);
        }

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

const handleCreateAccountClick = (e) => {
    if (createAccount.innerHTML === "Sair") {
        e.preventDefault();

        localStorage.removeItem("SESSION_ID");
        localStorage.removeItem("USER_ID");
        window.history.pushState({}, document.title, "/mobile-web-dev-class/");
        window.location.reload();
    }
};

const handleGenerateBtnClick = () => {
    displayOnMain(gerarNumeros(5, 50), gerarNumeros(2, 12));
};

const time = () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 6 && hour < 18) {
        return "Bom dia";
    } else {
        return "Boa noite";
    }
};

window.addEventListener("load", () => {
    displayOnMain(gerarNumeros(5, 50), gerarNumeros(2, 12));

    if (localStorage.getItem("SESSION_ID")) {
        getUserFromDB(JSON.parse(localStorage.getItem("USER_ID"))).then((userData) => {
            createAccount.innerHTML = "Sair";
            userGreeting.innerHTML = `${time()}, ${userData.name}`;
        });
    }
});

generateBtn.addEventListener("click", handleGenerateBtnClick);
createAccount?.addEventListener("click", handleCreateAccountClick);
