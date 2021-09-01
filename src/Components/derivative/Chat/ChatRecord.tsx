import React from 'react'
import { Flex } from '../../../Styled/Generic';

const ChatRecord = (props: ChatRecordProps) => {
  const {sender, message} = props;

  if (message.type === "selection")
  return (
    <Flex style={{alignItems: "flex-start"}}>
      {message.value.map((item, i) => {
        return (
          <button onClick={() => message.onSelect(item)} key={i}>
            {item}
          </button>
        )
      })}
    </Flex>
  )

  if (message.type === "button")
  return (
    <button onClick={message.onClick}>
      {message.value}
    </button>
  )

  return (
    <div>
      {sender}: {message.value}
    </div>
  )
}


export type ChatRecordProps = {
  sender: string
  message: ChatMessage
}

export type ChatMessage = {
  type: "text"
  value: string
} | {
  type: "image"
  value: string
} | {
  type: "selection"
  value: string[]
  onSelect: (selected: string) => void
} | {
  type: "button"
  value: string
  onClick: () => void
}

export default ChatRecord
