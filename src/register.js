import addUserToDB from "./addUserToDB.js";

const clearInputs = () => {
    const inputIds = ["name", "email", "phone", "nif", "address", "observations"];
    inputIds.forEach((id) => {
        document.querySelector(`#${id}`).value = "";
    });
};

const setSession = (user) => {
    const generateSessionId = () => {
        const randomNum = Math.floor(Math.random() * 1000000000); // Generate a random number
        const sessionId = randomNum.toString(16); // Convert the random number to a hexadecimal string
        return sessionId;
    };

    localStorage.setItem("SESSION_ID", generateSessionId());
    localStorage.setItem("USER_ID", user);
};

const handleSubmit = async (event) => {
    event.preventDefault();

    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const phone = document.querySelector("#phone").value;
    const nif = document.querySelector("#nif").value;
    const address = document.querySelector("#address").value;
    const observations = document.querySelector("#observations").value;

    if (nif < 0) {
        alert("Insira um NIF válido!");
        clearInputs();
        return;
    }

    try {
        await addUserToDB({ name, email, phone, nif, address, observations }).then((userId) => {
            setSession(userId);
        });
        event.target.submit();
    } catch (err) {
        alert(err);
        clearInputs();
    }
};

document.querySelector("form").addEventListener("submit", handleSubmit);
