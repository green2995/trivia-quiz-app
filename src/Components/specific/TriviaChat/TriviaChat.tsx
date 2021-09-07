import React from 'react'
import { observer } from "mobx-react"
import { TriviaCategory } from '../../../Interfaces/Category';
import styled from 'styled-components';
import { AbsoluteFill } from '../../../Styled/Generic';
import QuizChat from './QuizChat';
import { useHistory } from 'react-router';
import TriviaChatX from "./TriviaChatX"
import { useCurrent } from '../../../Hooks/useCurrent';

const TriviaChat = observer((props: TriviaChatProps) => {
  const { category } = props;
  const triviaChatX = useCurrent(new TriviaChatX())
  const history = useHistory();

  function onClickQuit() {
    history.push("/");
  }

  React.useEffect(() => {
    if (!triviaChatX.questions.data) {
      triviaChatX.loadQuestions(props.category.id)
    }
  }, [])

  return (
    <Conatiner>
      <QuizChat
        onClickQuizStart={triviaChatX.startQuiz}
        onClickNextQuestion={triviaChatX.retrieveQuestions}
        onClickChoice={triviaChatX.submitAnswer}
        onClickRetry={triviaChatX.retry}
        onClickQuit={onClickQuit}
        onClickNextSet={triviaChatX.nextSet.bind(null, category.id)}
        currentQuestion={triviaChatX.currentQuestion}
        interactive={triviaChatX.interactive}
        records={triviaChatX.records}
        score={triviaChatX.score}
        time={triviaChatX.time}
        interactiveVisible={triviaChatX.interactiveVisible}
        questions={triviaChatX.questions.data}
        resultVisible={triviaChatX.resultVisible}
      />
    </Conatiner>
  )
})

const Conatiner = styled(AbsoluteFill)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255,255,255,0.5);
`;

type TriviaChatBaseProps = {
  category: Omit<TriviaCategory, "id"> & { id?: number }
  triviaChatX: TriviaChatX
}

type TriviaChatProps = {
  category: Omit<TriviaCategory, "id"> & { id?: number }
}

export default TriviaChat
