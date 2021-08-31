import React from 'react'
import { TriviaCategory } from '../../Interfaces/Category'
import styled from "styled-components"

const CategoryItem = (props: CategoryItemProps) => {
  // props.id

  return (
    <Container>
      {props.name}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex: 1;
  padding: 1rem;
  border: 1px solid black;
  overflow: hidden;
  height: 10rem;
  margin: 1rem;
  justify-content: center;
  align-items: center;
`;

type CategoryItemProps = TriviaCategory

export default CategoryItem
