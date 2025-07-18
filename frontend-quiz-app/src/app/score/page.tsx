"use client"
import Image from "next/image";
import { useQuizState } from "../_components/quiz-state-provider";
import { useRouter } from "next/navigation";

export default function ScorePage() {
    const {quizState, setQuizState} = useQuizState();
    const {currentQuiz} = quizState;

    const router = useRouter();
    return (
        <div className="content-layout">
            <div className="flex flex-col">
                <div className="text-preset-2-light dark:text-white text-blue-900">Quiz completed</div>
                <div className="text-preset-2-medium dark:text-white text-blue-900">You scored...</div>
            </div>
             <div className="score-container">
                    <div className="score-subject">
                        <div className="subject-title">
                            <div className={`image-container ${currentQuiz?.color || 'bg-grey-50'}`}>
                                {currentQuiz && <Image src={currentQuiz?.icon} height={40} width={40} alt={""} />}
                            </div>
                            <div className="text-preset-4 text-blue-900 dark:text-grey-50">{currentQuiz?.title}</div>
                        </div>
                        <div className="subject-score">
                            <div className="text-preset-1 text-blue-900 dark:text-grey-50">{quizState.correctAnswers}</div>
                            <div className="text-preset-4 text-grey-500 dark:text-blue-300">out of {currentQuiz?.questions.length}</div>
                        </div>
                    </div>
                    <button className="submit-button text-preset-4" onClick={() => {
                setQuizState({...quizState, currentQuiz: undefined, correctAnswers: 0})
                router.push('/')
                }
            }>Play Again</button>
            </div>
            
        </div>
    )
}