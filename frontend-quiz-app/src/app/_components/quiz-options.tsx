"use client"
import { useState } from "react";


const correctStatusIcon = <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 40 40"><path fill="#26D782" d="M20 5a15 15 0 1 1 0 30 15 15 0 0 1 0-30Zm0 2.5a12.5 12.5 0 1 0 0 25 12.5 12.5 0 0 0 0-25Zm-1.875 15.105L25.3 15.41a1.25 1.25 0 0 1 1.915 1.593l-.145.174-8.06 8.08a1.25 1.25 0 0 1-1.595.148l-.175-.145-4.375-4.375a1.25 1.25 0 0 1 1.595-1.913l.175.143 3.49 3.49Z"/></svg>;
const incorrectStatusIcon = <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 40 40"><path fill="#EE5454" d="M20 5a15 15 0 1 1 0 30 15 15 0 0 1 0-30Zm0 2.5a12.5 12.5 0 1 0 0 25 12.5 12.5 0 0 0 0-25Zm-5.402 7.415.142-.175a1.25 1.25 0 0 1 1.595-.143l.175.143L20 18.233l3.49-3.493a1.25 1.25 0 0 1 1.595-.143l.175.143a1.25 1.25 0 0 1 .142 1.595l-.142.175L21.767 20l3.493 3.49a1.25 1.25 0 0 1 .142 1.595l-.142.175a1.25 1.25 0 0 1-1.595.142l-.175-.142L20 21.767l-3.49 3.493a1.25 1.25 0 0 1-1.595.142l-.175-.142a1.25 1.25 0 0 1-.143-1.595l.143-.175L18.233 20l-3.493-3.49a1.25 1.25 0 0 1-.143-1.595Z"/></svg>;

export default function QuizOptions({options, onNextQuestion, answer, isQuizFinished}: 
    {
        options: string[], 
        onNextQuestion: (answer: string) => void, 
        answer: string,
        isQuizFinished: boolean
    }) {
    const optionLetters = ['A', 'B', 'C', 'D'];
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [didSubmit, setDidSubmit] = useState(false);

    const isSelected = (index: number) => index === selectedOption;
    const isCorrect = (index: number) => options[index] === answer;
    

    const handleStyling = (index: number, defaultStyling: string, selected: string, correct: string, incorrect: string) => {
        if(!didSubmit) {
            return isSelected(index) ? selected : defaultStyling;
        }
        else {
            if(isCorrect(index)) {
                return isSelected(index) ? correct : defaultStyling;
            }
            else {
                return isSelected(index) ? incorrect : defaultStyling;
            }
        }
    }

    const reset = () => {
        setSelectedOption(null);
        setDidSubmit(false);
    }

    return (
        <div className="quiz-options">
            {options.map((option, index) => <button
                onClick={() => !didSubmit && setSelectedOption(index)}
                className={`selection-card
                    ${handleStyling(index, 
                        '', 
                        'border-[3px] border-purple-600', 
                        'border-[3px] border-green-500', 
                        'border-[3px] border-red-500')}`} 
                key={index}>
                <div className={`image-container text-preset-4
                    ${handleStyling(
                        index,
                        'text-grey-500 dark:text-grey-500 bg-grey-50',
                        'text-grey-50 bg-purple-600',
                        'text-grey-50 bg-green-500',
                        'text-grey-50 bg-red-500'
                    )}`}>{optionLetters[index]}</div>
                <div className="text-preset-4 text-blue-900 dark:text-grey-50 grow">{option}</div>
                <div className="status-icon">
                    {didSubmit && isCorrect(index) && correctStatusIcon}
                    {didSubmit && isSelected(index) && !isCorrect(index) && incorrectStatusIcon}
                </div>
                </button>)}

            <button className="submit-button mt-3" disabled={selectedOption === null}>
                <div className="text-preset-4" onClick={() => {
                    if(selectedOption !== null) {
                        setDidSubmit(true);
                        if (isQuizFinished) {
                            onNextQuestion(options[selectedOption])
                        }
                        else if(didSubmit) {
                            reset();
                            onNextQuestion(options[selectedOption]);
                        }
                    }} }>{didSubmit ? "Next Question" : "Submit Answer"}</div>
            </button>
        </div>
    ) 
}