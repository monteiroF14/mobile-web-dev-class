export const setSession = (user) => {
    const generateSessionId = () => {
        const randomNum = Math.floor(Math.random() * 1000000000);
        const sessionId = randomNum.toString(16);
        return sessionId;
    };

    localStorage.setItem("SESSION_ID", generateSessionId());
    localStorage.setItem("USER_ID", user);
};
