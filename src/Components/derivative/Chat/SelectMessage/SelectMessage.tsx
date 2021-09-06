import React from 'react'
import TriviaChatTestIds from '../../../specific/TriviaChat/testid';
import { SelectButton, SelectButtonContainer } from "./styled"

const SelectMessage = (props: SelectMessageProps) => {
  const { choices, onSelect, correct } = props;
  /* Why need state?
  <chosen> is a state for blocking anohter selection after selecting one.

  SelectMessage is rendered as a record of a chat,
  which means it's hard to change props when after it's rendered.
  To change props, have to find target records from state.records and change it's props.
  To make it happen, all records should be searched, or another idMap should be provided.
  */
  const [chosen, setChosen] = React.useState<string>();
  function onClick(item: string) {
    if (chosen === undefined) {
      setChosen(item);
      onSelect(item);
    }
  }

  return (
    <SelectButtonContainer>
      {choices.map((item, i) => (
        <SelectButton
          key={i}
          data-testid={item === correct
            ? TriviaChatTestIds.correctAnswer + `-${i}`
            : TriviaChatTestIds.falseAnswer + `-${i}`
          }
          chosen={item === chosen}
          correct={item === correct}
          onClick={onClick.bind(null, item)}
          children={item}
        />
      ))}
    </SelectButtonContainer>
  )
}


export type SelectMessageProps = {
  choices: string[]
  correct?: string
  onSelect: (selected: string) => void
}

export default SelectMessage
