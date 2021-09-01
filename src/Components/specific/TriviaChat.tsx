import React from 'react'
import Chat from '../derivative/Chat';
import { USER_NICK, useTriviaChat } from './TriviaChat/useTriviaChat';
import EventHandler from './TriviaChat/EventHandler';

const TriviaChat = (props: TriviaChatProps) => {
  const [state, event, dispatch, sync] = useTriviaChat();

  React.useEffect(() => {
    event.action.emit("loadQuestions", props.category);
  }, [])

  return (
    <>
      <Chat
        currentUser={USER_NICK}
        records={state.records}
      />
      <EventHandler
        event={event}
        dispatch={dispatch}
        sync={sync}
      />
    </>
  )
}

type TriviaChatProps = {
  category?: string
}

export default TriviaChat
