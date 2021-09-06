import React from 'react'
import styled from 'styled-components';
import { Fonts } from '../../../Constants';
import { Flex } from '../../../Styled/Generic';
import SelectMessage, { SelectMessageProps } from './SelectMessage/SelectMessage';

const ChatInteractive = (props: ChatInteractiveProps) => {
  const { message } = props;

  if (!message) return <></>;

  if (message.type === "selection")
    return (
      <MessageContainer data-testid={props.testid}>
        <SelectMessage {...message.value} />
      </MessageContainer>
    )

  return (
    <MessageContainer>
      <MessageButton data-testid={props.testid} onClick={message.onClick}>
        {message.value}
      </MessageButton>
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

const MessageButton = styled.button`
  flex: 1;
  outline: none;
  border: none;
  padding: 1rem;
  background-color: blue;
  color: white;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  font-family: ${Fonts.어그로체B};
  transition: background-color 100ms;

  &:hover {
    background-color: navy;
    color: white;
  }

  &:active {
    transition: none;
    background-color: blueviolet;
  }
`;


export type ChatInteractiveProps = {
  message: ChatMessages[keyof ChatMessages]
  testid?: string
}

export type ChatMessages = {
  select: SelectMessage,
  button: ButtonMessage,
}

export type SelectMessage = {
  type: "selection"
  value: SelectMessageProps
}

export type ButtonMessage = {
  type: "button"
  value: string
  onClick: () => void
}

export default ChatInteractive
