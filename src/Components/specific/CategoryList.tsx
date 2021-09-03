import React from "react";
import styled from "styled-components";
import { TriviaCategory } from "../../Interfaces/Category";
import { Col, Row } from "../../Styled/Grid";
import CategoryItem from "./CategoryList/CategoryItem";

const CategoryList = (props: CategoryListProps) => {
  if (!props.items.length) return (
    <div>로딩중</div>
  );

  return (
    <Row>
      <Col sm={6} md={4} lg={3}>
        <CategoryItem id={-1} name={"Random"} />
      </Col>
      {props.items.map((item) => {
        return (
          <Col sm={6} md={4} lg={3} key={item.id}>
            <CategoryItem {...item} key={item.id} />
          </Col>
        )
      })}
    </Row>
  )
}

type CategoryListProps = {
  items: TriviaCategory[]
}

export default CategoryList
