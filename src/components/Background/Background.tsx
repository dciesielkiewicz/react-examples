import { ReactNode } from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(({ palette }) => ({
  root: {
    backgroundColor: palette.grey[100],
    minHeight: '100vh',
  },
}));

interface IBackgroundProps {
  children: ReactNode;
}

export const Background = ({ children }: IBackgroundProps) => {
  const classes = useStyles();
  return <div className={classes.root} data-testid="background">{children}</div>;
};
