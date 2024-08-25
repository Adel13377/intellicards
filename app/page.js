'use client';
import React, { useState } from 'react';

export default function Home() {
    const [flashcards, setFlashcards] = useState([]);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('question');
    const [revealedAnswers, setRevealedAnswers] = useState({});

    const handleAddOrUpdateFlashcard = (e) => {
        e.preventDefault();

        if (!question.trim() || !answer.trim()) {
            alert('Please enter a valid question and answer.');
            return;
        }

        const newFlashcard = { question: question.trim(), answer: answer.trim() };

        if (editIndex !== null) {
            const updatedFlashcards = flashcards.map((flashcard, index) =>
                index === editIndex ? newFlashcard : flashcard
            );
            setFlashcards(updatedFlashcards);
            setEditIndex(null);
        } else {
            setFlashcards([...flashcards, newFlashcard]);
        }

        setQuestion('');
        setAnswer('');
    };

    const handleDeleteFlashcard = (indexToDelete) => {
        setFlashcards(prevFlashcards => prevFlashcards.filter((_, index) => index !== indexToDelete));
        setRevealedAnswers(prev => {
            const newRevealed = {...prev};
            delete newRevealed[indexToDelete];
            return newRevealed;
        });
    };

    const toggleAnswer = (index) => {
        setRevealedAnswers(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const filteredFlashcards = flashcards.filter(flashcard =>
        flashcard.question.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedFlashcards = filteredFlashcards.sort((a, b) => {
        if (sortOrder === 'question') {
            return a.question.localeCompare(b.question);
        } else {
            return a.answer.localeCompare(b.answer);
        }
    });

    return (
        <main className="container">
            <h1 className="title">AI Flashcards</h1>
            <div className="flashcard-form">
                <form onSubmit={handleAddOrUpdateFlashcard} className="form-grid">
                    <input 
                        type="text"
                        placeholder="Enter Question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="input"
                    />
                    <input 
                        type="text"
                        placeholder="Enter Answer"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="input"
                    />
                    <button type="submit" className="button">
                        {editIndex !== null ? 'Update Flashcard' : 'Add Flashcard'}
                    </button>
                </form>
            </div>

            <div className="search-sort">
                <input
                    type="text"
                    placeholder="Search Flashcards"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input"
                />
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="input"
                >
                    <option value="question">Sort by Question</option>
                    <option value="answer">Sort by Answer</option>
                </select>
            </div>

            <ul className="flashcard-list">
                {sortedFlashcards.map((flashcard, index) => (
                    <li 
                        key={index} 
                        className={`flashcard-item ${revealedAnswers[index] ? 'show-answer' : ''}`}
                        onClick={() => toggleAnswer(index)}
                    >
                        <div className="flashcard-content">
                            <div className="flashcard-question">{flashcard.question}</div>
                            <div className="flashcard-answer">{flashcard.answer}</div>
                        </div>
                        <div className="flashcard-actions" onClick={(e) => e.stopPropagation()}>
                            <button 
                                onClick={() => {
                                    setQuestion(flashcard.question);
                                    setAnswer(flashcard.answer);
                                    setEditIndex(index);
                                }}
                                className="action-button edit-button"
                            >
                                Edit
                            </button>
                            <button 
                                onClick={() => handleDeleteFlashcard(index)}
                                className="action-button delete-button"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="total-flashcards">
                Total Flashcards: {flashcards.length}
            </div>
        </main>
    );
}