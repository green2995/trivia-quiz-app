import React from 'react'
import Chat from '../derivative/Chat';
import { USER_NICK, useTriviaChat } from './TriviaChat/useTriviaChat';
import EventHandler from './TriviaChat/EventHandler';
import { useLocation } from 'react-router-dom';
import { TriviaCategory } from '../../Interfaces/Category';
import styled from 'styled-components';
import { Fonts } from '../../Constants';
import { getAbsoluteOffset } from '../../Utils/layout/getAbsoluteOffset';

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

const Conatiner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding-top: 5rem; */
  /* padding-bottom: 5rem; */
`;

const ChatContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Title = styled.div`
  font-family: ${Fonts.어그로체B};
  padding: 1rem;
  font-size: 2rem;
  color: white;
  text-shadow: 0 2px 0 black;
`;

type TriviaChatProps = {
  category: Omit<TriviaCategory, "id"> & {id?: number}
}

export default TriviaChat
