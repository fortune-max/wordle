import { useMemo } from 'react';
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
                return <Box key={index} boxState={letterState[key] || "default"} clickable={true} letter={key} />;
            })}
        </KeyboardRowElement>
    );
}

function Keyboard({ guesses, correctWord } : {
    guesses: string[];
    correctWord: string;
}) {
    const keys = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ];

    const letterState = useMemo(() => {
        const state: {[key: string]: "default" | "incorrect" | "correct" | "misplaced"} = {};
        guesses.forEach((guess) => {
            guess.split("").forEach((letter, index) => {
                if (correctWord[index] === letter)
                    state[letter] = "correct";
                else if (state[letter] !== "correct" && correctWord.includes(letter))
                    state[letter] = "misplaced";
                else if (state[letter] === undefined)
                    state[letter] = "incorrect";
            });
        });
        return state;
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