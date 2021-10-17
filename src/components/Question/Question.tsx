import { ChangeEvent, KeyboardEvent, useState } from "react";
import { QueryStatus } from "@reduxjs/toolkit/dist/query/react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addGuess } from "../../features/cities/cities-slice";
import { apiSlice } from "../../features/cities/cities-api-slice";

import "./Question.css";

const Question = (): JSX.Element => {
  const { index, cities: citiesToGuess } = useAppSelector(
    (state) => state.cities
  );

  // index -1 is needed becouse we increment the index when dispatch a new guess
  const { status } = useAppSelector((state) =>
    apiSlice.endpoints.fetchTempearature.select(citiesToGuess[index - 1])(state)
  );

  const [temp, setTemp] = useState<number | string>("");

  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTemp(Number(e.target.value));
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter" && temp !== "") {
      handleClick();
    }
  };

  const handleClick = () => {
    dispatch(addGuess({ city: citiesToGuess[index], value: Number(temp) }));
    setTemp("");
  };

  if (index === 5) return <></>;

  return (
    <div>
      <h1>{citiesToGuess[index]}</h1>
      <div className="form">
        <input
          className="question space"
          type="number"
          name="temp"
          id="temp"
          value={temp}
          onChange={handleChange}
          onKeyPress={handleKey}
          placeholder="Guess temperature (°C)..."
        />
        <button
          className="question button space"
          type="button"
          onClick={handleClick}
          disabled={temp === ""}
        >
          {">"}
        </button>
      </div>
      {status === QueryStatus.pending && (
        <span className="question space">Checking...</span>
      )}
    </div>
  );
};

export default Question;
