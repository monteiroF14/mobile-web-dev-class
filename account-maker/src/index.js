document.querySelector("form").addEventListener(
    "submit",
    (e) => {
        e.preventDefault();

        let name = document.querySelector("#name");
        let email = document.querySelector("#email");
        let phone = document.querySelector("#phone");
        let nif = document.querySelector("#nif");
        let address = document.querySelector("#address");
        let observations = document.querySelector("#observations");

        name.value = "";
        email.value = "";
        phone.value = "";
        nif.value = "";
        address.value = "";
        observations.value = "";
    },
    true
);
