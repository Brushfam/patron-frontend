import { useEffect, useState } from "react";

export function useLocalStorage (key: string, initialValue = ''): [string, (value: string) => void] {
    const [storedValue, setStoredValue] = useState(initialValue);

    useEffect(() => {
        try {
            const item = window.localStorage.getItem(key);
            const result = item ? JSON.parse(item) : initialValue;
            setStoredValue(result)
        } catch (error) {
            console.log(error);
            setStoredValue(initialValue)
        }
    }, [initialValue, key, setStoredValue]);

    const setValue = (value: string) => {
        setStoredValue(value);
        window.localStorage.setItem(key, JSON.stringify(value));
    };

    return [storedValue, setValue];
}
