'use client';

import { useState, useEffect } from 'react';
import { FaTrophy, FaRedo } from 'react-icons/fa';

interface Card {
    id: number;
    color: string;
    isFlipped: boolean;
    isMatched: boolean;
}

const COLORS = [
    '#3B82F6', // blue
    '#8B5CF6', // purple
    '#EC4899', // pink
    '#10B981', // green
    '#F59E0B', // amber
    '#EF4444', // red
    '#06B6D4', // cyan
    '#6366F1', // indigo
];

export default function ColorMatchGame() {
    const [cards, setCards] = useState<Card[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [matches, setMatches] = useState(0);
    const [isWon, setIsWon] = useState(false);
    const [bestScore, setBestScore] = useState<number | null>(null);

    useEffect(() => {
        initializeGame();
        const saved = localStorage.getItem('colorMatchBestScore');
        if (saved) setBestScore(parseInt(saved));
    }, []);

    const initializeGame = () => {
        const gameColors = COLORS.slice(0, 6); // Use 6 colors for 12 cards
        const cardPairs = [...gameColors, ...gameColors];
        const shuffled = cardPairs
            .sort(() => Math.random() - 0.5)
            .map((color, index) => ({
                id: index,
                color,
                isFlipped: false,
                isMatched: false,
            }));
        setCards(shuffled);
        setFlippedCards([]);
        setMoves(0);
        setMatches(0);
        setIsWon(false);
    };

    const handleCardClick = (id: number) => {
        if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) {
            return;
        }

        const newCards = [...cards];
        newCards[id].isFlipped = true;
        setCards(newCards);

        const newFlipped = [...flippedCards, id];
        setFlippedCards(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(moves + 1);
            const [first, second] = newFlipped;

            if (cards[first].color === cards[second].color) {
                // Match found
                setTimeout(() => {
                    const matchedCards = [...cards];
                    matchedCards[first].isMatched = true;
                    matchedCards[second].isMatched = true;
                    setCards(matchedCards);
                    setFlippedCards([]);

                    const newMatches = matches + 1;
                    setMatches(newMatches);

                    if (newMatches === 6) {
                        setIsWon(true);
                        if (!bestScore || moves + 1 < bestScore) {
                            setBestScore(moves + 1);
                            localStorage.setItem('colorMatchBestScore', String(moves + 1));
                        }
                    }
                }, 500);
            } else {
                // No match
                setTimeout(() => {
                    const resetCards = [...cards];
                    resetCards[first].isFlipped = false;
                    resetCards[second].isFlipped = false;
                    setCards(resetCards);
                    setFlippedCards([]);
                }, 1000);
            }
        }
    };

    return (
        <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 py-6 px-3 sm:px-4">
            <div className="max-w-xl mx-auto">
                {/* Game Header */}
                <div className="text-center mb-4">
                    <h2 className="text-xl md:text-2xl font-bold font-heading text-white mb-1.5">
                        Color Memory Game
                    </h2>
                    <p className="text-xs md:text-sm text-white/60 font-body mb-3">
                        Match all the color pairs to win! Test your memory while you wait.
                    </p>

                    {/* Stats */}
                    <div className="flex gap-2 sm:gap-3 justify-center items-center flex-wrap">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-1.5">
                            <p className="text-white/60 text-[10px] font-body mb-0.5">Moves</p>
                            <p className="text-lg font-bold font-heading text-white">{moves}</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-1.5">
                            <p className="text-white/60 text-[10px] font-body mb-0.5">Matches</p>
                            <p className="text-lg font-bold font-heading text-white">{matches}/6</p>
                        </div>
                        {bestScore && (
                            <div className="bg-gradient-to-r from-blue-600/20 to-blue-700/20 backdrop-blur-md border border-blue-500/30 rounded-lg px-3 py-1.5">
                                <p className="text-blue-300 text-[10px] font-body mb-0.5 flex items-center gap-1 justify-center">
                                    <FaTrophy className="w-2.5 h-2.5" /> Best
                                </p>
                                <p className="text-lg font-bold font-heading text-blue-300">{bestScore}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Game Board */}
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 sm:gap-2 mb-4 max-w-sm mx-auto">
                    {cards.map((card) => (
                        <button
                            key={card.id}
                            onClick={() => handleCardClick(card.id)}
                            disabled={card.isMatched}
                            className={`aspect-square rounded-lg transition-all duration-300 transform hover:scale-105 ${card.isMatched
                                ? 'opacity-50 cursor-not-allowed'
                                : 'cursor-pointer hover:shadow-xl'
                                }`}
                            style={{
                                backgroundColor: card.isFlipped || card.isMatched ? card.color : 'rgba(255, 255, 255, 0.1)',
                                border: card.isFlipped || card.isMatched ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                                boxShadow: card.isFlipped || card.isMatched ? `0 8px 20px ${card.color}40` : 'none',
                            }}
                        >
                            {!card.isFlipped && !card.isMatched && (
                                <div className="w-full h-full flex items-center justify-center">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-white/30 rounded-full"></div>
                                </div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Reset Button */}
                <div className="text-center">
                    <button
                        onClick={initializeGame}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold font-body rounded-lg transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30 text-xs inline-flex items-center gap-1.5"
                    >
                        <FaRedo className="w-3 h-3" />
                        New Game
                    </button>
                </div>

                {/* Win Modal */}
                {isWon && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-gradient-to-br from-slate-900 to-blue-900 border border-white/20 rounded-2xl p-6 sm:p-8 max-w-sm w-full text-center animate-fade-in">
                            <div className="mb-4">
                                <FaTrophy className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400 mx-auto mb-3" />
                                <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white mb-2">
                                    Congratulations! 🎉
                                </h3>
                                <p className="text-sm sm:text-base text-white/70 font-body mb-4">
                                    You matched all the colors!
                                </p>
                                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-3 mb-4">
                                    <p className="text-white/60 text-xs font-body mb-1">Your Score</p>
                                    <p className="text-3xl sm:text-4xl font-bold font-heading text-white">{moves} moves</p>
                                    {moves === bestScore && (
                                        <p className="text-blue-400 text-sm font-body mt-2">🏆 New Best Score!</p>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={initializeGame}
                                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold font-body rounded-lg transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30 text-sm inline-flex items-center gap-2"
                            >
                                <FaRedo className="w-3.5 h-3.5" />
                                Play Again
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
