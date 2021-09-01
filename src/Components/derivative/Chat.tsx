import React from 'react'
import ChatRecord, { ChatRecordProps } from './Chat/ChatRecord'

const Chat = (props: ChatProps) => {
  return (
    <div>
      {props.records.map((record, i) => (
        <ChatRecord key={i} {...record} />
      ))}
    </div>
  )
}

type ChatProps = {
  records: ChatRecordProps[]
  currentUser: string
}

export default Chat
