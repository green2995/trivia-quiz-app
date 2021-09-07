import React from 'react'
import { Flex } from '../../../../../Styled/Generic';
import { Col, Row } from '../../../../../Styled/Grid';
import TriviaChatTestIds from '../../../../specific/TriviaChat/testid';
import TriviaChatX from '../../../../specific/TriviaChat/TriviaChatX';
import {
  Button,
  Container,
  PropertyContainer,
  PropertyTitle,
  PropertyValue,
  Score,
  ScoreContainer,
  Title,
  Underline,
} from "./styled";

const TriviaResult = (props: TriviaResultProps) => {
  const {
    score,
    timetook,
    onPressQuit,
    onPressRetry,
    onPressNext
  } = props;
  return (
    <Container>
      <Title>퀴즈 결과</Title>
      <Row>
        <Col sm={6}>
          <Flex>
            <PropertyContainer>
              <PropertyTitle>문제 개수</PropertyTitle>
              <PropertyValue backgroundColor={"black"}>{score.trial} 개</PropertyValue>
            </PropertyContainer>
            <PropertyContainer>
              <PropertyTitle>맞춘 개수</PropertyTitle>
              <PropertyValue backgroundColor={"mediumseagreen"}>{score.success} 개</PropertyValue>
            </PropertyContainer>
            <PropertyContainer>
              <PropertyTitle>틀린 개수</PropertyTitle>
              <PropertyValue backgroundColor={"tomato"}>{score.fail} 개</PropertyValue>
            </PropertyContainer>
            <PropertyContainer>
              <PropertyTitle>소요 시간</PropertyTitle>
              <PropertyValue>{(timetook / 1000).toFixed(2)} 초</PropertyValue>
            </PropertyContainer>
          </Flex>
        </Col>
        <Col sm={6}>
          <ScoreContainer>
            <Flex style={{ alignItems: "center" }}>
              <Flex>
                <Score data-testid={TriviaChatTestIds.scoreText}>점수: {(score.success / score.trial * 100).toFixed(0)}점</Score>
                <Underline />
              </Flex>
            </Flex>
          </ScoreContainer>
        </Col>
      </Row>
      <Row style={{ marginTop: "1rem" }}>
        <Col>
          <Button
            data-testid={TriviaChatTestIds.nextSetButton}
            onClick={onPressNext}
            type={"next"}>
            다음문제
          </Button>
        </Col>
      </Row>
      <Row style={{ marginTop: "0.6rem" }}>
        <Col sm={6}>
          <Button
            data-testid={TriviaChatTestIds.retryButton}
            onClick={onPressRetry}
            type={"retry"}
            direction={"left"}>
            다시풀기
          </Button>
        </Col>
        <Col sm={6}>
          <Button
            data-testid={TriviaChatTestIds.quitButton}
            onClick={onPressQuit}
            type={"quit"}
            direction={"right"}>
            그만풀기
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export type TriviaResultProps = {
  score: TriviaChatX["score"],
  timetook: number,
  onPressRetry: () => void,
  onPressQuit: () => void
  onPressNext: () => void
}

export default TriviaResult
