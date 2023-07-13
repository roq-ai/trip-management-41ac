import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createTravelPlan } from 'apiSdk/travel-plans';
import { Error } from 'components/error';
import { travelPlanValidationSchema } from 'validationSchema/travel-plans';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { TravelPlanInterface } from 'interfaces/travel-plan';

function TravelPlanCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: TravelPlanInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createTravelPlan(values);
      resetForm();
      router.push('/travel-plans');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<TravelPlanInterface>({
    initialValues: {
      destination: '',
      preferences: '',
      schedule: '',
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: travelPlanValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Travel Plan
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="destination" mb="4" isInvalid={!!formik.errors?.destination}>
            <FormLabel>Destination</FormLabel>
            <Input type="text" name="destination" value={formik.values?.destination} onChange={formik.handleChange} />
            {formik.errors.destination && <FormErrorMessage>{formik.errors?.destination}</FormErrorMessage>}
          </FormControl>
          <FormControl id="preferences" mb="4" isInvalid={!!formik.errors?.preferences}>
            <FormLabel>Preferences</FormLabel>
            <Input type="text" name="preferences" value={formik.values?.preferences} onChange={formik.handleChange} />
            {formik.errors.preferences && <FormErrorMessage>{formik.errors?.preferences}</FormErrorMessage>}
          </FormControl>
          <FormControl id="schedule" mb="4" isInvalid={!!formik.errors?.schedule}>
            <FormLabel>Schedule</FormLabel>
            <Input type="text" name="schedule" value={formik.values?.schedule} onChange={formik.handleChange} />
            {formik.errors.schedule && <FormErrorMessage>{formik.errors?.schedule}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'travel_plan',
    operation: AccessOperationEnum.CREATE,
  }),
)(TravelPlanCreatePage);
