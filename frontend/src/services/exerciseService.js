import api from "./api";

export const fetchExercises = async () => {
    return await api.get("/exercise/fetchExercises");
};