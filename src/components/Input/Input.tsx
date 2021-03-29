import { getIn, FieldProps } from 'formik';
import classNames from 'classnames';
import { FormHelperText, makeStyles, TextField, TextFieldProps } from '@material-ui/core';

const useStyles = makeStyles(({ typography }) => ({
  root: {
    width: '100%',
  },
  input: {
    fontSize: typography.fontSize,
  },
}));


export const Input = ({
  field,
  form,
  inputRef,
  ...props
}: FieldProps & TextFieldProps) => {
  const classes = useStyles();
  const { name } = field;
  const { errors, touched } = form;
  const error = getIn(errors, name);
  const shouldRenderError = touched && !!error;

  const className = classNames(props.className, classes.root);
  const InputProps = {
    ...props.InputProps,
    className: classNames(props.InputProps?.className, classes.input),
  }
  return (
    <>
      <TextField {...field} {...props} className={className} InputProps={InputProps} />
      {shouldRenderError && (
        <FormHelperText error>{error}</FormHelperText>
      )}
    </>
  );
};
