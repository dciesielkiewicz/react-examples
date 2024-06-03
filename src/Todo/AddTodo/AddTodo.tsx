import { useRef } from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { Box, Grid, IconButton } from '@mui/material';
import IconCheck from '@mui/icons-material/Check';
import IconAdd from '@mui/icons-material/Add';

import { Input, LoadingButton } from '../../components';

import { IFormTodo } from '../../api';
import { emptyTodo, FORM_FIELD_TITLE } from '../constants';
import { validationSchema } from '../validationSchema';
import { useAddTodo } from './useAddTodo';

export const AddTodo = () => {
  const inputRef = useRef<HTMLInputElement>();
  const { addTodo } = useAddTodo();

  const focusInput = () => inputRef.current?.focus();

  const submitHandler = (values: IFormTodo, { resetForm, setSubmitting}: FormikHelpers<IFormTodo>) => {
    addTodo(values, {
      onError: () => {
        setSubmitting(false);
      },
      onSuccess: () => {
        resetForm();
      }
    });
  };

  return (
    <Formik
      initialValues={emptyTodo}
      onSubmit={submitHandler}
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Form>
          <Box pt={1} pb={1} mb={2}>
            <Grid container spacing={1} alignItems="center" justifyContent="space-between">
              <Grid item sx={{ flex: 1 }}>
                <Field
                  component={Input}
                  inputProps={{
                    ref: inputRef,
                  }}
                  name={FORM_FIELD_TITLE}
                  placeholder="Type your next todo"
                />
              </Grid>
              <Grid item>
                {isSubmitting ? (
                  <LoadingButton />
                ) : (
                  <IconButton type="submit">
                    <IconCheck />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          </Box>
          <div>
            <IconButton color="primary" onClick={focusInput} aria-label="Focus add todo input">
              <IconAdd />
            </IconButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};
