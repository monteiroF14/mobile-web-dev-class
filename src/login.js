import { setSession } from "./setSession.js";
import indexedDB from "./index.js";

const verifyEmail = (email) => {
    return new Promise((resolve, reject) => {
        if (!indexedDB) {
            console.error("IndexedDB not supported");
            reject(new Error("IndexedDB not supported"));
        }

        const request = indexedDB.open("usersDB", 1);

        request.onerror = () => {
            console.error("Failed to open database");
            reject(new Error("Failed to open database"));
        };

        request.onsuccess = (event) => {
            const db = event.target.result;

            const transaction = db.transaction("users", "readonly");
            const objectStore = transaction.objectStore("users");

            const emailIndex = objectStore.index("email");
            const emailRequest = emailIndex.get(email);

            emailRequest.onsuccess = () => {
                const user = emailRequest.result;
                if (user) {
                    resolve(user);
                } else {
                    reject(new Error("Não existe nenhuma conta com esse email!"));
                }
            };

            emailRequest.onerror = () => {
                reject(new Error("Failed to check email existence"));
            };
        };
    });
};

const handleSubmit = async (event) => {
    event.preventDefault();

    const email = document.querySelector("#email").value;

    try {
        await verifyEmail(email).then((user) => {
            setSession(user.id);
            event.target.submit();
        });
    } catch (err) {
        alert(err.message);
    }
};

document.querySelector("form").addEventListener("submit", handleSubmit);
