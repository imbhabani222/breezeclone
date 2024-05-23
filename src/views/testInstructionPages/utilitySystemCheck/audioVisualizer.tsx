import React, { useEffect } from "react";

import styles from "../doSelectSystemCheck/systemCheck.module.scss";

import constants from "../../../constants/instructionConstant";
declare global {
  interface Window {
    persistAudioStream: any;
  }
}
const {
  VISUALIZER: {
    CREATEELEMENTNS,
    MAIN_VISUAL_DIV,
    PATH,
    VISUALIZER_ID,
    MASK,
    VIEWBOX,
    STROKE_DASH,
    MASKGROUP,
    GRADIENT,
    MASK_CLR,
    FILL,
    WIDTH_HEIGHT,
  },
} = constants;
const AudioVisualizer = () => {
  const visualize = async () => {
    let mainVisualDiv: any = document.getElementById(MAIN_VISUAL_DIV);
    var paths = mainVisualDiv.getElementsByTagName(PATH);
    var visualizer: any = document.getElementById(VISUALIZER_ID);
    var mask = visualizer.getElementById(MASK);
    var path;
    var soundAllowed = function (stream: any) {
      window.persistAudioStream = stream;
      var audioContent = new AudioContext();
      var audioStream = audioContent.createMediaStreamSource(stream);
      var analyser = audioContent.createAnalyser();
      audioStream.connect(analyser);
      analyser.fftSize = 1024;

      var frequencyArray = new Uint8Array(analyser.frequencyBinCount);
      visualizer.setAttribute(VIEWBOX, "0 0 255 255");
      for (var i = 0; i < 255; i++) {
        path = document.createElementNS(CREATEELEMENTNS, PATH);
        path.setAttribute(STROKE_DASH, "4,1");
        mask.appendChild(path);
      }
      var doDraw = function () {
        requestAnimationFrame(doDraw);
        analyser.getByteFrequencyData(frequencyArray);
        var adjustedLength;
        for (var i = 0; i < 255; i++) {
          adjustedLength =
            Math.floor(frequencyArray[i]) - (Math.floor(frequencyArray[i]) % 5);
          paths[i].setAttribute("d", "M " + i + ",255 l 0,-" + adjustedLength);
        }
      };
      doDraw();
    };

    var soundNotAllowed = function (error: Error) {};
    try {
      let navigator: any;
      navigator = window.navigator;
      await navigator.getUserMedia(
        { audio: true },
        soundAllowed,
        soundNotAllowed
      );
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    visualize();
  }, []);
  return (
    <div className={styles.visualizer_main_div}>
      <div className={styles.visualizer} id={MAIN_VISUAL_DIV}>
        <svg id={VISUALIZER_ID}>
          <defs>
            <mask id={MASK}>
              <g id={MASKGROUP}></g>
            </mask>
            <linearGradient id={GRADIENT}>
              <stop className={styles.stop} />
            </linearGradient>
          </defs>
          <rect
            width={WIDTH_HEIGHT}
            height={WIDTH_HEIGHT}
            fill={FILL}
            mask={MASK_CLR}
          ></rect>
        </svg>
      </div>
    </div>
  );
};
export default React.memo(AudioVisualizer);
