// Animation template for typing lines onto screen.
// This file can be imported to other pages that require animating lines of text.
// text variable refers to the set of sentences used, it should be referemned from consoleTextList.js
// CSS will need to be created by oneself for more specific details of the respective art involved
import { useEffect, useState } from "react";
import { CONSOLE_TEXT } from "./consoleTextList" 
import "../css/shortOverviewText.css"

export default function ConsoleTypingAnimation (
    {
        text = "",
        className = "",
        delay = 60,
        cursor = true,
    }) {
    const consoleText = CONSOLE_TEXT[text];

    if (!consoleText){
      console.warn(`Console Text -> "${text}" does not exist!`);
      return null;
    }

    const [index, setIndex] = useState(0);

    useEffect(() => {
        setIndex(0);

        const id = setInterval(() => {
            setIndex((i) => Math.min(i + 1, consoleText.length));
        }, delay);
        
    return () => clearInterval(id);
  }, [consoleText, delay]);

    return (
        <pre className={className}>
            {consoleText.slice(0, index)}
            {cursor && index < consoleText.length && "█"}
            {index === consoleText.length && cursor && <span className = "cursorBlinker">█</span>} 
        </pre>
    );
}
