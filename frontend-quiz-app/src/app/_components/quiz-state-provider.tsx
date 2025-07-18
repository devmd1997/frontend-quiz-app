"use client"
import React, { createContext, useContext, useState } from "react";


type QuizState = {
    quizzes: Quiz[];
    currentQuiz?: Quiz;
    correctAnswers: number;
}

type QuizContextType = {
    quizState: QuizState;
    setQuizState: React.Dispatch<React.SetStateAction<QuizState>>;
}

type Question = {
    question: string;
    options: string[];
    answer: string;
}

export type Quiz = {
    title: string;
    icon: string;
    color?: string;
    questions: Question[];
}

export const defaultQuizState: QuizState = {
    quizzes: [],
    correctAnswers: 0,
}


const QuizStateContext = createContext<QuizContextType | undefined>(undefined);

export const QuizStateProvider = ({children, value}: {children: React.ReactNode, value: QuizState}) => {
    const [quizState, setQuizState] = useState<QuizState>(value);
    return (
        <QuizStateContext.Provider value={{
            quizState,
            setQuizState
        }}>
            {children}
        </QuizStateContext.Provider>
    )
}

export const useQuizState = () => {
    
    const context = useContext(QuizStateContext)
    if (context === undefined) {
        throw new Error("useQuizState must be used within a QuizStateProvider")
    }
    return context;
};