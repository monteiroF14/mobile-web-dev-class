# Old

```
const gerarNumeros = (qnt, maxValue) => {
    function getRandomInt(max) {
        return Math.floor(Math.random() \* max);
    }

    const numGerado = [];

    while (numGerado.length < qnt) {
        const randomNumber = getRandomInt(maxValue);

        if (numGerado.indexOf(randomNumber) === -1) {
            numGerado.push(randomNumber);
        }
    }

    return numGerado;
};
```

# New

```
const gerarNumeros = (qnt, maxValue) => {
    const numGerado = new Set();

    while (numGerado.size < qnt) {
    const randomNumber = Math.floor(Math.random() \* maxValue);

        numGerado.add(randomNumber);

    }

    return Array.from(numGerado);
                or
    return [...numerosGerados];
};
```

## Here's what's changed:

> Instead of using an array and checking if a number is already in the array, we're using a Set, which ensures that there are no duplicates.

> We're using the size property of the Set instead of the length property of an array to check if we have generated enough numbers.

> We're using Math.floor(Math.random() \* maxValue) to generate a random integer between 0 and maxValue (exclusive).

> We're using Array.from to convert the Set back into an array, since the original function returns an array.
