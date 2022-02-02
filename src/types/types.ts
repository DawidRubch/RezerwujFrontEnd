import { BookTime, DayOfTheWeekOpenHours } from "core";
import { GroupTypeBase } from "react-select";

export type EnviromentType = "test" | "prod" | undefined;
export type SearchQParam = string | string[];
export type OptionType = { label: string; icon: JSX.Element; value: string };
export type OptionsArray = readonly (OptionType | GroupTypeBase<OptionType>)[];
export type BookTime = ReturnType<typeof BookTime>;
export type DayOfTheWeekOpenHours = ReturnType<typeof DayOfTheWeekOpenHours>;
