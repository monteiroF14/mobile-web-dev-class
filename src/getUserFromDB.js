export const getUserFromDB = (USER_ID) => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("usersDB");

        request.onsuccess = (event) => {
            const db = event.target.result;
            const tx = db.transaction("users", "readonly");
            const objectStore = tx.objectStore("users");
            const req = objectStore.get(USER_ID);
            req.onsuccess = (event) => {
                const matchingData = event.target.result;
                resolve(matchingData);
            };
            req.onerror = (event) => {
                reject(event.target.errorCode);
            };
        };
        request.onerror = (event) => {
            reject(event.target.errorCode);
        };
    });
};
