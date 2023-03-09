const addUserToDB = (userData, createAccount, userGreeting, time) => {
    return new Promise((resolve, reject) => {
        if (!indexedDB) {
            console.error("IndexedDB not supported");
            reject(new Error("IndexedDB not supported"));
        }

        const request = indexedDB.open("usersDB", 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            const objectStore = db.createObjectStore("users", {
                keyPath: "id",
                autoIncrement: true,
            });
            objectStore.createIndex("name", "name", { unique: false });
            objectStore.createIndex("email", "email", { unique: true });
            objectStore.createIndex("phone", "phone", { unique: false });
            objectStore.createIndex("nif", "nif", { unique: false });
            objectStore.createIndex("address", "address", { unique: false });
            objectStore.createIndex("observations", "observations", { unique: false });
        };

        request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction(["users"], "readwrite");
            const objectStore = transaction.objectStore("users");
            const emailIndex = objectStore.index("email");
            const req = emailIndex.get(userData.email);
            req.onsuccess = (e) => {
                const user = e.target.result;
                if (!user) {
                    objectStore.add(userData);
                    createAccount.innerHTML = "Sair";
                    userGreeting.innerHTML = `${time}, ${userData["name"]}`;
                }
                transaction.oncomplete = () => {
                    db.close();
                    resolve();
                };
            };
        };

        request.onerror = (err) => {
            console.error(`something happened, ${err}`);
            reject(new Error(`something happened, ${err}`));
        };
    });
};

export default addUserToDB;
