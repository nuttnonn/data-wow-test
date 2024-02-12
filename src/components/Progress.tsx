import React, { memo, useMemo } from 'react'
import styled from 'styled-components'

interface ProgressProps {
  full: number;
  completed: number;
}

const ProgressContainer = styled.div`
  width: 90%;
  margin: 1.5rem 0;
`

const StyledProgress = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 33px;
  margin: 0;
  color: #FFFFFF;
`

const StyledProgressBar = styled.div`
  position: relative;
  width: 100%;
  height: 8px;
  margin: 16px 0;
`

const StyledProgressBarFull = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #3B3B3B;
  border-radius: 4px;
`

const StyledProgressBarCompleted = styled.div`
  position: absolute;
  width: 0;
  height: 100%;
  left: 0;
  background: #FFFFFF;
  border-radius: 4px;
`

const StyledCompleted = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  margin: 0;
  color: #EBB9B8;
`

const Progress: React.FC<ProgressProps> = ({ full, completed }) => {
  const completedPercentage = useMemo(() => {
    return (completed / full) * 100
  }, [full, completed])

  return (
    <ProgressContainer>
      <StyledProgress>Progress</StyledProgress>
      <StyledProgressBar>
        <StyledProgressBarFull />
        <StyledProgressBarCompleted style={{ width: `${completedPercentage}%` }} />
      </StyledProgressBar>
      <StyledCompleted>{`${completed}`} completed</StyledCompleted>
    </ProgressContainer>
  )
}

export default memo(Progress)