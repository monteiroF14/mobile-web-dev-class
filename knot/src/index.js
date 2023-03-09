const numerosOnMain = document.querySelector(".numeros");
const estrelasOnMain = document.querySelector(".estrelas");
const generateBtn = document.querySelector("button");
const createAccount = document.querySelector("header > a");

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

        const time = () => {
            const now = new Date();
            const hour = now.getHours();

            if (hour >= 6 && hour < 18) {
                return "Bom dia";
            } else {
                return "Boa noite";
            }
        };

        document.querySelector(".helloUser").innerHTML = `${time()}, ${name}`;

        const indexedDB =
            window.indexedDB ||
            window.mozIndexedDB ||
            window.webkitIndexedDB ||
            window.msIndexedDB ||
            window.shimIndexedDB;

        const openRequest = indexedDB.open("userDB", 1);

        openRequest.onupgradeneeded = function (event) {
            const db = event.target.result;
            const objectStore = db.createObjectStore("user", {
                keyPath: "id",
                autoIncrement: true,
            });
            objectStore.createIndex("name", "name", { unique: false });
            objectStore.createIndex("email", "email", { unique: false });
            objectStore.createIndex("phone", "phone", { unique: false });
            objectStore.createIndex("nif", "nif", { unique: false });
            objectStore.createIndex("address", "address", { unique: false });
            objectStore.createIndex("observations", "observations", { unique: false });
        };

        openRequest.onsuccess = function (event) {
            const db = event.target.result;
            const transaction = db.transaction(["user"], "readwrite");
            const objectStore = transaction.objectStore("user");
            objectStore.add({ name, email, phone, nif, address, observations });
        };

        return true;
    } else {
        return false;
    }
};

window.addEventListener("load", () => {
    if (getUserData()) {
        createAccount.innerHTML = "Sair";
    }

    displayOnMain(gerarNumeros(5, 50), gerarNumeros(2, 12));
});

generateBtn.addEventListener("click", () => {
    displayOnMain(gerarNumeros(5, 50), gerarNumeros(2, 12));
});

createAccount?.addEventListener("click", (e) => {
    if (createAccount.innerHTML === "Sair") {
        e.preventDefault();

        const indexedDB =
            window.indexedDB ||
            window.mozIndexedDB ||
            window.webkitIndexedDB ||
            window.msIndexedDB ||
            window.shimIndexedDB;

        const openRequest = indexedDB.open("userDB", 1);

        openRequest.onsuccess = function (event) {
            const db = event.target.result;
            const transaction = db.transaction(["user"], "readwrite");
            const objectStore = transaction.objectStore("user");
            const clearRequest = objectStore.clear();

            clearRequest.onsuccess = function (event) {
                console.log("All records removed from 'user' object store");
            };

            clearRequest.onerror = function (event) {
                console.error(
                    "Error removing records from 'user' object store",
                    event.target.error
                );
            };
        };

        window.history.pushState({}, document.title, "/");
        window.location.reload();
    }
});
