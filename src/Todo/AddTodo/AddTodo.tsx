import { useRef } from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { Box, Grid, IconButton, makeStyles } from '@material-ui/core';
import IconCheck from '@material-ui/icons/Check';
import IconAdd from '@material-ui/icons/Add';

import { Input, LoadingButton } from 'components';

import { emptyTodo, FORM_FIELD_TITLE } from '../constants';
import { IFormTodo, IFormTodoFormikHelpers } from '../types';
import { validationSchema } from '../validationSchema';

const useStyles = makeStyles(() => ({
  inputColumn: {
    flex: 1,
  }
}));

interface IAddTodoProps {
  addTodo: (todo: IFormTodo, formikHelpers: IFormTodoFormikHelpers) => void;
}

export const AddTodo = ({ addTodo }: IAddTodoProps) => {
  const classes = useStyles();
  const inputRef = useRef<HTMLInputElement>();

  const focusInput = () => inputRef.current?.focus();

  const submitHandler = (values: IFormTodo, { resetForm, setSubmitting }: FormikHelpers<IFormTodo>) => {
    addTodo(values, { resetForm, setSubmitting });
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
              <Grid item className={classes.inputColumn}>
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