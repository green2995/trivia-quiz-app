## 기능
- [대화형 퀴즈](https://user-images.githubusercontent.com/24871544/132313866-f431560d-46f3-4900-9993-9be752d72780.gif): 각 카테고리별로 대화형으로 퀴즈를 전개합니다.
- [다시 풀기](https://user-images.githubusercontent.com/24871544/132309978-d629a85b-b275-4054-a436-47d01eeddc61.gif): 퀴즈를 모두 푼 후에, 방금 푼 문제를 다시 풀어볼 수 있습니다.
- [이어서 풀기](https://user-images.githubusercontent.com/24871544/132309984-b4ba5bff-ff81-4458-bc98-7c93aef72d32.gif): 퀴즈를 모두 푼 후에, 해당 카테고리의 다른 문제 세트를 불러와 이어서 풀 수 있습니다. (Random카테고리의 경우 이어서 풀기 시 매번 다른 카테고리의 문제를 가져옵니다.)
- [틀린 문제 다시 풀기](https://user-images.githubusercontent.com/24871544/132310438-d95f85a7-9c2b-421a-b0ea-b696e5efa824.gif): localStorage에 저장된 틀린 문제들은 최근에 틀린 문제 순으로 /home에서 한 문제씩 다시 풀어볼 수 있습니다.
- 풀었던 문제 대비 정오답률: 지금까지 푼 문제들 중 틀린 수와 맞춘 수의 비율을 보여줍니다. /home에서 틀린 문제를 다시 풀 때에는 곧장 변경되는 것을 볼 수 있습니다.




## [사이트 바로가기](https://trivia-quiz-app-ten.vercel.app/home)




## 디렉토리 구조
```sh
./src/
├── Api: 트리비아 api 관련 디렉토리
├── Components
│   ├── derivative
│   │   └── Chat: 대화형 퀴즈 컴포넌트의 기반이 되는 컴포넌트
│   ├── generic
│   └── specific
│       ├── CategoryList: 홈 화면의 카테고리 리스트를 렌더링하는 컴포넌트
│       ├── Header: 모든 페이지 상단에 노출되는 헤더를 렌더링하는 컴포넌트
│       ├── TriviaChat: /trivia 페이지에서 사용되는 대화형 퀴즈 컴포넌트
│       └── TriviaSummary: /home 페이지 상단의 점수 및 다시 풀기를 렌더링하는 컴포넌트
├── Constants: 프로젝트 전역에서 사용하는 상수값(현재는 Fonts 하나)
├── Context: 프로젝트 전역에서 사용하는 컨텍스트
├── Hooks: 프로젝트 전역에서 유틸처럼 사용하는 훅
├── Interfaces: 프로젝트 전역에서 사용하는 인터페이스
├── Pages: 페이지 렌더링 컴포넌트
├── State: 프로적트 전역에서 사용하는 상태
├── Styled: 프로젝트 전역에서 사용하는 스타일 컴포넌트
├── System: 프로젝트 외적인 요소와의 상호작용을 담당하는 기능(파일시스템)
└── Utils: 유틸 함수 모음
```



## 상태 관리
- 대화형 퀴즈 컴포넌트가 주요 상태 관리 대상이었으며, 다양한 방식으로 상태 관리 로직을 구성해보았습니다.

- 먼저 [React.useReducer와 EventEmitter](https://github.com/monthem/trivia-quiz-app/blob/8ca80227b324c490da36b3f7b31e492e92314f75/src/Components/specific/TriviaChat/EventHandler.tsx)로 구성해보았습니다. 타이밍을 포착하기 쉽고 어떤 데이터든 변경할 수 있으며, 동기적으로 상태를 읽고 쓸 수 있기 때문에 논리 구성이 용이하다는 장점이 있었지만, 실제 프로젝트에서 활용하기에는 보일러플레이트 코드가 많고 충분히 테스팅되지 않았기 때문에 변경해야 했습니다.
- 이후 [React.useReducer와 redux-saga](https://github.com/monthem/trivia-quiz-app/blob/0914822ca4dab2ebf1508985b6912514c662dcd1/src/Components/specific/TriviaChat/saga.ts)로 리팩토링하였습니다. 먼저 @redux-js/toolkit으로 slice를 만들고 event emitter의 event에 해당하는 부분들을 [아무런 상태도 변경하지 않는 reducer](https://github.com/monthem/trivia-quiz-app/blob/0914822ca4dab2ebf1508985b6912514c662dcd1/src/Components/specific/TriviaChat/slice.ts#L87)로 바꿔서 정리했습니다. 이후 redux-saga로 event로직을 대체한 뒤, hook으로 변경하여 컴포넌트에 상태를 제공하였습니다. 이 경우, 데이터를 담당하는 부분과 렌더링을 담당하는 부분을 보다 확실하게 분리할 수 있으며 컴포넌트를 모듈화하기 용이하다는 장점이 있었으나, 글로벌 state에 접근하는 것이 번거로워지고 코드 분량이 많아지는 단점이 있었습니다.
- 최종적으로 [MobX](https://github.com/monthem/trivia-quiz-app/blob/e2c2915d315de27e0dca30ad13ec463d5a9fcdb3/src/Components/specific/TriviaChat/TriviaChatX.tsx)로 리팩토링하였습니다. 위의 두 방법에 비해 보일러플레이트 코드가 거의 없으며, 동기적으로 상태를 읽고 쓸 수 있고, 데이터 로직과 렌더링 로직을 분리할 수 있고, 글로벌 상태든 로컬 상태든 쉽게 접근할 수 있다는 장점이 있었습니다. 코드베이스가 더 커질 경우에도 논리를 구성하고 수정하고 테스팅하는 것이 용이할 것으로 보입니다.



## 테스트
- 테스트 로직은 @testing-library/react으로 구성하였습니다.
- DOM에 부여한 testid를 토대로 컴포넌트가 잘 렌더링됐는지 확인하고, 실제로 잘 기능하는지 테스트했습니다.
- 예를 들어, 아래의 테스트는 퀴즈형 컴포넌트가 실제로 점수를 잘 매기고, 풀이한 것에 대한 피드백 메세지가 생성되는지를 테스트합니다.
```ts
test("overall quiz behavior: proceed, scoring, result", async () => {
    // 문제 로딩이 끝나고 시작 버튼이 나타날 때까지 기다립니다.
    await waitStartButton();

    // 시작버튼을 클릭합니다.
    const startButton = screen.queryByTestId(TriviaChatTestIds.startButton);
    fireEvent.click(startButton!);

    // 홀수번째 문제는 틀린답을 고르고, 짝수번째 문제는 맞는 답을 고릅니다.
    for (let i = 0; i < QUESTION_SET_SIZE; i += 1) {
      const choiceMatcher = i % 2 === 0 ? correctAnswerMatcher : falseAnswerMatcher;
      const responseMatcher = i % 2 === 0
        ? new RegExp(`${TriviaChatTestIds.reactionCorrect}-${i}`)
        : new RegExp(`${TriviaChatTestIds.reactionFalse}-${i}`);

      // 선택지가 렌더링될 때까지 기다립니다.
      await waitFor5000(() => {
        expect(screen.queryAllByTestId(choiceMatcher)[0]).toBeInTheDocument();
      });

      // 지정한 선택지를 클릭합니다.
      const choiceButton = screen.queryAllByTestId(choiceMatcher)[0];
      fireEvent.click(choiceButton!);

      // 풀이에 적합한 반응메세지가 렌더링되었는지 확인합니다.
      await waitFor5000(() => {
        expect(screen.queryByTestId(responseMatcher)).toBeInTheDocument();
      });
      
      // 마지막 문제가 아니라면 "다음 문제"버튼이 렌더링될 때까지 기다립니다.
      if (i < QUESTION_SET_SIZE - 1) {
        await waitFor5000(() => {
          expect(screen.queryByTestId(nextButtonMatcher)).toBeInTheDocument();
        });

        const nextButton = screen.queryByTestId(nextButtonMatcher);
        fireEvent.click(nextButton!);
      }
    }

    // 모든 문제를 풀고 난 뒤, 결과메세지가 잘 렌더링되었는지 확인합니다.
    await waitFor5000(() => {
      expect(screen.queryByTestId(scoreTextMatcher)).toBeInTheDocument();
      expect(screen.queryByTestId(retryButtonMatcher)).toBeInTheDocument();
      expect(screen.queryByTestId(quitButtonMatcher)).toBeInTheDocument();
      expect(screen.queryByTestId(nextSetButtonMatcher)).toBeInTheDocument();
    });

    // 렌더링된 점수가 예상한 것과 같은지 확인합니다.
    const scoreText = screen.queryByTestId(scoreTextMatcher)
    expect(scoreText!.textContent).toBe(`점수: ${Math.floor(QUESTION_SET_SIZE / 2) / QUESTION_SET_SIZE * 100}점`);
})
```

- 다음의 두 컴포넌트를 테스트했습니다.
  - /src/App.test.tsx: 홈 화면 진입 시 렌더링되어야 하는 컴포넌트들(TriviaSummary, CategoryList)이 잘 렌더링되는지 테스트합니다.
  - /Pages/__test__/Trivia.test.tsx: 대화형 퀴즈 화면의 기능이 잘 동작하는지 테스트합니다.
