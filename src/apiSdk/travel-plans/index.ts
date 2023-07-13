import axios from 'axios';
import queryString from 'query-string';
import { TravelPlanInterface, TravelPlanGetQueryInterface } from 'interfaces/travel-plan';
import { GetQueryInterface } from '../../interfaces';

export const getTravelPlans = async (query?: TravelPlanGetQueryInterface) => {
  const response = await axios.get(`/api/travel-plans${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTravelPlan = async (travelPlan: TravelPlanInterface) => {
  const response = await axios.post('/api/travel-plans', travelPlan);
  return response.data;
};

export const updateTravelPlanById = async (id: string, travelPlan: TravelPlanInterface) => {
  const response = await axios.put(`/api/travel-plans/${id}`, travelPlan);
  return response.data;
};

export const getTravelPlanById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/travel-plans/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTravelPlanById = async (id: string) => {
  const response = await axios.delete(`/api/travel-plans/${id}`);
  return response.data;
};
