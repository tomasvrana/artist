"use client";

import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const glitchShift = keyframes`
  0% { transform: translate(0, 0); }
  20% { transform: translate(-2px, 1px); }
  40% { transform: translate(2px, -1px); }
  60% { transform: translate(-1px, -2px); }
  80% { transform: translate(1px, 2px); }
  100% { transform: translate(0, 0); }
`;

const Letter = styled.span`
  position: relative;
  display: inline-block;

  &.glitch::after {
    content: attr(data-char);
    position: absolute;
    left: 0;
    top: 0;
    color: #f0f;
    animation: ${glitchShift} 120ms steps(1) infinite;
    transform: translate(
      ${() => Math.floor(Math.random() * 6) - 3}px,
      ${() => Math.floor(Math.random() * 6) - 3}px
    );
    opacity: 0.8;
  }
`;

export default function GlitchText({
  children,
  minDelay = 500,
  maxDelay = 3000,
  minDuration = 100,
  maxDuration = 500,
}) {
  const [glitches, setGlitches] = useState([]);

  useEffect(() => {
    if (typeof children !== "string") return;

    let active = true;

    const triggerGlitch = () => {
      if (!active) return;
      const length = children.length;
      const index = Math.floor(Math.random() * length);

      setGlitches((prev) => [...prev, index]);

      const duration =
        Math.floor(Math.random() * (maxDuration - minDuration)) + minDuration;

      setTimeout(() => {
        setGlitches((prev) => prev.filter((i) => i !== index));
      }, duration);

      const nextDelay =
        Math.floor(Math.random() * (maxDelay - minDelay)) + minDelay;

      setTimeout(triggerGlitch, nextDelay);
    };

    triggerGlitch();

    return () => {
      active = false;
    };
  }, [children, minDelay, maxDelay, minDuration, maxDuration]);

  if (typeof children !== "string") return children;

  return (
    <span>
      {children.split("").map((char, i) => (
        <Letter
          key={i}
          data-char={char}
          className={glitches.includes(i) ? "glitch" : ""}
        >
          {char}
        </Letter>
      ))}
    </span>
  );
}
