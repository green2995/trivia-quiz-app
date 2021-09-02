import React from 'react'
import styled from 'styled-components'
import { a, config, useTransition } from 'react-spring'
import { getAbsoluteOffset } from '../../Utils/layout/getAbsoluteOffset';
import ChatRecord, { ChatRecordProps } from './Chat/ChatRecord'

const Chat = (props: ChatProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const transitions = useTransition(props.records, {
    from: { opacity: 0, x: -100 },
    enter: { opacity: 1, x: 0 },
    leave: { opacity: 0, x: -100, height: 0 },
    config: config.stiff
  });

  React.useEffect(() => {
    if (containerRef.current) {
      // containerRef.current.scrollTo({
      //   top: containerRef.current.scrollHeight,
      //   behavior: "smooth",
      // })
      const { top } = getAbsoluteOffset(containerRef.current);
      window.scrollTo({
        top: top + containerRef.current.clientHeight - window.innerHeight,
        behavior: "smooth",
      });
    }
  }, [props.records])

  return (
    <Container ref={containerRef}>
      {transitions((spring, item, transition, i) => (
        <a.div style={spring} key={i}>
          <ChatRecord
            mine={props.currentUser === item.sender.name}
            {...item}
          />
        </a.div>
      ))}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  padding-bottom: 1rem;
  /* height: 80vh;
  overflow-y: scroll; */

  /* Hide scrollbar for Chrome, Safari and Opera */
  /* &::-webkit-scrollbar {
    display: none;
  } */

  /* Hide scrollbar for IE, Edge and Firefox */
  /* -ms-overflow-style: none;  IE and Edge */
  /* scrollbar-width: none;  Firefox */
`;

type ChatProps = {
  records: ChatRecordProps[]
  currentUser: string
}

export default Chat
