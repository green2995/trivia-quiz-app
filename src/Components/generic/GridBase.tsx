import React from 'react'
import styled from 'styled-components';

const GridBase: React.FC<GridBaseProps> = (props) => {
  const { colCount = 3, gap } = props;

  const children = React.Children.toArray(props.children);
  const rowCount = Math.floor(children.length / colCount);

  const rows = Array(rowCount).fill(0).map((_, rowIndex) => {
    const cols = Array(colCount).fill(0).map((_, colIndex) => {
      const flatIndex = rowIndex * colCount + colIndex;
      const child = children[flatIndex];
      return (
        <Col key={flatIndex}>{child}</Col>
      );
    });

    return (
      <Row key={rowIndex}>
        {cols}
      </Row>
    )
  })

  return (
    <Container>
      {rows}
    </Container>
  )
}

const Container = styled.div`
`;

const Row = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
`;

const Col = styled.div`
  position: relative;
  display: flex;
  flex: 1;
`;

type GridBaseProps = {
  colCount?: number
  gap?: number
}

export default GridBase
