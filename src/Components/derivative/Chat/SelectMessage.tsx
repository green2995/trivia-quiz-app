import React from 'react'
import TriviaChatTestIds from '../../specific/TriviaChat/testid';
import { SelectButton, SelectButtonContainer } from "./SelectMessage/styled"

const SelectMessage = (props: SelectMessageProps) => {
  const { choices, onSelect, correct } = props;
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
