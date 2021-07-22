import React, { useContext } from "react";
import "./Options.css";
import { ParaContext } from "./Page";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function Options() {
  const { state, dispatch } = useContext(ParaContext);
  const handleParaChange = (e) => {
    console.log(e.target.value);
    setTimeout(() => {
      dispatch({ type: "CHANGE_NUM_PARA", payload: e.target.value });
    }, 500);
  };
  const handleTagChange = (e) => {
    console.log(e.target.value);
    dispatch({ type: "CHANGE_TAGS", payload: e.target.value });
  };
  const handleHTMLChange = (e) => {
    console.log(e.target.value);
    dispatch({ type: "CHANGE_INCLUDEHTML", payload: e.target.value });
  };

  return (
    <article className="flex">
      <div className="inner_flex">
        <div className="options">
          <label htmlFor="value">Paragraphs :</label>
          <input
            type="number"
            id="value"
            name="value"
            min="1"
            max="30"
            step="1"
            onChange={handleParaChange}
            defaultValue={state.value}
          />
        </div>
        <div className="options">
          <label htmlFor="tag">HTML Tags:</label>
          <select
            name="tag"
            id="tag"
            onChange={handleTagChange}
            defaultValue={state.tag}
          >
            <option value="h1">&lt;h1&gt;</option>
            <option value="h2">&lt;h2&gt;</option>
            <option value="h3">&lt;h3&gt;</option>
            <option value="h4">&lt;h4&gt;</option>
            <option value="h5">&lt;h5&gt;</option>
            <option value="h6">&lt;h6&gt;</option>
            <option value="span">&lt;span&gt;</option>
            <option value="p">&lt;p&gt;</option>
          </select>
        </div>
        <div className="options">
          <label htmlFor="html">Include HTML? :</label>
          <select
            name="html"
            id="html"
            onChange={handleHTMLChange}
            defaultValue={state.html}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>
      <div className="options">
        <label>Copy to Clipboard</label>
        <CopyToClipboard
          text={state.para.map((p) =>
            state.html === "Yes"
              ? `<${state.tag}> ${p} </${state.tag}>`
              : `${p}`
          )}
          onCopy={() => alert("Copied! :)")}
        >
          <button>Copy to clipboard</button>
        </CopyToClipboard>
      </div>
    </article>
  );
}
