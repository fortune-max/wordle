import { useState } from 'react';
import Board from './Board';
import useInput from './hooks/useInput';
import Keyboard from './Keyboard';
import styled from 'styled-components';

const GameElement = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    justify-content: space-around;
    gap: 3px;
`;

function Game() {
  const [rowCount, setRowCount] = useState<number>(6);
  const [correctWord, setCorrectWord] = useState<string>("HELLO");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [wordLength, setWordLength] = useState<number>(5);

  useInput(rowCount, guesses, currentGuess, wordLength, setCorrectWord, setCurrentGuess, setGuesses, setRowCount, setWordLength);

  return (
    <GameElement>
      <Board correctWord={correctWord} rowCount={rowCount} guesses={guesses} currentGuess={currentGuess} wordLength={wordLength} />
      <Keyboard guesses={guesses} correctWord={correctWord} />
    </GameElement>
  );
}

export default Game;
