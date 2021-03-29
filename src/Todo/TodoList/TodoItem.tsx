import { useRef, useState } from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import classNames from 'classnames';
import { Box, Checkbox, Grid, IconButton, makeStyles } from '@material-ui/core';
import IconCheck from '@material-ui/icons/Check';
import IconDelete from '@material-ui/icons/Delete';
import IconEdit from '@material-ui/icons/Edit';

import { Input } from 'components';

import { FORM_FIELD_TITLE } from '../constants';
import { ITodo, TTodoResetForm } from '../types';
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
  handleUpdateTodo: (todo: ITodo, resetForm: TTodoResetForm) => void;
  toggleTodoChecked: (todo: ITodo) => void;
  todo: ITodo;
}

export const TodoItem = ({
  handleDeleteTodoClick,
  handleUpdateTodo,
  toggleTodoChecked,
  todo,
}: ITodoItemProps) => {
  const classes = useStyles();
  const inputRef = useRef<HTMLInputElement>();
  const [editable, setEditable] = useState(false);

  const enableEdit = (event: React.MouseEvent) => {
    event.preventDefault();
    setEditable(true);
    setTimeout(() => inputRef.current?.focus());
  }

  const submitHandler = (values: ITodo, { resetForm }: FormikHelpers<ITodo>) => {
    setEditable(false);
    handleUpdateTodo(values, resetForm);
  };

  const toggleTodo = () => toggleTodoChecked(todo);

  return (
    <Formik
      enableReinitialize
      initialValues={todo}
      onSubmit={submitHandler}
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={validationSchema}
    >
      <Form>
        <Box pt={1} pb={1} className={classes.wrapper}>
          <Grid container spacing={1} alignItems="center" justify="space-between">
            <Grid item>
              <Checkbox checked={todo.checked} onChange={toggleTodo} />
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
                  onClick={toggleTodo}
                >
                  {todo.title}
                </div>
              )}
            </Grid>
            <Grid item>
              {editable ? (
                <IconButton type="submit">
                  <IconCheck />
                </IconButton>
              ) : (
                <IconButton onClick={enableEdit} data-testid="edit-todo">
                  <IconEdit />
                </IconButton>
              )}
              <IconButton onClick={() => handleDeleteTodoClick(todo)} data-testid="delete-todo">
                <IconDelete />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Form>
    </Formik>
  );
};