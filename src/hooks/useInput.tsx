import { useEffect } from 'react';

function useInput(
    rowCount: number,
    guesses: string[],
    currentGuess: string,
    wordLength: number,
    correctWord: string,
    validWords: Set<string> | null,
    pickWord: (length: number) => string | null,
    setCorrectWord: (correctWord: string) => void,
    setCurrentGuess: (currentGuess: string) => void,
    setGuesses: (guesses: string[]) => void,
    setRowCount: (rowCount: number) => void,
    setWordLength: (wordLength: number) => void
) {
    useEffect(() => {
        const keyHandler = (key: string, keyCode: number) => {
            if (key === "Backspace") {
                if (guesses.at(-1) === correctWord || guesses.length === rowCount) return;
                setCurrentGuess(currentGuess.slice(0, -1));
            } else if (key === "Enter") {
                if (guesses.at(-1) === correctWord || guesses.length === rowCount) return;
                if (currentGuess.length === wordLength && guesses.length < rowCount){
                    // Word list still loading: accept the guess rather than block play.
                    if (validWords && !validWords.has(currentGuess)) {
                        alert("Word not valid");
                        return;
                    }
                    if (currentGuess === correctWord)
                        setTimeout(() => alert("You win! :D"), 200);
                    if (currentGuess !== correctWord && guesses.length === rowCount - 1)
                        setTimeout(() => alert(`You lose! :(\nCorrect word: ${correctWord}`), 200);
                    setGuesses([...guesses, currentGuess]);
                    setCurrentGuess("");
                }
            } else if ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122)) {
                if (guesses.at(-1) === correctWord || guesses.length === rowCount) return;
                if (currentGuess.length < wordLength)
                    setCurrentGuess(currentGuess + key.toUpperCase());
            } else if (key === "Escape") {
                if (guesses.at(-1) === correctWord || guesses.length === rowCount) return;
                setCurrentGuess("");
            } else if (key === "ArrowUp") {
                setRowCount(Math.max(rowCount - 1, guesses.length + 1));
            } else if (key === "ArrowDown") {
                setRowCount(Math.min(rowCount + 1, 10));
            } else if (key === "ArrowLeft") {
                setWordLength(Math.max(wordLength - 1, 2));
                setGuesses([]);
            } else if (key === "ArrowRight") {
                setWordLength(Math.min(wordLength + 1, 10));
                setGuesses([]);
            } else if (key === " ") {
                const word = pickWord(wordLength);
                if (!word) return;
                setCorrectWord(word);
                setGuesses([]);
                setCurrentGuess("");
            }
        };

        const handleKeyPress = (event: any) => {
            keyHandler(event.key, event.keyCode);
        };
        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [currentGuess, guesses, rowCount, wordLength, correctWord, validWords, pickWord, setCorrectWord, setCurrentGuess, setGuesses, setRowCount, setWordLength]);
}

export default useInput;