import React, { useContext } from "react";
import { ParaContext } from "./Page";

export default function Output() {
  const { state } = useContext(ParaContext);
  let para;
  if (state.html === "Yes") {
    para = state.para.map((p) => `<${state.tag}> ${p} </${state.tag}>`);
  } else {
    para = state.para.map((p) => `${p}`);
  }

  return (
    <div>
      {state.loading ? (
        <div style={{ textAlign: "center", fontSize: "3rem" }}>
          Loading .....
        </div>
      ) : (
        <span>{para}</span>
      )}
      {state.error ? (
        <div style={{ textAlign: "center", fontSize: "3rem" }}>
          {state.error}
        </div>
      ) : null}
    </div>
  );
}
