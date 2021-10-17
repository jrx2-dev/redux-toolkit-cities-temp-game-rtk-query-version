import { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { resetGame } from "../../features/cities/cities-slice";

import "./Result.css";

const Result = (): JSX.Element => {
  const { results } = useAppSelector((state) => state.cities);

  const dispatch = useAppDispatch();

  const [win, setWin] = useState<boolean>();

  useEffect(() => {
    if (results.length === 5) {
      if (results.filter((r) => r.result === true).length >= 3) {
        setWin(true);
      } else {
        setWin(false);
      }
    } else {
      setWin(undefined);
    }
  }, [results]);

  if (win === undefined) return <></>;

  return (
    <>
      <h1>{win ? "You win!!!" : "...you lose :("}</h1>
      <div className="reset">
        <button className="replay" onClick={() => dispatch(resetGame())}>
          Play again!
        </button>
      </div>
    </>
  );
};

export default Result;
