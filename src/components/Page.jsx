import React, { useReducer, useEffect } from "react";
import "./Page.css";
import Output from "./Output";
import Options from "./Options";
import axios from "axios";

export const ParaContext = React.createContext(null);

const initialState = {
  loading: true,
  error: "",
  para: [],
  value: 1,
  html: "No",
  tag: "span",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { ...state, loading: false, para: action.payload };

    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        para: [],
        error: "Something went wrong :(",
      };

    case "CHANGE_NUM_PARA":
      return {
        ...state,
        value: action.payload,
      };

    case "CHANGE_TAGS":
      return {
        ...state,
        tag: action.payload,
      };

    case "CHANGE_INCLUDEHTML":
      return {
        ...state,
        html: action.payload,
      };

    default:
      return state;
  }
};

export default function Page() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    var options = {
      method: 'GET',
      url: 'https://mashape-community-skate-ipsum.p.rapidapi.com/3/1/JSON',
      headers: {
        'x-rapidapi-key': '7000476f62msh97b9973e46a24dbp161a07jsn93bd815907b5',
        'x-rapidapi-host': 'mashape-community-skate-ipsum.p.rapidapi.com'
      }
    };
    axios
      .request(options)
      .then((response) => {
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "FETCH_ERROR" });
      });
  }, [state.value]);

  return (
    <ParaContext.Provider value={{ state, dispatch }}>
      <main className="Main">
        <section className="container title">
          Random Text Generator
        </section>
        <section className="container">{<Options />}</section>
        <section className="container" style={{ textAlign: "justify" }}>
          {<Output {...state} />}
        </section>
      </main>
    </ParaContext.Provider>
  );
}
