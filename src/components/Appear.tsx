"use client";

import { useEffect, useState } from "react";

const LETTERS = "-AaBbCcDdEeFfGgHhIiJřjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789".split("");

export default function Appear({ children, delay = 0, rolls = 20, speed = 10 }) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (typeof children !== "string") return;

    let active = true;
    let timeout = setTimeout(() => {
      const target = children.split("");
      let current = "";

      const animateLetter = (index) => {
        if (index >= target.length || !active) return;

        let step = 0;

        const roll = () => {
          if (!active) return;

          // Pick letter from LETTERS by index
          const letter = LETTERS[step % LETTERS.length];
          setDisplay(current + letter);

          if (step < rolls) {
            step++;
            setTimeout(roll, speed);
          } else {
            // Lock in the correct letter
            current += target[index];
            setDisplay(current);

            // Continue with next letter
            animateLetter(index + 1);
          }
        };

        roll();
      };

      animateLetter(0);
    }, delay);

    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, [children, delay, rolls, speed]);

  return <span className="font-mono tracking-wider">{display}</span>;
}
