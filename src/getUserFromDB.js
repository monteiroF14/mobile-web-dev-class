const getUserFromDB = () => {
    return new Promise((resolve, reject) => {
        const objectStoreName = "user";

        const request = indexedDB.open("userDB");

        request.onsuccess = (event) => {
            const db = event.target.result;
            const tx = db.transaction(objectStoreName, "readonly");
            const objectStore = tx.objectStore(objectStoreName);
            const index = objectStore.index("name");
            index.onsuccess = (event) => {
                const matchingData = event.target.result;
                resolve(matchingData);
            };
        };
        request.onerror = (event) => {
            reject(event.target.errorCode);
        };
    });
};

export default getUserFromDB;
