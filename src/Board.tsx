import Row from './Row';
import styled from 'styled-components';

const BoardElement = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
`;

function Board({ rowCount, guesses, correctWord, currentGuess, wordLength } : {
    rowCount: number;
    guesses: string[];
    correctWord: string;
    currentGuess: string;
    wordLength: number;
}) {
    return (
        <BoardElement>
            {guesses.map((guess, index) => {
                return <Row key={index} currentWord={guess} correctWord={correctWord} wordLength={wordLength} />;
            })}
            <Row key={guesses.length} currentWord={currentGuess} correctWord={correctWord} wordLength={wordLength} isActiveRow={true}/>
            {Array(rowCount - guesses.length - 1).fill(0).map((_, index) => {
                return <Row key={guesses.length + index + 1} currentWord={""} correctWord={correctWord} wordLength={wordLength} />;
            })}
        </BoardElement>
    );
}

export default Board;