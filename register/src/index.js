document.querySelector("form").addEventListener(
    "submit",
    () => {
        let nif = document.querySelector("#nif");

        if (nif < 0) {
            e.preventDefault();

            alert("Insira um NIF válido!");

            name.value = "";
            email.value = "";
            phone.value = "";
            nif.value = "";
            address.value = "";
            observations.value = "";
        }
    },
    true
);
