import { useMutation } from "react-query";
import { deleteBookTime } from "services/RezerwujApiService";

export const useDeleteBookTimeMutation = () => useMutation(deleteBookTime);
