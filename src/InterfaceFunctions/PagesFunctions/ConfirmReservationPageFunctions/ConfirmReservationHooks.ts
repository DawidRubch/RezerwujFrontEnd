import { useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "querystring";

//Returns all useState input properties
export function useInput(state: any) {
  //Input use state hooks
  const [locationState, setLocationState] = useState(state || undefined);
  const [nameInput, setNameInput] = useState<string | undefined>();
  const [surNameInput, setSurNameInput] = useState<string | undefined>();
  const [numberInput, setNumberInput] = useState<string | undefined>("");
  const [emailInput, setEmailInput] = useState<string | undefined>();

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
