import axios from 'axios';
import { ReactNode, useEffect, useState } from 'react';
import { Loader } from './components';

interface IConfigureAxiosProps {
  children: ReactNode;
}

export const ConfigureAxios = ({ children }: IConfigureAxiosProps) => {
  const [axiosReady, setAxiosReady] = useState(false);

  useEffect(() => {
    axios.defaults.baseURL = 'http://localhost:3000';
    setAxiosReady(true);
  }, [])

  return axiosReady ? <>{children}</> : <Loader />;
};
