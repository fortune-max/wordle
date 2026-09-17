import { useCallback, useEffect, useMemo, useState } from 'react';
import Board from './Board';
import useInput from './hooks/useInput';
import Keyboard from './Keyboard';
import styled from 'styled-components';
import image from "./wordle_logo.png";

const GameElement = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    justify-content: space-around;
    gap: 3px;
`;

const Logo = styled.img`
    width: 200px;
`;

function Game() {
    const [rowCount, setRowCount] = useState<number>(6);
    const [correctWord, setCorrectWord] = useState<string>("HELLO");
    const [guesses, setGuesses] = useState<string[]>([]);
    const [currentGuess, setCurrentGuess] = useState<string>("");
    const [wordLength, setWordLength] = useState<number>(5);
    const [words, setWords] = useState<{[length: string]: string[]} | null>(null);

    useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/words.json`)
            .then((response) => response.json())
            .then((data: {[length: string]: string[]}) => setWords(data))
            // Without the list every guess is accepted, so the game stays playable.
            .catch(() => setWords(null));
    }, []);

    const validWords = useMemo(
        () => words && new Set(Object.values(words).flat()),
        [words]
    );

    const pickWord = useCallback((length: number) => {
        const pool = words?.[length];
        if (!pool) return null;
        return pool[Math.floor(Math.random() * pool.length)];
    }, [words]);

    useEffect(() => {
        const word = pickWord(wordLength);
        if (word) setCorrectWord(word);
    }, [wordLength, pickWord]);

    useInput(rowCount, guesses, currentGuess, wordLength, correctWord, validWords, pickWord, setCorrectWord, setCurrentGuess, setGuesses, setRowCount, setWordLength);

    return (
        <GameElement>
            <Logo src={image} alt="Wordle Logo" />
            <Board correctWord={correctWord} rowCount={rowCount} guesses={guesses} currentGuess={currentGuess} wordLength={wordLength} />
            <Keyboard guesses={guesses} correctWord={correctWord} />
        </GameElement>
    );
}

export default Game;
