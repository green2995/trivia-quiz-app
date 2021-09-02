import styled from "styled-components";
import { Fonts } from "../../../../Constants";
import { Flex } from "../../../../Styled/Generic";

export const SelectButtonContainer = styled(Flex)`
flex: 1;
border-radius: 1rem;
overflow: hidden;
`;

export const SelectButton = styled.button<{
shouldCareChosen?: boolean
shouldCareCorrect?: boolean
chosen?: boolean
correct?: boolean
}>`
outline: none;
border: none;
padding: 1rem;
min-width: 50%;
box-shadow: inset 0 0 0 0.5px white;
color: white;
cursor: pointer;
font-family: ${Fonts.어그로체B};
font-size: 1rem;
transition-property: background-color, color, font-size;
transition-duration: 100ms;
/* height: 3rem; */
background-color: blue;
&:hover { background-color: navy; }
&:active { background-color: blueviolet; }

&:active {
  transition: none;
}

/* ${({ shouldCareCorrect, shouldCareChosen, chosen, correct }) => {
  // not yet selected any
  if (!shouldCareChosen && !chosen) return `
  background-color: blue;
  &:hover { background-color: navy; }
  &:active { background-color: blueviolet; }
  `;

  // selected some, but there's no correct answer
  if (shouldCareChosen && !shouldCareCorrect) {
    const backgroundColor = (() => {
      if (!chosen) return "grey";
      return "blue";
    })();

    const color = (() => {
      if (!chosen) return "lightgrey";
      return "auto";
    })();

    return `
    cursor: auto;
    background-color: ${backgroundColor};
    color: ${color};
    transition-duration: 1000ms;
    `;
  }

  // selected some, and there's correct answer
  if (shouldCareChosen && shouldCareCorrect) {
    const backgroundColor = (() => {
      if (correct) return "mediumseagreen";
      if (!chosen) return "grey";
      if (!correct) return "tomato";
    })();

    const color = (() => {
      if (correct) return "auto";
      if (!chosen) return "lightgrey";        
      return "auto";
    })();

    const boxShadow = (() => {
      if (correct) return `inset 0 0 1rem 0.1rem cyan`;
      if (!chosen) return "none";
      if (!correct) return `inset 0 0 1rem 0.1rem crimson`;
    })();

    return `
    cursor: auto;
    background-color: ${backgroundColor};
    color: ${color};
    transition-duration: 1000ms;
    font-size: ${chosen ? 1.2 : 0.8}rem;
    box-shadow: ${boxShadow};
    `;
  }
}} */
`;