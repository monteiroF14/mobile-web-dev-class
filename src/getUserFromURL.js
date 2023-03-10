import addUserToDB from "./addUserToDB.js";

const getUserFromURL = () => {
    const createAccount = document.querySelector("header > a");
    const userGreeting = document.querySelector(".helloUser");

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

        addUserToDB(
            { name, email, phone, nif, address, observations },
            createAccount,
            userGreeting,
            time()
        )
            .then(() => {
                console.log("IndexedDB operation successful");
            })
            .catch((err) => {
                console.error("IndexedDB operation failed:", err);
            });
    }
};

export default getUserFromURL;
