import React from 'react'
import styled from 'styled-components'
import { a, config, useTransition, useSpring } from 'react-spring'
import { getAbsoluteOffset } from '../../Utils/layout/getAbsoluteOffset';
import ChatRecord, { ChatRecordProps } from './Chat/ChatRecord'
import ChatInteractive, { ChatInteractiveProps } from './Chat/ChatInteractive';
import { Flex } from '../../Styled/Generic';

const Chat = (props: ChatProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const interactiveContainerRef = React.useRef<HTMLDivElement>(null);
  const recordContainerRef = React.useRef<HTMLDivElement>(null);
  const [recordContainerSpring, springApi] = useSpring(() => ({
    paddingBottom: 10,
    config: config.gentle,
  }))

  const transitions = useTransition(props.records, {
    from: { opacity: 0, x: -100 },
    enter: { opacity: 1, x: 0 },
    config: config.stiff
  });

  const transition_interactive = useTransition(props.interactive, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    config: config.slow
  })

  function scrollToBottom(behavior: "auto" | "smooth" = "auto") {
    if (!containerRef.current) return;
    recordContainerRef.current?.scrollTo({
      top: recordContainerRef.current.scrollHeight,
      behavior,
    })
  }

  React.useEffect(() => {
    if (interactiveContainerRef.current) {
      springApi.start({
        paddingBottom: props.interactiveVisible ? interactiveContainerRef.current.clientHeight : 0,
        onChange: () => scrollToBottom(),
        onStart: () => scrollToBottom(),
      });
    }

    scrollToBottom("smooth");
  }, [props.records, props.interactive, props.interactiveVisible])

  return (
    <Container ref={containerRef}>
      <RecordContainer ref={recordContainerRef} style={recordContainerSpring}>
        {transitions((spring, item, transition, i) => (
          <a.div style={spring} key={i}>
            <ChatRecord
              mine={props.currentUser === item.sender.name}
              {...item}
            />
          </a.div>
        ))}
      </RecordContainer>

      <div style={{ position: "relative", display: props.interactiveVisible ? "block" : "none" }}>
        <InteractiveContainer ref={interactiveContainerRef}>
          {transition_interactive((spring, item) => (
            <a.div style={spring}>
              {item && (<ChatInteractive {...item} />)}
            </a.div>
          ))}
        </InteractiveContainer>
      </div>
    </Container>
  )
}

const Container = styled(Flex)`
  width: 100%;
  height: 100%;
  /* max-width: 600px; */
  
  /* @media only screen and (min-width: 600px) {
    max-height: 600px;
  } */

  justify-content: space-between;
  box-shadow: 0 0 20px 0 rgba(0,0,0,0.2);
  background-color: rgba(255,255,255,0.5);
  user-select: none;
`;

const RecordContainer = styled(a.div)`
  overflow-y: scroll;
  overflow-x: hidden;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`;

const InteractiveContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  min-height: 14rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

type ChatProps = {
  records: ChatRecordProps[]
  interactive?: ChatInteractiveProps
  currentUser: string
  interactiveVisible?: boolean
}

export default Chat
