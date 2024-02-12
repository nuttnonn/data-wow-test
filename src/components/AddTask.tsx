import React, { lazy, memo, useCallback, useState } from 'react'
import styled from 'styled-components'
import { FiUpload } from 'react-icons/fi'
import { v4 as uuidv4 } from 'uuid'

const Card = lazy(() => import('./Card'));

interface AddTaskProps {
  uploadNewTask: (id: string, title: string, completed: boolean) => void;
}

const TaskInput = styled.input`
  width: 100%;
  border: none;
  margin-left: 20px;
  outline: none;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
`

const UploadButton = styled.button`
  margin-right: 14px;
  border: none;
  background-color: inherit;
`

const UploadIcon = styled(FiUpload)`
  font-size: 20px;
  color: #A9A9A9;
  &:hover {
    color: black;
  }
`

const AddTask: React.FC<AddTaskProps> = ({ uploadNewTask }) => {
  const [input, setInput] = useState<string>('')

  const handleClick = useCallback(() => {
    if (input.length > 0) {
      const id = uuidv4();
      uploadNewTask(id, input, false);
      setInput('');
    }
  }, [input, uploadNewTask]);

  return (
    <Card width="85%" height="46px" minheight="46px" bg="#FFFFFF" rounded="23px" align="center" justify="space-between">
      <TaskInput
        type="text"
        placeholder="Add your todo..."
        value={input}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
      />
      {input.length > 0 && (
        <UploadButton onClick={handleClick}>
          <UploadIcon />
        </UploadButton>
        )}
    </Card>
  )
}

export default memo(AddTask);