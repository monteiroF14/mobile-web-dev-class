const removeUserFromDB = () => {
    const openRequest = indexedDB.open("userDB", 1);

    openRequest.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(["user"], "readwrite");
        const objectStore = transaction.objectStore("user");
        const clearRequest = objectStore.clear();

        clearRequest.onsuccess = (event) => {
            console.log("All records removed from 'user' object store");
        };

        clearRequest.onerror = (event) => {
            console.error("Error removing records from 'user' object store", event.target.error);
        };
    };
};

export default removeUserFromDB;
