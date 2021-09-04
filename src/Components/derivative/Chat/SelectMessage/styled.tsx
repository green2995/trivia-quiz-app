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

`;