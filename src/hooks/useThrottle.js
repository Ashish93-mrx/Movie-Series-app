import { useRef } from "react";

const useThrottle = (callback, delay = 1000) => {
    const lastCalled = useRef(0);

    return (...args) => {
        const now = new Date().getTime();

        if(now - lastCalled.current >= delay) {
            lastCalled.current = now;
            callback(...args);
        }
    };
};

export default useThrottle;