import styled from "styled-components";
import { Fonts } from "../../../../Constants";
import { Flex } from "../../../../Styled/Generic";
import { Row } from "../../../../Styled/Grid";

export const Container = styled.div`
background-color: white;
width: 100%;
padding: 2rem;
border-radius: 1rem;
box-shadow: 0 0 0 0.2rem black;
user-select: none;

@media only screen and (min-width: 600px) {
  margin: 2rem;
}


`;

export const Title = styled.div`
font-family: ${Fonts.어그로체B};
font-size: 1.2rem;
`;


export const PropertyContainer = styled(Flex)`
flex-direction: row;
align-items: center;
margin: 0.3rem;
`;

export const PropertyTitle = styled.div`
font-size: 1rem;
font-family: ${Fonts.어그로체B};

// if other languages should be provided, this value also should be changed
width: 5rem;
`;

export const PropertyValue = styled.div<{ backgroundColor?: string }>`
font-family: ${Fonts.어그로체B};
font-size: 1rem;
padding: 0.3rem;
background-color: ${(({ backgroundColor }) => backgroundColor || "slategray")};
border-radius: 0.5rem;
color: white;
`;

export const Score = styled.div`
@media only screen and (min-width: 480px) {
  font-size: 2rem;
}

font-family: ${Fonts.어비찌빠빠체};
font-size: 1.2rem;
`;

export const ScoreContainer = styled(Flex)`
flex: 1;
justify-content: center;
align-items: center;
margin-top: 0.5rem;
`;

export const Underline = styled.div`
width: calc(100%);
left: 0;
height: 0.3rem;
background-color: red;
position: absolute;
bottom: 0.2rem;
`;

export const Button = styled(Flex) <{
direction?: "left" | "right",
type?: "retry" | "quit" | "next"
}>`
flex: 1;
font-size: 1rem;
padding: 0.8rem;
color: white;
border-radius: 1rem;
text-align: center;
cursor: pointer;
font-family: ${Fonts.어그로체B};

${({ direction }) => {
  if (direction === "left") return `
  @media only screen and (min-width: 600px) {
    margin-right: 0.5rem;
  }
  
  margin-right: 0;
  margin-bottom: 0.6rem;
  `;

  if (direction === "right") return `
  @media only screen and (min-width: 600px) {
    margin-left: 0.5rem;
  }
  
  margin: 0;
  `;
}}

${({ type }) => {
  if (type === "next") return`
  background-color: blue;
  &:hover { background-color: navy; }
  &:active { background-color: deepskyblue; }
  `;

  if (type === "quit") return`
  background-color: grey;
  &:hover { background-color: black; }
  &:active { background-color: lightgrey; }
  `;

  if (type === "retry") return `
  background-color: mediumseagreen;
  &:hover { background-color: green; }
  &:active { background-color: springgreen; }
  `;
}}
`;