import { useEffect } from 'react';

function useInput(
    rowCount: number,
    guesses: string[],
    currentGuess: string,
    wordLength: number,
    correctWord: string,
    setCorrectWord: (correctWord: string) => void,
    setCurrentGuess: (currentGuess: string) => void,
    setGuesses: (guesses: string[]) => void,
    setRowCount: (rowCount: number) => void,
    setWordLength: (wordLength: number) => void
) {
    useEffect(() => {
        const keyHandler = (key: string, keyCode: number) => {
            if (key === "Backspace") {
                if (guesses.at(-1) === correctWord) return;
                setCurrentGuess(currentGuess.slice(0, -1));
            } else if (key === "Enter") {
                if (guesses.at(-1) === correctWord) return;
                if (currentGuess.length === wordLength && guesses.length < rowCount){
                    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + currentGuess)
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.title !== "No Definitions Found" || currentGuess === correctWord) {
                                setGuesses([...guesses, currentGuess]);
                                setCurrentGuess("");
                            } else {
                                // TODO: Add a way to show the user that the word is not in the dictionary
                            }
                        });
                }
            } else if ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122)) {
                if (guesses.at(-1) === correctWord) return;
                if (currentGuess.length < wordLength)
                    setCurrentGuess(currentGuess + key.toUpperCase());
            } else if (key === "Escape") {
                if (guesses.at(-1) === correctWord) return;
                setCurrentGuess("");
            } else if (key === "ArrowUp") {
                setRowCount(Math.max(rowCount - 1, 1));
            } else if (key === "ArrowDown") {
                setRowCount(Math.min(rowCount + 1, 10));
            } else if (key === "ArrowLeft") {
                setWordLength(Math.max(wordLength - 1, 2));
                setGuesses([]);
            } else if (key === "ArrowRight") {
                setWordLength(Math.min(wordLength + 1, 10));
                setGuesses([]);
            }
        };

        const handleKeyPress = (event: any) => {
            keyHandler(event.key, event.keyCode);
        };
        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [currentGuess, guesses, rowCount, wordLength, correctWord, setCorrectWord, setCurrentGuess, setGuesses, setRowCount, setWordLength]);
}

export default useInput;