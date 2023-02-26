import React from 'react';
import Box from './Box';
import styled from 'styled-components';

const RowElement = styled.div<{}>`
    display: flex;
    flex-direction: row;
    gap: 3px;
`;

function getBoxState(letter: string, index: number, correctWord: string) {
    if (letter === correctWord[index]) {
        return "correct";
    } else if (correctWord.includes(letter)) {
        return "misplaced";
    } else {
        return "incorrect";
    }
}

function Row({ currentWord, correctWord, wordLength } : {
    currentWord: string;
    correctWord: string;
    wordLength: number;
}) {
    return (
        <RowElement>
            {
                Array(wordLength).fill(0).map((_, index) => {
                    if (index < currentWord.length) {
                        return <Box key={index} boxState={getBoxState(currentWord[index], index, correctWord)}>{currentWord[index]}</Box>;
                    } else {
                        return <Box key={index} boxState="empty" />;
                    }
                })
            }
        </RowElement>
    );
}

export default Row;