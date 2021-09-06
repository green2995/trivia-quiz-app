import React from 'react'
import styled from 'styled-components';
import { Flex } from '../../../../Styled/Generic';
import TriviaResult, { TriviaResultProps } from './TriviaResult/TriviaResult';

const ChatRecord = (props: ChatRecordProps) => {
  const { sender, message, mine } = props;

  if (message.type === "triviaResult") {
    return (
      <MessageContainer data-testid={props.testid}>
        <TriviaResult {...message.value} />
      </MessageContainer>
    )
  }

  if (mine)
    return (
      <MessageContainer lean={"right"} data-testid={props.testid}>
        <Flex>
          <Message mine tag={message.tag}>
            {message.value}
          </Message>
        </Flex>
      </MessageContainer>
    )

  return (
    <MessageContainer lean={"left"} data-testid={props.testid}>
      <ProfileImg src={sender.imgUrl} />
      <Flex>
        <ProfileName>{sender.name}</ProfileName>
        <Message tag={message.tag}>
          {message.value}
        </Message>
      </Flex>
    </MessageContainer>
  )
}

const MessageContainer = styled(Flex) <{ lean?: "left" | "right" }>`
  flex-direction: row;
  padding: 0.5rem;

  ${({ lean }) => {
    if (!lean) return;

    if (lean === "right") return `
    padding-left: 15%;
    justify-content: flex-end;
    `
    return `
    padding-right: 15%;
    justify-content: flex-start;
    `
  }}

`;

const ProfileName = styled.div`
  font-size: 0.8rem;
`;

const ProfileImg = styled.img`
  min-width: 2.5rem;
  min-height: 2.5rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 2.5rem;
  margin-right: 0.5rem;
  background-color: lightgrey;
`;

const Message = styled.div<{ mine?: boolean, tag?: TextMessage["tag"] }>`
  background-color: ${({ mine }) => mine ? "blue" : "slategrey"};
  color: white;
  border-radius: 1rem;
  padding: 0.5rem;  
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 0.5rem;
  ${({ tag }) => {
    if (tag === "important") return `
    background-color: black;
    `;

    if (tag === "warning") return `
    background-color: tomato;
    font-weight: bold;
    `;

    if (tag === "positive") return `
    background-color: mediumseagreen;
    font-weight: bold;
    `;
  }}
`;

export type ChatRecordProps = {
  sender: {
    name: string
    imgUrl?: string
  }
  message: ChatMessages[keyof ChatMessages]
  mine?: boolean
  testid?: string
}

export type ChatMessages = {
  text: TextMessage,
} & SpecialMessages;;

export type TextMessage = {
  type: "text"
  value: string
  tag?: "warning" | "important" | "positive"
}

export type SpecialMessages = {
  triviaResult: {
    type: "triviaResult",
    value: TriviaResultProps
  }
}

export default React.memo(ChatRecord, (prev, next) => {
  if (prev.sender.name !== next.sender.name || prev.sender.imgUrl !== next.sender.imgUrl) return false;
  if (prev.message !== next.message) return false;
  if (prev.mine !== next.mine) return false;
  return true;
});
