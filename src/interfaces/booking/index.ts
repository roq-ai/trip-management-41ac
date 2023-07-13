import { TravelPlanInterface } from 'interfaces/travel-plan';
import { GetQueryInterface } from 'interfaces';

export interface BookingInterface {
  id?: string;
  stay: string;
  flight: string;
  travel_plan_id?: string;
  created_at?: any;
  updated_at?: any;

  travel_plan?: TravelPlanInterface;
  _count?: {};
}

export interface BookingGetQueryInterface extends GetQueryInterface {
  id?: string;
  stay?: string;
  flight?: string;
  travel_plan_id?: string;
}
