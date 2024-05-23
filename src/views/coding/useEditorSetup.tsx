import { useState, useEffect } from "react";
import _isEmpty from "lodash/isEmpty";

export default function useEditorSetup(
  isSingleProblemView: any,
  coding: any,
  setupCodingData: any
) {
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [isCodeEnvReady, setIsCodeEnvReady] = useState(false);
  const { theme, technologies } = coding;
  const { technologiesMap } = technologies;

  useEffect(() => {
    if (theme === null) {
      setupCodingData();
    } else {
      setIsCodeEnvReady(true);
    }
  }, [theme, setupCodingData, setIsCodeEnvReady]);

  useEffect(() => {
    if (isSingleProblemView && isCodeEnvReady && !_isEmpty(technologiesMap)) {
      setIsSetupComplete(true);
    }
  }, [isSingleProblemView, isCodeEnvReady, technologiesMap]);

  return isSetupComplete;
}
