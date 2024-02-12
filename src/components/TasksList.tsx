import React, { lazy, memo, useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { FaAngleDown } from 'react-icons/fa'
import { useData, useUrl } from '../contexts/DataContext'
import { TaskTypes } from '../types/TaskTypes'
import axios from 'axios'

const Task = lazy(() => import('./Task'));
const AddTask = lazy(() => import('./AddTask'));

interface TaskListProps {
  dataChanges: (changes: boolean) => void;
}

const TasksListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  color: #000000;
`

const TasksListHeader = styled.div`
  width: 85%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const TasksListTasks = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: #000000;
`

const FilterContainer = styled.div`
  position: relative;
`

const TasksListFilter = styled.button`
  width: 110px;
  height: 29px;
  padding: 0 12px;
  background: #FFFFFF;
  border: none;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:hover {
    cursor: pointer;
  }
`

const TasksListFilterList = styled.div`
  position: absolute;
  width: 110px;
  top: 0;
  left: 0;
  transform: translateY(36px);
  padding: 8px 0;
  border-radius: 10px;
  background-color: #FFFFFF;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  z-index: 10;
`

const FilterListButton = styled.button`
  width: 90%;
  height: 32px;
  border: none;
  border-radius: 10px;
  padding: 0 12px;
  text-align: start;
  color: #2E2E2E;
  background-color: #FFFFFF;
  transition: 0.15s ease-in-out;
  &:hover {
    background-color: #585292;
    color: #FFFFFF;
    cursor: pointer;
  }
`

const TaskContainer = styled.div`
  width: 100%;
  max-height: 700px;
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 18px;
  overflow-y: scroll;
  @media (max-width: 768px) {
    max-height: 270px;
  }
`

const TasksList: React.FC<TaskListProps> = ({ dataChanges }) => {
  const apiUrl = useUrl();
  const data = useData();

  const [isFilterOpened, setIsFilterOpened] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>('All');
  const [isUploadingTask, setIsUploadingTask] = useState<boolean>(false);

  const handleClick = useCallback((value: string) => {
    setFilter(value)
    setIsFilterOpened(false)
  }, [])

  const filteredData: TaskTypes[] | undefined = useMemo(() => {
    if (data && filter === 'All') {
      return data.length > 0 ? data : undefined;
    } else if (data && filter === 'Done') {
      const doneTasks = data.filter((item: TaskTypes) => item.completed);
      return doneTasks.length > 0 ? doneTasks : undefined;
    } else if (data && filter === 'Undone') {
      const undoneTasks = data.filter((item: TaskTypes) => !item.completed);
      return undoneTasks.length > 0 ? undoneTasks : undefined;
    }
  }, [data, filter]);

  const updateTaskStatus = useCallback((id: string, completed: boolean) => {
    try {
      axios.patch(`${apiUrl}${id}`, {
      completed: completed,
    })
      .then(() => dataChanges(true));
    } catch (error) {
      console.error(`Error updating task status: ${error}`);
      throw error;
    }
  }, [apiUrl, dataChanges]);

  const uploadNewTask = useCallback((id: string, title: string, completed: boolean) => {
    try {
      setIsUploadingTask(true);
      axios.post(apiUrl, {
        id: id,
        title: title,
        completed: completed,
      })
      .then(() => setIsUploadingTask(false))
      .then(() => dataChanges(true))
    } catch (error) {
      console.error(`Error uploading new task: ${error}`);
      throw error;
    }
  }, [apiUrl])

  const deleteTask = useCallback((taskId: string) => {
    try {
      axios.delete(`${apiUrl}${taskId}`)
      .then(() => dataChanges(true))
      .catch(error => {
        console.error(`Error deleting task: ${error}`);
      });
    } catch (error) {
      console.error(`Error deleting task: ${error}`);
    }
  }, [apiUrl, dataChanges]);

  const updateTaskTitle = useCallback((taskId: string, newTitle: string) => {
    try {
      axios.patch(`${apiUrl}${taskId}`, {
        title: newTitle,
      })
      .then(() => dataChanges(true))
      .catch(error => {
        console.error(`Error updating task title: ${error}`);
      });
    } catch (error) {
      console.error(`Error updating task title: ${error}`);
    }
  }, [apiUrl, dataChanges]);

  return (
    <TasksListContainer>
      <TasksListHeader>
        <TasksListTasks>Tasks</TasksListTasks>
        <FilterContainer>
          <TasksListFilter onClick={() => setIsFilterOpened(!isFilterOpened)}>
            {filter}
            <FaAngleDown />
          </TasksListFilter>
          {isFilterOpened && (
            <TasksListFilterList>
              <FilterListButton onClick={() => handleClick('All')}>All</FilterListButton>
              <FilterListButton onClick={() => handleClick('Done')}>Done</FilterListButton>
              <FilterListButton onClick={() => handleClick('Undone')}>Undone</FilterListButton>
            </TasksListFilterList>
          )}
        </FilterContainer>
      </TasksListHeader>
      <TaskContainer>
        {filteredData ? (
          filteredData.map((task: TaskTypes) => (
            <Task
              key={task.id}
              title={task.title}
              id={task.id}
              completed={task.completed}
              updateTaskStatus={updateTaskStatus}
              deleteTask={deleteTask}
              updateTaskTitle={updateTaskTitle}
            />
          ))
        ) : (
          <div>
            {filter === 'All' && <div>No task, please create a new task.</div>}
            {filter === 'Done' && <div>No done task.</div>}
            {filter === 'Undone' && <div>No undone task.</div>}
          </div>
        )}
      </TaskContainer>
      {isUploadingTask ? (
        <div>Uploading new task...</div>
      ) : (
        <AddTask uploadNewTask={uploadNewTask} />
      )}
    </TasksListContainer>
  )
}

export default memo(TasksList)