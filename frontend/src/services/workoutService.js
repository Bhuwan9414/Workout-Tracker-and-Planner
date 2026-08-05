import api from "./api";

export const startWorkout = async (routineId) => {

    return await api.post(
        "/workout/startWorkout",
        {
            routineId,
        }
    );

};

export const updateWorkout = async (workoutId, data) => {

    return await api.patch(
        `/workout/${workoutId}`,
        data
    );

};

export const completeWorkout = async (workoutId) => {

    return await api.patch(
        `/workout/${workoutId}/complete`
    );

};

export const fetchWorkouts = async () => {

    return await api.get(
        "/workout/fetchWorkouts"
    );

};