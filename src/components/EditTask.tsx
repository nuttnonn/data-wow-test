import React, { memo, useCallback, useState } from 'react'
import Card from './Card'
import styled from 'styled-components'
import { FiUpload } from 'react-icons/fi'

interface EditTaskProps {
  value: string;
  onSave: (input: string) => void;
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

const EditTask: React.FC<EditTaskProps> = ({ value, onSave }) => {
  const [input, setInput] = useState<string>(value)

  const handleSaveClick = useCallback(() => {
    onSave(input);
  }, [input, onSave]);

  return (
    <Card width="85%" height="46px" minheight="46px" bg="#FFFFFF" rounded="23px" align="center" justify="space-between">
      <TaskInput
        type="text"
        placeholder="Add your todo..."
        value={input}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
      />
      {input.length > 0 && (
        <UploadButton onClick={handleSaveClick}>
          <UploadIcon />
        </UploadButton>
      )}
    </Card>
  )
}

export default memo(EditTask);