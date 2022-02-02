import "./SearchInput.scss";
import { ReactComponent as SearchIcon } from "images/search.svg";
import { FC } from "react";

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const SearchInput: FC<Props> = ({ onChange, value }) => {
  return (
    <div className="search-input">
      <SearchIcon className="search-input__icon" />
      <input
        value={value}
        onChange={onChange}
        placeholder="Wyszukaj restauracje lub pub"
        className="search-input__input"
      />
    </div>
  );
};
