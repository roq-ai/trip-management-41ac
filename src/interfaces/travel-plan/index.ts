import { BookingInterface } from 'interfaces/booking';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TravelPlanInterface {
  id?: string;
  destination: string;
  preferences: string;
  schedule: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  booking?: BookingInterface[];
  user?: UserInterface;
  _count?: {
    booking?: number;
  };
}

export interface TravelPlanGetQueryInterface extends GetQueryInterface {
  id?: string;
  destination?: string;
  preferences?: string;
  schedule?: string;
  user_id?: string;
}
