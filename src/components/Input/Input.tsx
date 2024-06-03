import { getIn, FieldProps } from 'formik';
import { FormHelperText, TextField, TextFieldProps, Theme } from '@mui/material';


export const Input = ({
  field,
  form,
  ...props
}: FieldProps & TextFieldProps) => {
  const { name } = field;
  const { errors, touched } = form;
  const error = getIn(errors, name);
  const shouldRenderError = touched && !!error;

  const InputProps = {
    ...props.InputProps,
    sx: {
      fontSize: ({ typography }: Theme) => typography.fontSize,
      ...props.InputProps?.sx,
    },
  }
  return (
    <>
      <TextField
        {...field}
        {...props}
        InputProps={InputProps}
        sx={{
          width: '100%',
          ...props.sx
        }}
      />
      {shouldRenderError && (
        <FormHelperText error>{error}</FormHelperText>
      )}
    </>
  );
};
