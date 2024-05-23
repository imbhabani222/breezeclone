import React, { useEffect, useRef } from "react";

export default function DisableCopyPaste(props: any) {
  let disableCopyPaste = useRef<any>(null);
  useEffect(() => {
    // disableCopyPaste.current.addEventListener(
    //   "contextmenu",
    //   (evt: any) => {
    //     evt.preventDefault();
    //   },
    //   false
    // );
    disableCopyPaste.current.addEventListener(
      "copy",
      (evt: any) => {
        evt.clipboardData.setData("text/plain", "");
        evt.preventDefault();
      },
      false
    );
    disableCopyPaste.current.addEventListener(
      "drop",
      (evt: any) => {
        evt.preventDefault();
      },
      false
    );
  }, []);

  return (
    <>
      <div ref={disableCopyPaste}> {props.children}</div>
    </>
  );
}
