import api from "./api";

// Fetch all routines
export const getAllRoutines = async () => {
    return await api.get("/routine/getRoutines");
};

// Fetch single routine
export const getRoutineById = async (routineId) => {
    return await api.get(`/routine/${routineId}`);
};

export const createRoutine = async (data) => {
    const response = await api.post(
        "/routine/createRoutine",
        data
    );

    return response;
};

// Update routine
export const updateRoutine = async (routineId, data) => {
    return await api.put(`/routine/${routineId}`, data);
};

// Delete routine
export const deleteRoutine = async (routineId) => {
    return await api.delete(`/routine/${routineId}`);
};