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
import { createBooking } from 'apiSdk/bookings';
import { Error } from 'components/error';
import { bookingValidationSchema } from 'validationSchema/bookings';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { TravelPlanInterface } from 'interfaces/travel-plan';
import { getTravelPlans } from 'apiSdk/travel-plans';
import { BookingInterface } from 'interfaces/booking';

function BookingCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: BookingInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createBooking(values);
      resetForm();
      router.push('/bookings');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<BookingInterface>({
    initialValues: {
      stay: '',
      flight: '',
      travel_plan_id: (router.query.travel_plan_id as string) ?? null,
    },
    validationSchema: bookingValidationSchema,
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
            Create Booking
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="stay" mb="4" isInvalid={!!formik.errors?.stay}>
            <FormLabel>Stay</FormLabel>
            <Input type="text" name="stay" value={formik.values?.stay} onChange={formik.handleChange} />
            {formik.errors.stay && <FormErrorMessage>{formik.errors?.stay}</FormErrorMessage>}
          </FormControl>
          <FormControl id="flight" mb="4" isInvalid={!!formik.errors?.flight}>
            <FormLabel>Flight</FormLabel>
            <Input type="text" name="flight" value={formik.values?.flight} onChange={formik.handleChange} />
            {formik.errors.flight && <FormErrorMessage>{formik.errors?.flight}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<TravelPlanInterface>
            formik={formik}
            name={'travel_plan_id'}
            label={'Select Travel Plan'}
            placeholder={'Select Travel Plan'}
            fetcher={getTravelPlans}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.destination}
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
    entity: 'booking',
    operation: AccessOperationEnum.CREATE,
  }),
)(BookingCreatePage);
