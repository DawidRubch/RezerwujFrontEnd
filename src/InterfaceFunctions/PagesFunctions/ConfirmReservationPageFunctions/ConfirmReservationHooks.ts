import { useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "querystring";
import { BookTime, RestaurantOrPub } from "../../../core/Entities";

export interface InputObjectInterface {
  locationState: LocationStateInterface | undefined;
  setLocationState: React.Dispatch<
    React.SetStateAction<LocationStateInterface | undefined>
  >;
  nameInput: string | undefined;
  setNameInput: React.Dispatch<React.SetStateAction<string | undefined>>;
  surNameInput: string | undefined;
  setSurNameInput: React.Dispatch<React.SetStateAction<string | undefined>>;
  numberInput: string | undefined;
  onNumberInputChange: (phoneNumber: string) => void;
  emailInput: string | undefined;
  setEmailInput: React.Dispatch<React.SetStateAction<string | undefined>>;
  additionalInfo: string | undefined;
  setAdditionalInfo: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export interface LocationStateInterface {
  bookTime: BookTime;
  restaurantOrPub: RestaurantOrPub;
}

//Returns all useState input properties
export function useInput(state: LocationStateInterface): InputObjectInterface {
  //Input use state hooks
  const [locationState, setLocationState] = useState<
    LocationStateInterface | undefined
  >(state || undefined);
  const [nameInput, setNameInput] = useState<string | undefined>();
  const [surNameInput, setSurNameInput] = useState<string | undefined>();
  const [numberInput, setNumberInput] = useState<string | undefined>("");
  const [emailInput, setEmailInput] = useState<string | undefined>();
  const [additionalInfo, setAdditionalInfo] = useState<string | undefined>("");

  const onNumberInputChange = (phoneNumber: string) => {
    const ONLY_NUMBER_REGEX = /^\d+$/;

    if (phoneNumber.length === 0) {
      return setNumberInput("");
    }

    if (!phoneNumber.match(ONLY_NUMBER_REGEX) || phoneNumber.length > 9) {
      return;
    }

    setNumberInput(phoneNumber);
  };

  return {
    locationState,
    setLocationState,
    nameInput,
    setNameInput,
    surNameInput,
    setSurNameInput,
    numberInput,
    onNumberInputChange,
    emailInput,
    setEmailInput,
    additionalInfo,
    setAdditionalInfo,
  };
}

//Returns search queries and search passed from useLocation hook
export function useConfirmPageSearchQueriesAndState() {
  //State taken from page that redirected to this page
  //Search is the entire search query
  const { state, search }: any = useLocation();

  //Taking parameters from search query
  const { hour, minute, day, month, year, people, name } =
    queryString.parse(search);

  return { hour, minute, day, month, year, people, name, state };
}
