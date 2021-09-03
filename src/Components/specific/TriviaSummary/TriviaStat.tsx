import React from 'react'
import styled from 'styled-components';
import { Fonts } from '../../../Constants';
import { Flex, AbsoluteFill } from '../../../Styled/Generic';
import { TriviaSummaryState } from '../TriviaSummary/reducer/reducer';

const TriviaStat = ({state}: TriviaStatProps) => {
  const totalScore = state.triviaResults.reduce((acc, ele) => ({
    trial: acc.trial + ele.score.trial,
    fail: acc.fail + ele.score.fail,
    success: acc.success + ele.score.success,
  }), {
    trial: 0,
    fail: 0,
    success: 0,
  })

  return (
    <div>
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
            <PercentageText>
              {(totalScore.success / totalScore.trial * 100).toFixed(2)}%
                </PercentageText>
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
            <PercentageText>
              {(totalScore.fail / totalScore.trial * 100).toFixed(2)}%
                </PercentageText>
          </StatBarHover>
        </StatBarContainer>
      </Stat>
    </div>
  )
}


const Stat = styled.div`
  display: flex;
  flex-direction: row;
  font-family: ${Fonts.어그로체B};
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

const PercentageText = styled.div`
  font-family: ${Fonts.어비찌빠빠체};
  text-shadow: 1px 2px 5px black;
  color: white;
`;

type TriviaStatProps = {
  state: TriviaSummaryState
}

export default TriviaStat
