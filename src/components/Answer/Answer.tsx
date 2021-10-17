import { FC, useState, useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { useFetchTempearatureQuery } from "../../features/cities/cities-api-slice";
import { addResult } from "../../features/cities/cities-slice";
import { checkResult } from "../../helpers/resultHelper";

import { Guess, Result } from "../../models/interfaces";

import "./Answer.css";

interface AnswerProps {
  guess: Guess;
}

const Answer: FC<AnswerProps> = (props): JSX.Element => {
  const { guess } = props;

  const { data, isFetching, isSuccess } = useFetchTempearatureQuery(
    guess.city
  );

  const [result, setResult] = useState<Result>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data && isSuccess && !isFetching) {
      const currentTemp = data.list[0].main.temp;
      const res: Result = {
        ...guess,
        temperature: currentTemp,
        result: checkResult(guess.value, currentTemp),
      };
      setResult(res);
      dispatch(addResult(res));
    }
  }, [data, isFetching, isSuccess]);

  if (!result) return <></>;

  return (
    <div className={`answer ${result.result ? "ok" : "bad"}`}>
      <h3>{`tried ${result.value} °C`}</h3>
      <p>{`was ${result.temperature} °C`}</p>
    </div>
  );
};

export default Answer;
