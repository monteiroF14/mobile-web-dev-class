# Old

```
const displayOnMain = (numeros, estrelas) => {
    numeros.forEach((num) => {
        const pNum = document.createElement("p");
        pNum.innerHTML = num;

        numerosOnMain.appendChild(pNum);
    });

    estrelas.forEach((est) => {
        const pEst = document.createElement("p");
        pEst.innerHTML = est;

        estrelasOnMain.appendChild(pEst);
    });
};

const numerosOnMain = document.querySelector(".numeros");
const estrelasOnMain = document.querySelector(".estrelas");
const generateBtn = document.querySelector("button");

onload = () => {
    displayOnMain(gerarNumeros(5, 50), gerarNumeros(2, 12));
};

generateBtn.addEventListener("click", () => {
    numerosOnMain.innerHTML = "";
    estrelasOnMain.innerHTML = "";
    displayOnMain(gerarNumeros(5, 50), gerarNumeros(2, 12));
});
```

# New

```
const createNumberParagraphs = (numbers) => {
  return numbers.map((num) => {
    const pNum = document.createElement("p");
    pNum.textContent = num;
    return pNum;
  });
};

const displayOnMain = (numeros, estrelas) => {
  const numParagraphs = createNumberParagraphs(numeros);
  const estParagraphs = createNumberParagraphs(estrelas);

  numerosOnMain.innerHTML = "";
  estrelasOnMain.innerHTML = "";

  numerosOnMain.append(...numParagraphs);
  estrelasOnMain.append(...estParagraphs);
};

const numerosOnMain = document.querySelector(".numeros");
const estrelasOnMain = document.querySelector(".estrelas");
const generateBtn = document.querySelector("button");

window.onload = () => {
  displayOnMain(gerarNumeros(5, 50), gerarNumeros(2, 12));
};

generateBtn.addEventListener("click", () => {
  displayOnMain(gerarNumeros(5, 50), gerarNumeros(2, 12));
});
```

## Here's what's changed:

> We've created a new function createNumberParagraphs that takes an array of numbers and returns an array of paragraph elements with the numbers as text content. This function is used in displayOnMain to create the paragraphs.

> We're using textContent instead of innerHTML to set the text of the paragraph elements, which is safer because it prevents the injection of malicious code.

> We're using the spread operator ... to append the paragraph elements to the DOM, which is more concise than looping over the array and calling appendChild on each element.

> We're clearing the contents of numerosOnMain and estrelasOnMain before appending the new paragraphs, which ensures that the previous results are replaced rather than appended.

> We're using window.onload instead of onload to ensure that the function is called when the window is fully loaded.
