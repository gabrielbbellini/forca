import { MouseEvent, useState } from "react";
import { fetchGameState, fetchNewGame, guessCharacter } from "./http";

export interface GameState {
    id: string;
    wordsLength: number[];
    remainingAttempts: number;
    isVictory: boolean | null;
    characters: {
        character: string;
        wordIndex: number;
        characterIndex: number;
        isCorrect: boolean;
    }[] | null;
}  

export const useGameState = () => {
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
  
    const startNewGame = async () => {
        if (isLoading) return;
        const savedId = localStorage.getItem('wordId');
        if (savedId && !gameState) {
            const savedGame = await fetchGameState(savedId);
            if (savedGame) {
                setGameState(savedGame);
                return;
            }
        }

        setIsLoading(true);
        try {
            const data = await fetchNewGame();
            setGameState(data);
            localStorage.setItem('wordId', data.id);
        } catch (error) {
            console.error('Erro ao iniciar o jogo:', error);
        } finally {
            setIsLoading(false);
        }
    };

  
    const handleCharacterClick = async (e: MouseEvent<HTMLButtonElement>) => {
        const character = e.currentTarget.id;
        if (gameState?.id) {
        try {
          const updatedState = await guessCharacter(gameState.id, character);
          setGameState(updatedState);
  
          if (updatedState.isVictory != null) {
            setTimeout(startNewGame, 1000);
          }
        } catch (error) {
          console.error('Erro ao adivinhar caractere:', error);
        }
      }
    };
  
    return { gameState, isLoading, startNewGame, handleCharacterClick };
  };
  