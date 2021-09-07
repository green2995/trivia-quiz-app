import { config, useTransition } from "@react-spring/core";
import React from "react";
import styled from "styled-components";
import { a } from "react-spring";
import { TriviaCategory } from "../../../Interfaces/Category";
import { Col, Row } from "../../../Styled/Grid";
import CategoryItem from "./CategoryItem";

const CategoryList = (props: CategoryListProps) => {

  if (!props.items.length) return (
    <div>로딩중</div>
  );

  const appendedRandom = [{id: -1, name: "Random"}, ...props.items]

  const transitions = useTransition(appendedRandom, {
    from: { scale: 0, width: "100%", height: "100%", opacity: 0 },
    enter: { scale: 1, opacity: 1 },
    trail: 100,
    config: config.wobbly,
  })

  return (
    <Row>
      {transitions((spring, item) => {
        return (
          <Col sm={6} md={4} lg={3} key={item.id}>
            <a.div style={spring}>
              <CategoryItem {...item} key={item.id} />              
            </a.div>
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
