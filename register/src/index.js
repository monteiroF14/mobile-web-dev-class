document.querySelector("form").addEventListener(
    "submit",
    (e) => {
        const nif = document.querySelector("#nif").value;

        if (nif < 0) {
            e.preventDefault();

            alert("Insira um NIF válido!");

            document.querySelector("#name").value = "";
            document.querySelector("#email").value = "";
            document.querySelector("#phone").value = "";
            document.querySelector("#nif").value = "";
            document.querySelector("#address").value = "";
            document.querySelector("#observations").value = "";
        }
    },
    true
);
