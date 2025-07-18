"use client"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";
import { useQuizState } from "./quiz-state-provider";

interface IconProps {
    mode?: string;
}

const SunImage = (props: IconProps) => {
return (<svg className={!props.mode || props.mode === 'light' ? 'text-grey-500' : 'text-white'} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path fill="currentColor" d="M12 1.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 1 1-1.5 0v-1.5A.75.75 0 0 1 12 1.5Zm0 15a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0-1.5a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm9.75-2.25a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 1 0 0 1.5h1.5ZM12 19.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 1 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75Zm-8.25-6.75a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 1 0 0 1.5h1.5Zm.969-8.031a.75.75 0 0 1 1.062 0l1.5 1.5a.751.751 0 0 1-1.062 1.062l-1.5-1.5a.75.75 0 0 1 0-1.062Zm1.062 14.562a.75.75 0 1 1-1.062-1.06l1.5-1.5a.75.75 0 1 1 1.062 1.06l-1.5 1.5Zm13.5-14.562a.75.75 0 0 0-1.062 0l-1.5 1.5a.751.751 0 0 0 1.062 1.062l1.5-1.5a.75.75 0 0 0 0-1.062Zm-1.062 14.562a.75.75 0 0 0 1.062-1.06l-1.5-1.5a.75.75 0 0 0-1.062 1.06l1.5 1.5Z"/>
    </svg>)}

const MoonImage = (props: IconProps) => {
    return (<svg className={!props.mode || props.mode === 'light' ? 'text-grey-500' : 'text-white'} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path fill="currentColor" d="M11.775 4.522A7.5 7.5 0 1 1 4.898 16.09c2.104-.57 4.974-1.953 6.24-5.326.828-2.211.876-4.408.637-6.241ZM20.184 12a8.997 8.997 0 0 0-9.315-8.994.75.75 0 0 0-.713.888c.345 1.821.42 4.092-.424 6.342-1.2 3.201-4.203 4.26-6.115 4.606a.75.75 0 0 0-.542 1.066A9 9 0 0 0 20.184 12Z"/></svg>)
}

export default function Header() {
    const {setTheme, resolvedTheme} = useTheme();
    const [mounted, setMounted] = React.useState(false);
    const {quizState} = useQuizState();

    const {currentQuiz} = quizState;
    
    const isDarkMode = resolvedTheme === 'dark';

    const toggleTheme = () => {
        setTheme(isDarkMode ? 'light' : 'dark');
    }

    React.useEffect(() => {
        setMounted(true);
    }, [])

    if (!mounted) {
       return <div className="top-header-layout h-[40px]"></div>
    }

    console.log(resolvedTheme)

    return (
        <div className="top-header-layout">
            <div className="top-header-title">
                {currentQuiz && (
                    <>
                        <div className={`image-container ${currentQuiz.color || 'bg-grey-50'}`}>
                            <Image src={`${currentQuiz.icon}`} alt="Quiz Icon" width={40} height={40} />
                        </div>
                        <div className="text-preset-4 text-blue-900 dark:text-grey-50">{currentQuiz.title}</div>
                    </>
                )}
            </div>
            <div className="mode-switch-container">
                <SunImage mode={resolvedTheme}/>
                <Switch
                    checked={isDarkMode}
                    onCheckedChange={toggleTheme}
                    aria-label="Toggle dark mode"
                />
                <MoonImage mode={resolvedTheme}/>
            </div>
        </div>
    )
}