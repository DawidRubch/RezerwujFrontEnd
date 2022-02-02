import Select, { GroupTypeBase, Styles } from "react-select";
import { OptionType } from "types";
import { ReactComponent as PersonIcon } from "images/place.svg";
import { useLocalStorage } from "hooks";

const szczecinLocation: OptionType = {
  label: "Szczecin",
  value: "Szczecin",
  icon: <PersonIcon />,
};

export const LocationPicker = () => {
  const { setValue } = useLocalStorage({
    key: "@city",
    initialValue: "Szczecin",
  });

  const onValueChange = (value: OptionType | null) =>
    setValue(JSON.stringify(value?.value));

  return (
    <Select
      isSearchable={false}
      options={optionsArray}
      defaultValue={szczecinLocation}
      styles={styles}
      components={{
        SingleValue: customSingleValueComponent,
      }}
      onChange={onValueChange}
    />
  );
};
const customSingleValueComponent = ({ data }: any) => (
  <div className="people-hour__singleVal">
    <div className="people-hour__singleVal__content">
      {data.icon && (
        <span className="people-hour__singleVal__content__icon">
          {data.icon}
        </span>
      )}
      <span className="people-hour__singleVal__content__label">
        {data.label}
      </span>
    </div>
  </div>
);

const optionsArray = [szczecinLocation];

const styles: Partial<Styles<OptionType, false, GroupTypeBase<OptionType>>> = {
  control: (styles) => ({
    ...styles,
    height: "50px",
    border: "none",
    borderRadius: "8px",
    boxShadow:
      "0 12px 16px 0 rgb(0 0 0 / 24%), 0 17px 50px 0 rgb(0 0 0 / 19%);",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "lightgray",
    },
  }),
  indicatorsContainer: (styles) => ({
    ...styles,
    display: "none",
  }),
};
