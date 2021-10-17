import { Guess } from "../../models/interfaces";

import { useAppSelector } from "../../app/hooks";

import Answer from "../Answer/Answer";

import "./Answers.css";

const Answers = (): JSX.Element => {
  const { guesses } = useAppSelector((state) => state.cities);

  return (
    <div className="container">
      {guesses.map((guess: Guess, i: number) => {
        return <Answer key={i} guess={guess} />;
      })}
    </div>
  );
};

export default Answers;
