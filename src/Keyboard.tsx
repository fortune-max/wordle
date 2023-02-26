import { useEffect, useState } from 'react';
import Box from './Box';
import styled from 'styled-components';

const KeyboardRowElement = styled.div`
    display: flex;
    flex-direction: row;
    gap: 3px;
`;

const KeyboardElement = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
    align-items: center;
`;

function KeyboardRow({ keys, letterState } : {
    keys: string[];
    letterState: {[key: string]: "default" | "incorrect" | "correct" | "misplaced"};
}) {
    return (
        <KeyboardRowElement>
            {keys.map((key, index) => {
                return <Box key={index} boxState={letterState[key] || "default"}>{key}</Box>;
            })}
        </KeyboardRowElement>
    );
}

function Keyboard({ guesses, correctWord } : {
    guesses: string[];
    correctWord: string;
}) {
    const [letterState, setLetterState] = useState<{[key: string]: "default" | "incorrect" | "correct" | "misplaced"}>({});
    
    const keys = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ];

    useEffect(() => {
        if (guesses.length === 0) return;
        const lastGuess = guesses.at(-1);
        lastGuess?.split("").forEach((letter, index) => {
            if (correctWord[index] === letter) {
                if (letterState[letter] === "correct") return;
                setLetterState((prevState) => {
                    return {
                        ...prevState,
                        [letter]: "correct"
                    };
                });
            } else if (correctWord.includes(letter)) {
                if (letterState[letter] === "correct") return;
                setLetterState((prevState) => {
                    return {
                        ...prevState,
                        [letter]: "misplaced"
                    };
                });
            } else {
                if (letterState[letter] === "correct" || letterState[letter] === "misplaced") return;
                setLetterState((prevState) => {
                    return {
                        ...prevState,
                        [letter]: "incorrect"
                    };
                });
            }
        });
    }, [guesses, correctWord]);

    return (
        <KeyboardElement>
            {keys.map((row, index) => {
                return <KeyboardRow key={index} keys={row} letterState={letterState} />;
            })}
        </KeyboardElement>
    );
}

export default Keyboard;