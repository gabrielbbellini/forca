import { useEffect } from "react";
import { GameState, useGameState } from "./useGameState";
import { MouseEvent } from 'react';

const App = () => {
  const { gameState, startNewGame, handleCharacterClick } = useGameState();

  useEffect(() => {
    startNewGame();
  }, []);

  return (
    <div className={`app remaining${gameState?.remainingAttempts}`}>
      <div className='container'>
        <div className={`lifes lifes${gameState?.remainingAttempts}`}></div>
        <span className='finish-game-message'>
        {gameState === null || gameState.isVictory === null
        ? ''
        : gameState.isVictory
        ? 'VOCÊ FLORESCEU!'
        : 'VOCÊ SUFOCOU!'}
        </span>
        <WordsDisplay wordsLength={gameState?.wordsLength} characters={gameState?.characters} />
        <CharacterButtons characters={gameState?.characters} onClickCharacter={handleCharacterClick} />
      </div>
    </div>
  );
};


interface WordsDisplayProps {
  wordsLength: number[] | undefined;
  characters: GameState['characters'] | undefined;
}

const WordsDisplay = ({ wordsLength, characters }: WordsDisplayProps) => (
  <div className='words'>
    {wordsLength?.map((wordLength, wordIndex) => (
      <div className='word' key={`word-${wordIndex}`}>
        {Array.from({ length: wordLength }).map((_, characterIndex) => (
          <div className='word__letter' key={`word-letter-${wordIndex}-${characterIndex}`}>
            {characters?.find(
              (char) => char.wordIndex === wordIndex && char.characterIndex === characterIndex
            )?.character}
          </div>
        ))}
      </div>
    ))}
  </div>
);

interface CharacterButtonsProps {
  characters: GameState['characters'] | undefined;
  onClickCharacter: (e: MouseEvent<HTMLButtonElement>) => void;
}

const CharacterButtons = ({ characters, onClickCharacter }: CharacterButtonsProps) => (
  <ul>
    {Array.from({ length: 26 }).map((_, i) => {
      const character = String.fromCharCode(97 + i);
      const isUsed = characters?.some((char) => char.character === character);
      return (
        <li key={character}>
          <button
            className={`character ${isUsed ? 'used' : ''}`}
            id={character}
            onClick={onClickCharacter}
            disabled={isUsed}
          >
            {character}
          </button>
        </li>
      );
    })}
  </ul>
);

export default App;