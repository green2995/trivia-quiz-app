import React from 'react'
import { TriviaCategory } from '../../Interfaces/Category'
import styled from "styled-components"
import { AbsoluteFill, Flex } from '../../Styled/Generic'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const CategoryItem = (props: CategoryItemProps) => {
  return (
    <Container>
      <Link
        to={{
          pathname: "/trivia",
          search: `?category=${props.name}`,
        }} >
        <Content>
          {props.name}
        </Content>
      </Link>
    </Container>
  )
}

const Container = styled(Flex)`
  padding: 1rem;
  border: 1px solid black;
  height: 10rem;
  margin: 1rem;
`;

const Content = styled(AbsoluteFill)`
  justify-content: center;
  align-items: center;
  background-color: blue;
  display: flex;
  color: white;
  text-align: center;
  &:hover {
    font-weight: bold;
  }
`;

type CategoryItemProps = TriviaCategory

export default CategoryItem
