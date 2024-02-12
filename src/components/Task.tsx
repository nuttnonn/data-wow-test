import React, { lazy, memo, useCallback, useState } from 'react'
import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs'
import EditTask from './EditTask'

const Card = lazy(() => import('./Card'));

interface TaskProps {
  title: string;
  id: string;
  completed: boolean;
  updateTaskStatus: (id: string, completed: boolean) => void;
  deleteTask: (id: string) => void;
  updateTaskTitle: (id: string, newTitle: string) => void;
}

const TaskDataContainer = styled.div`
  margin-left: 20px;
  display: flex;
  align-items: center;
  justify-content: start;
  z-index: 1;
`

const CheckboxWrapper = styled.label`
  position: relative;
  display: inline-block;
  &:hover {
    cursor: pointer;
  }
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const StyledCheckbox = styled.span<{ checked: boolean }>`
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  border: 2px solid #585292;
  border-radius: 6px;
  display: inline-block;
  background-color: ${({ checked }) => (checked ? '#585292' : 'transparent')};
  transition: 0.15s ease-in-out;
  &:hover {
    border-color: #817bb5;
    background-color: #817bb5;
  }
`;

const CheckboxIndicator = styled.span<{ checked: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${({ checked }) => (checked ? 'block' : 'none')};
`;

const CheckboxIcon = styled(FaCheck)`
  width: 10px;
  color: #FFFFFF;
`;

const CheckboxLabel = styled.span<{ checked: boolean}>`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: ${({ checked }) => (checked ? '#9796A8' : 'black')};
  margin-left: 16px;
  text-decoration-line: ${({ checked }) => (checked ? 'line-through' : 'none')};
`;

const ThreeDotsButton = styled.button`
  margin-right: 14px;
  border: none;
  background-color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
`

const ThreeDotsIcon = styled(BsThreeDots)`
  font-size: 22px;
  color: #A9A9A9;
  &:hover {
    color: black;
  }
`

const OptionContainer = styled.div`
  position: relative;
`

const OptionList = styled.div`
  position: absolute;
  width: 110px;
  bottom: 0;
  left: 0;
  transform: translateY(30px) translateX(36px);
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

const OptionListButton = styled.button`
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

const Task: React.FC<TaskProps> = ({ title, id, completed, updateTaskStatus, deleteTask, updateTaskTitle }) => {
  const [isChecked, setIsChecked] = useState(completed);
  const [isOptionOpened, setIsOptionOpened] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  // const [editedTitle, setEditedTitle] = useState<string>(title);

  const handleCheckboxChange = useCallback(() => {
    setIsChecked(!isChecked);
    updateTaskStatus(id, !isChecked);
  }, [isChecked, id, updateTaskStatus]);

  const handleDeleteClick = useCallback(() => {
    deleteTask(id);
  }, [id, deleteTask]);

  const handleEditClick = useCallback(() => {
    setIsEditing(!isEditing);
  }, [isEditing]);

  const handleEditSave = useCallback((editedTitle: string) => {
    updateTaskTitle(id, editedTitle);
    setIsEditing(false);
    setIsOptionOpened(false);
  }, [id, updateTaskTitle]);

  return (
    <Card width="85%" height="46px" minheight="46px" bg="#FFFFFF" rounded="23px" align="center" justify="space-between" z="1">
      {isEditing ? (
        <EditTask
          value={title}
          onSave={handleEditSave}
        />
      ) : (
        <>
          <TaskDataContainer>
            <CheckboxWrapper>
              <HiddenCheckbox checked={isChecked} onChange={handleCheckboxChange} />
              <StyledCheckbox checked={isChecked}>
                <CheckboxIndicator checked={isChecked}>
                  <CheckboxIcon />
                </CheckboxIndicator>
              </StyledCheckbox>
            </CheckboxWrapper>
            <CheckboxLabel checked={isChecked}>{title}</CheckboxLabel>
          </TaskDataContainer>
          <OptionContainer>
            <ThreeDotsButton onClick={() => setIsOptionOpened(!isOptionOpened)}>
              <ThreeDotsIcon />
            </ThreeDotsButton>
            {isOptionOpened &&
              <OptionList>
                <OptionListButton onClick={handleEditClick}>Edit</OptionListButton>
                <OptionListButton onClick={handleDeleteClick}>Delete</OptionListButton>
              </OptionList>
            }
          </OptionContainer>
        </>
      )}
    </Card>
  );
};

export default memo(Task);