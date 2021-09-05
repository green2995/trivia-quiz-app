import React from 'react'
import Chat from '../derivative/Chat';
import { USER_NICK, useTriviaChat } from './TriviaChat/useTriviaChat';
import EventHandler from './TriviaChat/EventHandler';
import { TriviaCategory } from '../../Interfaces/Category';
import styled from 'styled-components';
import { Fonts } from '../../Constants';
import { AbsoluteFill } from '../../Styled/Generic';

const TriviaChat = (props: TriviaChatProps) => {
  const [state, event, dispatch, sync] = useTriviaChat();

  return (
    <Conatiner>
      {/* <Title>{props.category.name}</Title> */}
      <ChatContainer>
        <Chat
          currentUser={USER_NICK}
          interactive={state.interactive}
          records={state.records}
          interactiveVisible={state.interactiveVisible}
        />
      </ChatContainer>
      <EventHandler
        event={event}
        dispatch={dispatch}
        sync={sync}
        category={props.category}
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

const ChatContainer = styled.div`
  width: 100%;
  height: 100%;
`;

type TriviaChatProps = {
  category: Omit<TriviaCategory, "id"> & {id?: number}
}

export default TriviaChat
