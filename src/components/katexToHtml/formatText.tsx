import { useEffect, useRef } from "react";
import hljs from "highlight.js";

import katex from "katex";
import renderMathInElement from "katex/dist/contrib/auto-render";

import style from "./katexStyles.module.scss";
import "highlight.js/styles/atom-one-dark.css";
import clsx from "clsx";

window.katex = katex;

const FormatText = ({ data, question }: any) => {
  const katexText: any = useRef(null);
  useEffect(() => {
    if (katexText && katexText.current) {
      renderMathInElement(katexText.current, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "\\(", right: "\\)", display: false },
          {
            left: "\\begin{equation}",
            right: "\\end{equation}",
            display: true,
          },
          { left: "\\begin{align}", right: "\\end{align}", display: true },
          { left: "\\begin{alignat}", right: "\\end{alignat}", display: true },
          { left: "\\begin{gather}", right: "\\end{gather}", display: true },
          { left: "\\begin{CD}", right: "\\end{CD}", display: true },
          { left: "\\[", right: "\\]", display: true },
        ],
        output: "mathml",
        throwOnError: false,
      });
    }
  }, [katexText]);
  useEffect(() => {
    if (katexText.current) {
      const blocks = katexText.current.querySelectorAll("pre");
      blocks.forEach((block: any) => {
        hljs.highlightElement(block);
      });
    }
  }, [data]);

  return (
    <p
      ref={katexText}
      className={clsx({
        [style.textClass]: true,
        [style.blockClass]: data.includes("<!--block-->"),
      })}
      dangerouslySetInnerHTML={{ __html: data }}
    ></p>
  );
};

export default FormatText;
