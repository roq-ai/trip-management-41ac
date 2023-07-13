import * as yup from 'yup';

export const travelPlanValidationSchema = yup.object().shape({
  destination: yup.string().required(),
  preferences: yup.string().required(),
  schedule: yup.string().required(),
  user_id: yup.string().nullable(),
});
