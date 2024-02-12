import React, { memo, ReactNode } from 'react'
import styled from 'styled-components';

interface CardProps {
  children: ReactNode;
  width?: string;
  maxwidth?: string;
  height?: string;
  minheight?: string;
  padding?: string;
  margin?: string;
  rounded?: string;
  bg?: string;
  display?: string;
  direction?: string;
  align?: string;
  justify?: string;
  gap?: string;
  z?: string;
}

const StyledCard = styled.div<CardProps>`
  width: ${props => props.width || 'auto'};
  max-width: ${props => props.maxwidth || '100%'};
  height: ${props => props.height || 'auto'};
  min-height: ${props => props.minheight || 'none'};;
  padding: ${props => props.padding || '0'};
  margin: ${props => props.margin || '0'};
  border-radius: ${props => props.rounded || 'none'};
  background-color: ${props => props.bg || '#F5F5F5'};
  display: ${props => props.display || 'flex'};
  flex-direction: ${props => props.direction || 'row'};
  align-items: ${props => props.align || 'center'};
  justify-content: ${props => props.justify || 'center'};
  gap: ${props => props.gap || '0'};
  filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.03));
  z-index: ${props => props.z || 'auto'};
`;

const Card: React.FC<CardProps> = ({
  children,
  width,
  maxwidth,
  height,
  minheight,
  padding,
  margin,
  rounded,
  bg,
  display,
  direction,
  align,
  justify,
  gap,
  z,
}) => {
  return (
    <StyledCard
      width={width}
      maxwidth={maxwidth}
      height={height}
      minheight={minheight}
      padding={padding}
      margin={margin}
      rounded={rounded}
      bg={bg}
      display={display}
      direction={direction}
      align={align}
      justify={justify}
      gap={gap}
      z={z}
    >
      {children}
    </StyledCard>
  )
}

export default memo(Card)