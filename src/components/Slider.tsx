import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { ClassSlugProvider, useClassSlug } from "../context/ClassSlugContext";

// animace prolínání
const fade = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const SlideshowWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: black;
`;

const Slide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: ${(props) => (props.active ? 1 : 0)};
  transition: opacity 1.5s ease-in-out;
  animation: ${fade} 1.5s ease-in-out;
`;

const SlideLink = styled.a`
  display: block;
  width: 100%;
  height: 100%;
`;

export default function GallerySlideshow({ gallery, interval = 4000 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % gallery.length);
    }, interval);
    return () => clearInterval(timer);
  }, [gallery, interval]);

  return (
    <SlideshowWrapper>
      {gallery.map((item, i) => {
        const slideStyle = { backgroundImage: `url(${item.image})` };
        const content = <Slide style={slideStyle} active={i === index} />;

        return item.url ? (
          <SlideLink href={item.url} key={i} target="_blank" rel="noopener noreferrer">
            {content}
          </SlideLink>
        ) : (
          React.cloneElement(content, { key: i })
        );
      })}
    </SlideshowWrapper>
  );
}
