"use client"

import { useEffect, useState } from "react";
import QuizOptions from "./quiz-options";
import { Progress } from "@/components/ui/progress";
import { useQuizState } from "./quiz-state-provider";
import { useRouter } from "next/navigation";


export default function QuizComponent() {
    const {quizState, setQuizState} = useQuizState();
    const {currentQuiz} = quizState;
    const questions = currentQuiz?.questions || [];
    const totalQuestions = questions.length || 0;

    const [progress, setProgress] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isQuizFinished, setIsQuizFinished] = useState(false);

    const router = useRouter();
    console.log(quizState)
    useEffect(() => {
        if( currentQuestion + 1 === totalQuestions) {
            setIsQuizFinished(true);
        }
    }, [totalQuestions, currentQuestion])

    useEffect(() => {
        setProgress(((currentQuestion + 1) / totalQuestions) * 100);
    }, [totalQuestions, currentQuestion])

    const handleNextQuestion = (selectedAnswer: string) => {
        if (!isQuizFinished) {
            setQuizState({...quizState, 
                correctAnswers: selectedAnswer === questions[currentQuestion].answer ? quizState.correctAnswers + 1 : quizState.correctAnswers})
            console.log(quizState.correctAnswers)
            setCurrentQuestion(currentQuestion + 1);
        } else {
            router.push('/score');
        }
    }

    if (!currentQuiz || questions.length === 0) {
        return <div>Loading Quiz..</div>
    }
    
    return ( 
    <div className="quiz-layout">
        <div className="question-container">
            <div className="text-preset-5-italic text-grey-500 dark:text-blue-300">
                {`Question ${currentQuestion + 1} of ${totalQuestions}`}
            </div>
            <div className="text-preset-3 text-blue-900 dark:text-grey-50">
                {questions[currentQuestion].question}
            </div>
            <Progress className="lg:mt-23" value={progress}/>
        </div>

        <QuizOptions options={questions[currentQuestion].options} 
        answer={questions[currentQuestion].answer} 
        onNextQuestion={handleNextQuestion}
        isQuizFinished={isQuizFinished}/>
    </div>)
}