import { useEffect, useState } from "react";
// Animation template for line by line reveal onto screen.
// This file can be imported to other pages that require animating ascii art.
// art variable refers to the ascii art, it should be filled on the respective page where this animation is used.
// CSS will need to be created by oneself for more specific details
export default function IterativeLineAnimation (
    {
        art,
        className = "",
        speed = 80,
    }) {
    const lines = art.split("\n");
    const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => Math.min(c + 1, lines.length));
    }, speed);

    return () => clearInterval(id);
  }, [art, lines.length, speed]);

    return (
        <pre className={className}>
            {lines.slice(0, count).join("\n")}
        </pre>
    );
}
