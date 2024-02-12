import React, { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { TaskTypes } from './types/TaskTypes';
import axios from 'axios';
import { DataProvider } from './contexts/DataContext';

const Card = lazy(() => import('./components/Card'));
const Progress = lazy(() => import('./components/Progress'));
const TasksList = lazy(() => import('./components/TasksList'));

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
  }
`;

const StyledDiv = styled.div`
  width: 100vw;
  height: auto;
  min-height: 100vh;
  background-color: #d1d5db;
  display: flex;
  align-items: start;
  justify-content: center;
`;

function App() {
  const apiUrl = 'http://localhost:3001/todos/';

  const [data, setData] = useState<TaskTypes[]>([]);
  // const [loading, setLoading] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<number>(0);

  const fetchData = useCallback(async () => {
    const response = await axios.get(apiUrl);
    const { data } = response;
    setData(data);
    setCompletedTasks(data.filter((task: TaskTypes) => task.completed).length);
  }, [apiUrl]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleDataChanges = useCallback(async () => {
    try {
      // setLoading(true);
      await fetchData()
      // .then(() => setLoading(false));
    } catch (error) {
      console.error('Error uploading task:', error);
    }
  }, [fetchData]);

  return (
    <DataProvider
      url={apiUrl}
      data={data}
    >
      <GlobalStyle />
      <StyledDiv>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Card
            width="85%"
            maxwidth="720px"
            padding="5% 0"
            margin="2rem 0"
            bg="#F5F5F5"
            rounded="20px"
            direction="column"
            gap="1.5rem"
          >
            <Card
              width="85%"
              bg="#E07C7C"
              rounded="20px"
            >
              <Progress full={data.length} completed={completedTasks} />
            </Card>
            <TasksList dataChanges={handleDataChanges} />
            {/*{loading && (*/}
            {/*  <div>Loading tasks...</div>*/}
            {/*)}*/}
          </Card>
        </Suspense>
      </StyledDiv>
    </DataProvider>
  );
}

export default App;