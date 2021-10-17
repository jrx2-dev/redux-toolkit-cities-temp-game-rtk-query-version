export interface Guess {
  city: string;
  value: number;
}

export interface Result {
  city: string;
  value: number;
  temperature: number;
  result: boolean;
}

interface TempApiResult {
  main: {
    temp: number;
  };
}

export interface TempApiResponse {
  list: TempApiResult[];
}
