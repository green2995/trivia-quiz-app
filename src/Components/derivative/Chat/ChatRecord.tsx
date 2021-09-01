import React from 'react'
import styled from 'styled-components';
import { Fonts } from '../../../Constants';
import { Flex } from '../../../Styled/Generic';

const ChatRecord = (props: ChatRecordProps) => {
  const { sender, message, mine } = props;

  if (message.type === "jsx")
    return (
      <MessageContainer>
        {message.value}
      </MessageContainer>
    )

  if (message.type === "selection")
    return (
      <MessageContainer>
        <SelectButtonContainer>
          {message.value.map((item, i) => {
            return (
              <SelectButton
                onClick={() => message.onSelect(item)}
                key={i}
              >
                {item}
              </SelectButton>
            )
          })}
        </SelectButtonContainer>
      </MessageContainer>
    )

  if (message.type === "button")
    return (
      <MessageContainer>
        <MessageButton onClick={message.onClick}>
          {message.value}
        </MessageButton>
      </MessageContainer>
    )

  if (mine)
    return (
      <MessageContainer lean={"right"}>
        <Flex>
          <Message mine tag={message.tag}>
            {message.value}
          </Message>
        </Flex>
      </MessageContainer>
    )

  return (
    <MessageContainer lean={"left"}>
      <ProfileImg />
      <Flex>
        <ProfileName>{sender}</ProfileName>
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
  border-radius: 1rem;
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

    if (tag === "benefit") return `
    background-color: mediumseagreen;
    font-weight: bold;
    `;
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

const SelectButtonContainer = styled(Flex)`
  flex: 1;
  border-radius: 1rem;
  overflow: hidden;
`;

const SelectButton = styled.button`
  outline: none;
  border: none;
  padding: 1rem;
  min-width: 50%;
  box-shadow: inset 0 0 0 0.5px white;
  background-color: blue;
  color: white;
  cursor: pointer;
  font-family: ${Fonts.어그로체B};
  font-size: 1rem;
  transition: background-color 100ms;

  &:hover {
    background-color: navy;
    font-weight: bold;
    color: white;
  }
  
  &:active {
    transition: none;
    background-color: blueviolet;
  }
`;


export type ChatRecordProps = {
  sender: string
  message: ChatMessages[keyof ChatMessages]
  mine?: boolean
}

export type ChatMessages = {
  text: TextMessage,
  select: SelectMessage,
  button: ButtonMessage,
  jsx: JSXMessage,
}

export type TextMessage = {
  type: "text"
  value: string
  tag?: "warning" | "important" | "benefit"
}

export type SelectMessage = {
  type: "selection"
  value: string[]
  onSelect: (selected: string) => void
}

export type ButtonMessage = {
  type: "button"
  value: string
  onClick: () => void
}

export type JSXMessage = {
  type: "jsx",
  value: JSX.Element,
}

export default ChatRecord
