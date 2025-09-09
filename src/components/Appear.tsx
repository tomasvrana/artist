"use client";

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

// Znaková sada pro rolování (lze přepsat přes prop `charset`)
const LETTERS_DEFAULT = "-AaBbCcDdEeFfGgHhIiJřjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789".split("");

// Jeden znak (span) – pokud má className "glitch", vykreslí vyosený klon přes ::after
const Letter = styled.span`
  position: relative;
  display: inline-block;

  &.glitch::after {
    content: attr(data-char);
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(var(--gx, 0), var(--gy, 0));
    opacity: 0.85;
    color: white;
    pointer-events: none;
  }
`;

/**
 * Appear – split‑flap animace po znacích + náhodný glitch efekt
 *
 * Props:
 *  - delay (ms) – zpoždění spuštění celé animace
 *  - rolls – kolik "falešných" znaků se protočí před finálním znakem
 *  - speed (ms) – rychlost jednoho kroku rolování
 *  - charset – řetězec znaků, kterými se roluje (default LETTERS_DEFAULT)
 *
 *  - glitchEnabled – zap/vyp glitch
 *  - glitchMinDelay / glitchMaxDelay (ms) – náhodná pauza mezi jednotlivými glitchi
 *  - glitchMinDuration / glitchMaxDuration (ms) – jak dlouho glitch drží
 *  - glitchMaxOffset (px) – maximální vyosení klonu
 *  - glitchColors – pole barev, ze kterých se náhodně vybírá barva klonu
 *
 * Poznámka: Pokud `children` není string, komponenta jej jen vrátí beze změny
 * (fixuje to problém s prázdným výstupem při vnoření jiných elementů).
 */
export default function Appear({
  children,
  delay = 0,
  rolls = 15,
  speed = 50,
  charset = LETTERS_DEFAULT,
  glitchEnabled = true,
  glitchMinDelay = 500,
  glitchMaxDelay = 3000,
  glitchMinDuration = 80,
  glitchMaxDuration = 200,
  glitchMaxOffset = 3, // px
  glitchColors = ["#f0f", "#0ff", "#fff"],
  className,
}) {
  const [display, setDisplay] = useState("");
  const [glitchOn, setGlitchOn] = useState([]); // pole indexů s aktivním glitchem
  const [offsets, setOffsets] = useState({}); // { [index]: { gx, gy, gc } }

  // Ref na aktuální délku zobrazeného textu (aby glitch znal rozsah i uprostřed animace)
  const lenRef = useRef(0);
  useEffect(() => {
    lenRef.current = display.length;
  }, [display]);

  // Split‑flap animace po znacích (sekvenčně)
  useEffect(() => {
    if (typeof children !== "string") return; // neanimovat nestrukturovaný obsah

    let cancelled = false;
    const timers = new Set();
    const sleep = (ms) =>
      new Promise((res) => {
        const t = setTimeout(res, ms);
        timers.add(t);
      });

    const run = async () => {
      await sleep(delay);
      const target = children.split("");
      let current = "";

      for (let i = 0; i < target.length && !cancelled; i++) {
        const goal = target[i];

        // mezery (a podobné) neprotáčíme
        if (goal === " ") {
          current += " ";
          setDisplay(current);
          continue;
        }

        // protočení přes LETTERS
        for (let step = 0; step < rolls && !cancelled; step++) {
          const ch = charset[step % charset.length];
          setDisplay(current + ch);
          await sleep(speed);
        }

        // uzamkni správný znak a pokračuj na další
        current += goal;
        setDisplay(current);
      }
    };

    run();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [children, delay, rolls, speed, charset]);

  // Náhodný glitch loop
  useEffect(() => {
    if (!glitchEnabled) return;

    let cancelled = false;
    const timers = new Set();
    const sleep = (ms) =>
      new Promise((res) => {
        const t = setTimeout(res, ms);
        timers.add(t);
      });

    const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const randomFloat = (min, max) => Math.random() * (max - min) + min;

    const loop = async () => {
      while (!cancelled) {
        const wait = randomInt(glitchMinDelay, glitchMaxDelay);
        await sleep(wait);
        if (cancelled) break;

        const maxIndex = lenRef.current - 1;
        if (maxIndex < 0) continue;

        const index = randomInt(0, maxIndex);

        // vynecháme glitch na mezerách
        if (display[index] === " ") continue;

        const gx = randomFloat(-glitchMaxOffset, glitchMaxOffset);
        const gy = randomFloat(-glitchMaxOffset, glitchMaxOffset);
        const gc = glitchColors[Math.floor(Math.random() * glitchColors.length)];

        setOffsets((prev) => ({ ...prev, [index]: { gx, gy, gc } }));
        setGlitchOn((prev) => (prev.includes(index) ? prev : [...prev, index]));

        const dur = randomInt(glitchMinDuration, glitchMaxDuration);
        await sleep(dur);
        if (cancelled) break;

        setGlitchOn((prev) => prev.filter((i) => i !== index));
      }
    };

    loop();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [
    glitchEnabled,
    glitchMinDelay,
    glitchMaxDelay,
    glitchMinDuration,
    glitchMaxDuration,
    glitchMaxOffset,
    glitchColors,
    display, // kvůli čtení aktuálního znaku na indexu
  ]);

  // Pokud children není string, vrať obsah beze změny – tím se opravuje problém s "prázdnem".
  if (typeof children !== "string") {
    return <span className={className}>{children}</span>;
  }

  // Vykreslení po znacích, s případným .glitch
  return (
    <span className={className}>
      {display.split("").map((ch, i) => {
        const isGlitch = glitchEnabled && glitchOn.includes(i) && ch !== " ";
        const vars = offsets[i] || { gx: 0, gy: 0, gc: "#f0f" };
        return (
          <Letter
            key={i}
            data-char={ch}
            className={isGlitch ? "glitch" : ""}
            style={{
              // CSS proměnné pro vyosení a barvu klonu
              "--gx": `${vars.gx}px`,
              "--gy": `${vars.gy}px`,
              "--gc": vars.gc,
            }}
          >
            {ch}
          </Letter>
        );
      })}
    </span>
  );
}
