const gerarNumeros = (qnt, maxValue) => {
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function checkIfExists(randomNumber) {
        if (numGerado.includes(randomNumber)) {
            return;
        }
    }

    const numGerado = [];

    while (numGerado.length < 5) {
        const randomNumber = getRandomInt(maxValue);

        numGerado.indexOf(randomNumber) === -1
            ? numGerado.push(randomNumber)
            : console.log("This item already exists");
    }

    return numGerado;
};

document.querySelector("button").addEventListener("click", gerarNumeros(5, 50));
