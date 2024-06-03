import { useRef, useState } from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { Box, Checkbox, Grid, IconButton } from '@mui/material';
import IconCheck from '@mui/icons-material/Check';
import IconDelete from '@mui/icons-material/Delete';
import IconEdit from '@mui/icons-material/Edit';

import { Input, LoadingButton } from '../../components';

import { FORM_FIELD_TITLE } from '../constants';
import { ITodo, ITodoFormikHelpers } from '../types';
import { validationSchema } from '../validationSchema';

interface ITodoItemProps {
  handleDeleteTodoClick: (todo: ITodo) => void;
  loadingDeleteTodoId: ITodo['id'] | null;
  toggleTodo: (todo: ITodo) => void;
  todo: ITodo;
  updateTodo: (todo: ITodo, formikHelpers: ITodoFormikHelpers) => Promise<void>;
}

export const TodoItem = ({
  handleDeleteTodoClick,
  loadingDeleteTodoId,
  toggleTodo,
  todo,
  updateTodo,
}: ITodoItemProps) => {
  const inputRef = useRef<HTMLInputElement>();
  const [editable, setEditable] = useState(false);

  const enableEdit = (event: React.MouseEvent) => {
    event.preventDefault();
    setEditable(true);
    setTimeout(() => inputRef.current?.focus());
  }

  const submitHandler = async (values: ITodo, { resetForm, setSubmitting }: FormikHelpers<ITodo>) => {
    await updateTodo(values, { resetForm, setSubmitting });
    setEditable(false);
  };

  const handleToggleTodoChange = () => toggleTodo(todo);

  return (
    <Formik
      enableReinitialize
      initialValues={todo}
      onSubmit={submitHandler}
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => {
        const submitButton = isSubmitting ? (
          <LoadingButton />
        ) : (
          <IconButton type="submit">
            <IconCheck />
          </IconButton>
        );
        return (
          <Form>
            <Box
              pt={1}
              pb={1}
              sx={{
                borderBottomWidth: 1,
                borderBottomStyle: 'solid',
                borderColor: 'grey.300'
              }}
            >
              <Grid container spacing={1} alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Checkbox
                    checked={todo.checked}
                    inputProps={{ 'aria-label': 'Toggle todo' }}
                    onChange={handleToggleTodoChange}
                  />
                </Grid>
                <Grid item sx={{ flex: 1 }}>
                  {editable ? (
                    <Field
                      sx={{
                        textDecoration: todo.checked ? 'line-through' : 'none',
                      }}
                      component={Input}
                      inputProps={{
                        ref: inputRef,
                      }}
                      name={FORM_FIELD_TITLE}
                      placeholder="Type your todo here"
                    />
                  ) : (
                    <Box
                      sx={{
                        cursor: 'pointer',
                        fontSize: ({ typography }) => typography.fontSize,
                        textDecoration: todo.checked ? 'line-through' : 'none',
                      }}
                      onClick={handleToggleTodoChange}
                    >
                      {todo.title}
                    </Box>
                  )}
                </Grid>
                <Grid item>
                  {editable ? (
                    submitButton
                  ) : (
                    <IconButton onClick={enableEdit} aria-label="Edit todo">
                      <IconEdit />
                    </IconButton>
                  )}
                  {loadingDeleteTodoId === todo.id ? (
                    <LoadingButton />
                  ) : (
                    <IconButton onClick={() => handleDeleteTodoClick(todo)} aria-label="Delete todo">
                      <IconDelete />
                    </IconButton>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Form>
        )
      }}
    </Formik>
  );
};
