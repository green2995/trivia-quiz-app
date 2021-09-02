import React from 'react'
import {SelectButton, SelectButtonContainer} from "./SelectMessage/styled"

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
          shouldCareChosen={chosen !== undefined}
          shouldCareCorrect={correct !== undefined}
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
