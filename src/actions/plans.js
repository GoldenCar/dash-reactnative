import {apiAdmin} from '../config';

export const getPlans = async () => {
  const response = await apiAdmin.get('planapi');
  console.log("categories......", response.data)
  return response.data.data;
};
