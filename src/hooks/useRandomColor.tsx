import { useState } from "react";

const useRandomColor = () => {
    
    const colors: string[] = [
        'red',
        'blue',
        'green',
        'yellow',
        'pink',
    ];

    const [randomColor, setRandomColor] = useState<string>('');

    const getRandomColor = (): string => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }

    return { randomColor, setRandomColor, getRandomColor };
}

export default useRandomColor;