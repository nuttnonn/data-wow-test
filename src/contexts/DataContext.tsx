import React, { createContext, ReactNode, useContext } from 'react';
import { TaskTypes } from '../types/TaskTypes';

interface DataContextProps {
  children?: ReactNode;
  url: string;
  data: TaskTypes[];
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const useUrl = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useUrl must be used within a DataProvider');
  }
  return context.url;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context.data;
};

export const DataProvider: React.FC<DataContextProps> = ({ children, url, data}) => {
  return (
    <DataContext.Provider value={{ url, data }}>
      {children}
    </DataContext.Provider>
  );
};