'use client';
import React, { useState } from 'react';

export default function Home() {
    const [flashcards, setFlashcards] = useState([]);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('question');

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

    const handleDeleteFlashcard = (index) => {
        const newFlashcards = flashcards.filter((_, i) => i !== index);
        setFlashcards(newFlashcards);
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
                <form onSubmit={handleAddOrUpdateFlashcard}>
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
                        {editIndex !== null ? 'Update' : 'Add'}
                    </button>
                </form>

                <input
                    type="text"
                    placeholder="Search Flashcards"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input search"
                />
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="input select"
                >
                    <option value="question">Sort by Question</option>
                    <option value="answer">Sort by Answer</option>
                </select>
            </div>

            <ul className="flashcard-list">
                {sortedFlashcards.map((flashcard, index) => (
                    <li key={index} className="flashcard-item">
                        <div className="flashcard-content">
                            <span>{flashcard.question}</span>
                            <span>{flashcard.answer}</span>
                        </div>
                        <div className="flashcard-actions">
                            <button 
                                onClick={() => {
                                    setQuestion(flashcard.question);
                                    setAnswer(flashcard.answer);
                                    setEditIndex(index);
                                }}
                                className="button edit-button"
                            >
                                Edit
                            </button>
                            <button 
                                onClick={() => handleDeleteFlashcard(index)}
                                className="button delete-button"
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
