import React from 'react'
import styled from 'styled-components'
import { getAbsoluteOffset } from '../../Utils/layout/getAbsoluteOffset';
import ChatRecord, { ChatRecordProps } from './Chat/ChatRecord'

const Chat = (props: ChatProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (containerRef.current) {
      const {top} = getAbsoluteOffset(containerRef.current);
      window.scrollTo({
        top: top + containerRef.current.clientHeight - window.innerHeight,
        behavior: "smooth",
      });
    }
  }, [props.records])

  return (
    <Container ref={containerRef}>
      {props.records.map((record, i) => (
        <ChatRecord
          key={i}
          mine={props.currentUser === record.sender}
          {...record}
        />
      ))}
    </Container>
  )
}

const Container = styled.div`
  max-width: 600px;
`;

type ChatProps = {
  records: ChatRecordProps[]
  currentUser: string
}

export default Chat
