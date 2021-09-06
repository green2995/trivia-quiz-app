import React from 'react'
import styled from 'styled-components';
import { Trivia } from '../../../Interfaces/TriviaQuestion';
import Chat from '../../derivative/Chat';
import { ChatInteractiveProps } from '../../derivative/Chat/ChatInteractive';
import { ChatRecordProps } from '../../derivative/Chat/ChatRecord/ChatRecord';
import { TriviaChatState } from './slice';
import TriviaChatTestIds from './testid';

export const USER_NICK = "user";
export const SYSTEM_NICK = "스템이";

const SENDER_SYSTEM = {
  name: SYSTEM_NICK,
  imgUrl: "https://bit.ly/2V9JUKX"
}


const QuizChat = (props: QuizChatProps) => {
  const interactiveProps: ChatInteractiveProps | undefined = (() => {
    if (props.interactive === "start") {
      return {
        message: {
          type: "button",
          value: "퀴즈 시작",
          onClick: props.onClickQuizStart,
        },
        testid: TriviaChatTestIds.startButton
      } as ChatInteractiveProps
    }

    if (props.interactive === "next") {
      return {
        message: {
          type: "button",
          onClick: props.onClickNextQuestion,
          value: "다음 문제"
        },
        testid: TriviaChatTestIds.nextButton
      } as ChatInteractiveProps
    }

    if (props.interactive === "select") {
      return {
        message: {
          type: "selection",
          value: {
            choices: props.currentQuestion.answers,
            onSelect: props.onClickChoice,
            correct: props.questions![props.currentQuestion.index].correct_answer
          }
        },
        testid: TriviaChatTestIds.choiceContainer,
      } as ChatInteractiveProps
    }

    return undefined;
  })();

  const resultRecordProps = {
    sender: SENDER_SYSTEM,
    message: {
      type: "triviaResult",
      value: {
        score: props.score,
        timetook: props.time.end - props.time.start,
        onPressRetry: props.onClickRetry,
        onPressQuit: props.onClickQuit,
        onPressNext: props.onClickNextSet,
      }
    },
    testid: TriviaChatTestIds.resultContainer,
  } as ChatRecordProps

  return (
    <ChatContainer>
      <Chat
        currentUser={USER_NICK}
        interactive={interactiveProps}
        records={props.resultVisible
          ? [...props.records, resultRecordProps]
          : props.records
        }
        interactiveVisible={props.interactiveVisible}
      />
    </ChatContainer>
  )
}

const ChatContainer = styled.div`
  width: 100%;
  height: 100%;
`;

type QuizChatProps = {
  interactive: "none" | "start" | "next" | "select"
  onClickQuizStart: () => void
  onClickNextQuestion: () => void
  onClickChoice: (choice: string) => void
  onClickRetry: () => void
  onClickQuit: () => void
  onClickNextSet: () => void
  questions?: Trivia[]
  score: TriviaChatState["score"]
  time: TriviaChatState["time"]
  interactiveVisible?: boolean
  currentQuestion: TriviaChatState["currentQuestion"]
  resultVisible?: boolean
  records: ChatRecordProps[]
}


export default QuizChat
