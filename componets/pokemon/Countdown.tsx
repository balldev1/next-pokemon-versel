import {useEffect, useState} from "react";

export const Countdown = () => {

    const targetDate = new Date("2025-03-20T00:00:00").getTime();

    const calculateTimeLeft = () => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    // ฟังก์ชันช่วยให้ค่าที่เป็น null/undefined กลายเป็น "00"
    const formatTime = (value: number | undefined | null) => {
        return value !== undefined && value !== null ? String(value).padStart(2, "0") : "00";
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
            <div className="grid grid-flow-col gap-2 text-center auto-cols-max z-10 ">
                <div
                    className="flex flex-col items-center justify-center p-2 w-14 bg-accent rounded-sm shadow-sm shadow-gray-400 text-neutral-content">
                <span className="countdown font-mono text-2xl">
                    <span style={{"--value": timeLeft.days} as React.CSSProperties}>{timeLeft.days}</span>
                </span>
                    <span className="text-sm">days</span>
                </div>
                <div
                    className="flex flex-col items-center justify-center p-2 w-14 bg-accent rounded-sm shadow-sm shadow-gray-400 text-neutral-content">
                <span className="countdown font-mono text-2xl">
                    <span style={{"--value": timeLeft.hours} as React.CSSProperties}>{timeLeft.hours}</span>
                </span>
                    <span className="text-sm">hours</span>
                </div>
                <div
                    className="flex flex-col items-center justify-center p-2 w-14 bg-accent rounded-sm shadow-sm shadow-gray-400 text-neutral-content">
                <span className="countdown font-mono text-2xl">
                    <span style={{"--value": timeLeft.minutes} as React.CSSProperties}>{timeLeft.minutes}</span>
                </span>
                    <span className="text-sm">min</span>
                </div>
                <div
                    className="flex flex-col items-center justify-center p-2 w-14 bg-accent rounded-sm shadow-sm shadow-gray-400 text-neutral-content">
                <span className="countdown font-mono text-2xl">
                    <span style={{"--value": timeLeft.seconds} as React.CSSProperties}>{timeLeft.seconds}</span>
                </span>
                    <span className="text-sm">sec</span>
                </div>
            </div>
    )
}