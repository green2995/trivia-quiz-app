import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '..';
import CategoryList from '../Components/specific/CategoryList';
import { categoriesSlice } from '../Store/trivia/categories/slice';

const Home = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.trivia.categories);

  React.useEffect(() => {
    if (categories.data === null) {
      dispatch(categoriesSlice.actions.loadCategories());
    }
  }, [])

  return (
    <main>
      {categories.data !== null && (
        <CategoryList items={categories.data} />
      )}
    </main>
  )
}

export default Home
