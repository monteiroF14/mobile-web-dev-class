const setSession = (user) => {
    const generateSessionId = () => {
        const randomNum = Math.floor(Math.random() * 1000000000); // Generate a random number
        const sessionId = randomNum.toString(16); // Convert the random number to a hexadecimal string
        return sessionId;
    };

    localStorage.setItem("SESSION_ID", generateSessionId());
    localStorage.setItem("USER_ID", user);
};

export default setSession;
