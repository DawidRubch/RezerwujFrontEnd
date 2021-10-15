import { useMutation } from "react-query";
import { saveBookTime } from "services/RezerwujApiService";

export const useSaveBookTimeMutation = () => useMutation(saveBookTime);
