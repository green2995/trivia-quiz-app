import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '..';
import { triviaSlice } from '../Store/trivia/slice';

const Home = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.trivia.categories);

  React.useEffect(() => {
    dispatch(triviaSlice.actions.loadCategories());
  }, [])

  return (
    <main>
      {categories.data.map((category) => (
        <div key={category.id}>
          {category.name}
        </div>
      ))}
    </main>
  )
}

export default Home