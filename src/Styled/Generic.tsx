import styled from "styled-components";

export const AbsoluteFill = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

export const Flex = styled.div<{horizontal?: boolean}>`
  position: relative;
  display: flex;
  flex-direction: ${({horizontal}) => horizontal ? "row" : "column"};
`;