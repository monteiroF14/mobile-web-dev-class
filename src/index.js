import getUserFromDB from "./getUserFromDB.js";
import getUserFromURL from "./getUserFromURL.js";

const numerosOnMain = document.querySelector(".numeros");
const estrelasOnMain = document.querySelector(".estrelas");
const generateBtn = document.querySelector("button");
const createAccount = document.querySelector("header > a");

const indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;

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

window.addEventListener("load", () => {
    displayOnMain(gerarNumeros(5, 50), gerarNumeros(2, 12));

    const request = indexedDB.open("userDB", 1);
    request.onsuccess = (event) => {
        const db = event.target.result;
        if (db.objectStoreNames.contains("users")) {
            getUserFromDB().catch((err) => {
                console.error(`Error retrieving data from IndexedDB: ${err}`);
            });
        } else {
            getUserFromURL();
        }
    };
});

generateBtn.addEventListener("click", () => {
    displayOnMain(gerarNumeros(5, 50), gerarNumeros(2, 12));
});

createAccount?.addEventListener("click", (e) => {
    if (createAccount.innerHTML === "Sair") {
        e.preventDefault();
        window.history.pushState({}, document.title, "/mobile-web-dev-class/");
        window.location.reload();
    }
});
