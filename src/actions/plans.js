import { apiAdmin } from '../config';

export const getPlans = async () => {
  const response = await apiAdmin.get('planapi');
  console.log("categories......", response.data)
  return response.data.data;
};

export const getAllPlanTasks = async () => {
  const response = await apiAdmin.get('PlanVersionapi');
  console.log("Plan tasks ......", response.data)
  return response.data.data;
};

export const getPlanTasks = async (id) => {
  const response = await apiAdmin.get('/showJoinedPlanData/' + id);
  return response.data.data;
};

export const getExercisesArray = async (id) => {
  const response = await apiAdmin.get('/cardapi/' + id);
  return response.data.data;
};

// TODO: this data structure is a prime place to start cleaning up data structure
export const getExerciseData = async (card_id, exercise_id) => {
  try {
    const response = await apiAdmin.get(`/cardapi/${card_id}/exercise/${exercise_id}`);
    console.log('GET EXERCISE DATA NEW', response);
    return response.data.data;
  } catch (e) {
    console.log('get exercise data', e);
    return;
  }
}
