"use client"
import Image from "next/image";
import { useQuizState } from "./quiz-state-provider";
import { useRouter } from "next/navigation";

export const colorVariants = [
    'bg-orange-50',
     'bg-green-50',
    'bg-blue-50',
    'bg-purple-50',
]


export default function SelectionCards () {
    const {quizState, setQuizState} = useQuizState();
    const {quizzes} = quizState;
    const router = useRouter();
    
    return (
        <div className="selection-card-layout">
            {quizzes.map((quiz, index) => 
                <div key={index} className="selection-card" onClick={() => {
                    setQuizState({...quizState, currentQuiz: quiz})
                    router.push('/quiz');
                    }}>
                    <div className={`image-container ${quiz.color}`} >
                        <Image src={quiz.icon} alt={quiz.title}  width={40} height={40}/>
                    </div>
                    <div className="text-preset-4 text-blue-900 dark:text-grey-50">{quiz.title}</div>
                </div>
            )}
        </div>
    )
}