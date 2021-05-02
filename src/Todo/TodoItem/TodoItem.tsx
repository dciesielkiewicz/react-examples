import { useRef, useState } from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import classNames from 'classnames';
import { Box, Checkbox, Grid, IconButton, makeStyles } from '@material-ui/core';
import IconCheck from '@material-ui/icons/Check';
import IconDelete from '@material-ui/icons/Delete';
import IconEdit from '@material-ui/icons/Edit';

import { Input, LoadingButton } from 'components';

import { FORM_FIELD_TITLE } from '../constants';
import { ITodo, ITodoFormikHelpers } from '../types';
import { validationSchema } from '../validationSchema';

const useStyles = makeStyles(({ palette, spacing }) => ({
  wrapper: {
    borderBottom: `1px solid ${palette.grey[300]}`,
  },
  inputColumn: {
    flex: 1,
  },
  checkedTodo: {
    textDecoration: 'line-through',
  },
  clickableTodo: {
    cursor: 'pointer',
  },
}));

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
  const classes = useStyles();
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
            <Box pt={1} pb={1} className={classes.wrapper}>
              <Grid container spacing={1} alignItems="center" justify="space-between">
                <Grid item>
                  <Checkbox
                    checked={todo.checked}
                    inputProps={{ 'aria-label': 'Toggle todo' }}
                    onChange={handleToggleTodoChange}
                  />
                </Grid>
                <Grid item className={classes.inputColumn}>
                  {editable ? (
                    <Field
                      className={classNames({
                        [classes.checkedTodo]: todo.checked,
                      })}
                      component={Input}
                      inputProps={{
                        ref: inputRef,
                      }}
                      name={FORM_FIELD_TITLE}
                      placeholder="Type your todo here"
                    />
                  ) : (
                    <div
                      className={classNames(classes.clickableTodo, {
                        [classes.checkedTodo]: todo.checked,
                      })}
                      onClick={handleToggleTodoChange}
                    >
                      {todo.title}
                    </div>
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