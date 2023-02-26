import React, { useEffect } from 'react';

function useInput(
    rowCount: number,
    guesses: string[],
    currentGuess: string,
    wordLength: number,
    setCorrectWord: (correctWord: string) => void,
    setCurrentGuess: (currentGuess: string) => void,
    setGuesses: (guesses: string[]) => void,
    setRowCount: (rowCount: number) => void,
    setWordLength: (wordLength: number) => void
) {
    useEffect(() => {
        const keyHandler = (key: string, keyCode: number) => {
            if (key === "Backspace") {
                setCurrentGuess(currentGuess.slice(0, -1));
            } else if (key === "Enter") {
                if (currentGuess.length === wordLength){
                    setGuesses([...guesses, currentGuess]);
                    setCurrentGuess("");
                }
            } else if ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122)) {
                if (currentGuess.length < wordLength)
                    setCurrentGuess(currentGuess + key);
            } else if (key === "Escape") {
                setCurrentGuess("");
            } else if (key === "ArrowUp") {
                setRowCount(Math.max(rowCount - 1, 1));
            } else if (key === "ArrowDown") {
                setRowCount(Math.min(rowCount + 1, 10));
            } else if (key === "ArrowLeft") {
                setWordLength(Math.max(wordLength - 1, 2));
            } else if (key === "ArrowRight") {
                setWordLength(Math.min(wordLength + 1, 10));
            }
        };

        const handleKeyPress = (event: any) => {
            keyHandler(event.key, event.keyCode);
        };
        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [currentGuess, guesses, rowCount, wordLength, setCorrectWord, setCurrentGuess, setGuesses, setRowCount, setWordLength]);
}

export default useInput;