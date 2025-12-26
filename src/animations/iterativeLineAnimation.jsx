// Animation template for line by line reveal onto screen.
// This file can be imported to other pages that require animating ascii art.
// asciiArt variable refers to the ascii art, it should be referenced from asciiArtList.js
// CSS will need to be created by oneself for more specific details of the respective art involved
import { useEffect, useState } from "react";
import { ASCII_ART } from "./asciiArtList";
import "../css/sentinelLogo.css";
export default function IterativeLineAnimation (
    {
        asciiArt = "",
        className = "",
        delay = 50,
    }) {
    const art = ASCII_ART[asciiArt];

    if (!art){
      console.warn(`ASCII ART -> "${asciiArt}" does not exist!`);
      return null;
    }

    const lines = art.trimEnd().split("\n");
    const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => Math.min(c + 1, lines.length));
    }, delay);

    return () => clearInterval(id);
  }, [art, lines.length, delay]);

    return (
        <pre className={className}>
            {lines.slice(0, count).join("\n")}
        </pre>
    );
}
