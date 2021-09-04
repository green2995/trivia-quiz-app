import React from 'react'
import styled from 'styled-components';
import { Fonts } from '../../../Constants';
import { Flex, AbsoluteFill } from '../../../Styled/Generic';
import { TriviaFileSystem } from '../../../System';
import { TriviaSummaryState } from './slice';

const TriviaStat = ({triviaResults}: TriviaStatProps) => {
  const totalScore = triviaResults.reduce((acc, ele) => ({
    trial: acc.trial + ele.score.trial,
    fail: acc.fail + ele.score.fail,
    success: acc.success + ele.score.success,
  }), {
    trial: 0,
    fail: 0,
    success: 0,
  })

  return (
    <Container>
      <Stat>
        <div>
          정답률
        </div>
        <StatBarContainer>
          <StatBarFill
            positive
            style={{
              width: `${(totalScore.success / totalScore.trial) * 100}%`,
              backgroundColor: "mediumseagreen"
            }}
          />
          <StatBarHover>
            <StatHoverText>
              <span>
              {(totalScore.success / totalScore.trial * 100).toFixed(2)}%
              </span>
              <span style={{fontSize: "0.7rem", marginLeft: "0.5rem"}}>
               ({totalScore.success}개)
              </span>
            </StatHoverText>
          </StatBarHover>
        </StatBarContainer>
      </Stat>
      <div style={{ height: "10px" }} />
      <Stat>
        <div>
          오답률
        </div>
        <StatBarContainer>
          <StatBarFill
            style={{
              width: `${(totalScore.fail / totalScore.trial) * 100}%`,
              backgroundColor: "tomato"
            }}
          />
          <StatBarHover>
            <StatHoverText>
              <span>
                {(totalScore.fail / totalScore.trial * 100).toFixed(2)}%
              </span>
              <span style={{fontSize: "0.7rem", marginLeft: "0.5rem"}}>
               ({totalScore.fail}개)
              </span>
            </StatHoverText>
          </StatBarHover>
        </StatBarContainer>
      </Stat>
    </Container>
  )
}

const Container = styled.div`
  user-select: none;
`;

const Stat = styled.div`
  display: flex;
  flex-direction: row;
  font-family: ${Fonts.어그로체L};
  font-size: 1rem;
  justify-content: center;
  align-items: center;
`;

const StatBarFill = styled(Flex) <{ positive?: boolean }>`
  box-shadow: inset 0 0 10px 5px ${({ positive }) => positive ? "cyan" : "crimson"};
`;

const StatBarContainer = styled(Flex)`
  flex: 1;
  flex-direction: row;
  margin-left: 1rem;
  border: 1px solid black;
  height: 2rem;
  background-color: dimgrey;
`;

const StatBarHover = styled(AbsoluteFill)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StatHoverText = styled.div`
  font-family: ${Fonts.어그로체B};
  text-shadow: 1px 2px 5px black;
  color: white;
`;

type TriviaStatProps = {
  triviaResults: TriviaFileSystem.TriviaResult[]
}

export default TriviaStat
