import styled from "styled-components";

export const Row = styled.div`
  &::after {
    content: "";
    clear: both;
    display: table;
  }
`;

export const Col = styled.div<ColProps>`

${(props) => {
    const sm = props.sm && `
    @media only screen and (min-width: 600px) {
      width: ${(props.sm / 12) * 100}%
    }`;

    const md = props.md && `
    @media only screen and (min-width: 768px) {
      width: ${(props.md / 12) * 100}%      
    }`;

    const lg = props.lg && `
    @media only screen and (min-width: 1024px) {
      width: ${(props.lg / 12) * 100}%      
    }`;

    const base = `
    width: 100%;
    float: left;
    `;

    return [sm, md, lg, base].filter((p) => !!p).join("\n");
  }}
`;


/**
 * span from 1 to 12;
 */
type ColProps = {
  md?: number
  sm?: number
  lg?: number
}