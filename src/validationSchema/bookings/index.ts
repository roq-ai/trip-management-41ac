import * as yup from 'yup';

export const bookingValidationSchema = yup.object().shape({
  stay: yup.string().required(),
  flight: yup.string().required(),
  travel_plan_id: yup.string().nullable(),
});
