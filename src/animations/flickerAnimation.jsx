import { useEffect, useState } from "react";
import "../css/sentinelLogo.css";
import { ASCII_ART } from "./asciiArtList";

export default function FlickerAnimation({
  asciiArt = "",
  className = "",
  minReveal = 0.5,
  flickerDuration = 1500, 
  flickerRate = 150       
}) {
  const art = ASCII_ART[asciiArt];
  const lines = art.split("\n");

  const [visibleLines, setVisibleLines] = useState(lines.length);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const start = Date.now();

    const loop = setInterval(() => {
      const elapsed = Date.now() - start;

      if (elapsed >= flickerDuration) {
        clearInterval(loop);
        setVisibleLines(lines.length);
        setOpacity(1);
        return;
      }

      const minLines = Math.floor(lines.length * minReveal);
      const maxLines = lines.length;

      setVisibleLines(Math.floor(Math.random() * (maxLines - minLines)) + minLines);

      setOpacity(Math.random());
    }, flickerRate);

    return () => clearInterval(loop);
  }, [art, minReveal, flickerDuration, flickerRate, lines.length]);

  return (
    <pre className={className} style={{ opacity }}>
      {lines.slice(0, visibleLines).join("\n")}
    </pre>
  );
}
