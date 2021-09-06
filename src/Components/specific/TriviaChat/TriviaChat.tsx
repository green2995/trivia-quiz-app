import React from 'react'
import Chat from '../../derivative/Chat';
import { TriviaCategory } from '../../../Interfaces/Category';
import styled from 'styled-components';
import { Fonts } from '../../../Constants';
import { AbsoluteFill } from '../../../Styled/Generic';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { useTriviaChatStore } from './useTriviaChatStore';
import { TriviaChatSlice, TriviaChatState } from './slice';
import QuizChat from './QuizChat';
import { useHistory } from 'react-router';
import { TriviaFileSystem } from '../../../System';

const TriviaChat = (props: TriviaChatProps) => {
  const store = useTriviaChatStore();

  return (
    <Provider store={store}>
      <Provided {...props} />
    </Provider>
  )
}

const Provided = (props: TriviaChatProps) => {
  const history = useHistory();
  const state = useSelector((s: TriviaChatState) => s)
  const dispatch = useDispatch();

  function onClickQuizStart() {
    dispatch(TriviaChatSlice.actions.startQuiz());
  }

  function onClickNextQuestion() {
    dispatch(TriviaChatSlice.actions.setInteractive("none"));
    dispatch(TriviaChatSlice.actions.retrieveQuestions());
  }
  
  function onClickChoice(choice: string) {
    dispatch(TriviaChatSlice.actions.submitAnswer({
      answer: choice,
      questionIndex: state.currentQuestion.index
    }));
  }

  function onClickRetry() {
    dispatch(TriviaChatSlice.actions.setInteractiveVisibility(true));
    dispatch(TriviaChatSlice.actions.retry());
  }

  function onClickQuit() {
    history.push("/");
  }

  function onClickNextSet() {
    dispatch(TriviaChatSlice.actions.setInteractiveVisibility(true));
    dispatch(TriviaChatSlice.actions.nextSet());
    dispatch(TriviaChatSlice.actions.loadQuestions(props.category.id));
  }
  
  React.useEffect(() => {
    if (!state.questions.data) {
      dispatch(TriviaChatSlice.actions.loadQuestions(props.category.id));
    }
  }, [])

  return (
    <Conatiner>
      <QuizChat
        onClickQuizStart={onClickQuizStart}
        onClickNextQuestion={onClickNextQuestion}
        onClickChoice={onClickChoice}
        onClickRetry={onClickRetry}
        onClickQuit={onClickQuit}
        onClickNextSet={onClickNextSet}
        currentQuestion={state.currentQuestion}
        interactive={state.interactive}
        records={state.records}
        score={state.score}
        time={state.time}
        interactiveVisible={state.interactiveVisible}
        questions={state.questions.data}
        resultVisible={state.resultVisible}
      />
    </Conatiner>
  )
}

const Conatiner = styled(AbsoluteFill)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255,255,255,0.5);
`;

type TriviaChatProps = {
  category: Omit<TriviaCategory, "id"> & { id?: number }
}

export default TriviaChat
