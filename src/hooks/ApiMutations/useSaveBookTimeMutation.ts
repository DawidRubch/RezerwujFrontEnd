import { useMutation } from "react-query";
import { saveBookTime } from "services";

export const useSaveBookTimeMutation = () => useMutation(saveBookTime);
