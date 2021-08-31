import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '..';
import CategoryList from '../Components/specific/CategoryList';
import { triviaSlice } from '../Store/trivia/slice';

const Home = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.trivia.categories);

  React.useEffect(() => {
    dispatch(triviaSlice.actions.loadCategories());
  }, [])

  return (
    <main>
      <CategoryList items={categories.data} />
    </main>
  )
}

export default Home
