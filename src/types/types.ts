import { GroupTypeBase } from "react-select";

export type EnviromentType = "test" | "prod" | undefined;
export type SearchQParam = string | string[];
export type OptionType = { label: string; icon: JSX.Element; value: string };
export type OptionsArray = readonly (OptionType | GroupTypeBase<OptionType>)[];
export type BookTime = {
  minute: number;
  hour: number;
  day: number;
  month: number;
  year: number;
  people: number;
};
