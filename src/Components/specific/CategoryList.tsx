import React from "react";
import styled from "styled-components";
import { TriviaCategory } from "../../Interfaces/Category";
import { Col, Row } from "../../Styled/Grid";
import CategoryItem from "./CategoryItem";

const CategoryList = (props: CategoryListProps) => {
  return (
    <Row>
      {props.items.map((item) => (
        <Col sm={6} md={4} lg={3} key={item.id}>
          <CategoryItem {...item} key={item.id} />
        </Col>
      ))}
    </Row>
  )
}

type CategoryListProps = {
  items: TriviaCategory[]
}

export default CategoryList
