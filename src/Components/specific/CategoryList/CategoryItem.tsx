import React from 'react'
import { TriviaCategory } from '../../../Interfaces/Category'
import styled from "styled-components"
import { AbsoluteFill, Flex } from '../../../Styled/Generic'
import { Link } from 'react-router-dom'
import { Fonts } from '../../../Constants'
import { a } from '@react-spring/web'

const CategoryItem = (props: CategoryItemProps) => {
  return (
    <Container>
      <Link
        data-testid={`category-item-${props.name.toLowerCase().replace(/\s/g, "")}`}
        to={{
          pathname: "/trivia",
          search: `?category=${props.name}`,
        }}>
        <Content>
          <ThumbnailContainer>
            {props.id === -1
              ? <RandomThumbnail />
              : <Thumbnail src={thumbnails[props.id]} />
            }
          </ThumbnailContainer>
          <Text>
            {props.name}
          </Text>
        </Content>
      </Link>
    </Container>
  )
}

const RandomThumbnail = () => {
  const thumbnailArr = Object.values(thumbnails);

  const rowCount = 3;
  const columnCount = 3;

  const rows = Array(rowCount).fill(0).map((_, i) => {
    const columns = Array(columnCount).fill(0).map((_, j) => {
      const flatIndex = i * rowCount + j;
      const src = thumbnailArr[flatIndex];
      return (
        <div key={flatIndex} style={{ width: `${(1 / columnCount) * 100}%`, float: "left" }}>
          <img src={src} />
        </div>
      )
    })

    return (
      <div key={i} style={{ height: `${(1 / rowCount) * 100}%`, overflow: "hidden" }}>
        {columns}
      </div>
    )
  })

  return (
    <RandomThumbnailContainer>
      {rows}
    </RandomThumbnailContainer>
  )
}

const Container = styled(Flex)`
  padding: 1rem;
  border-radius: 1rem;
  overflow: hidden;
  height: 10rem;
  margin: 1rem;
  user-select: none;
  box-shadow: 0 0.8rem 2rem 0 rgba(0,0,0,0.2);
`;

const Content = styled(AbsoluteFill)`
  justify-content: center;
  align-items: center;
  background-color: black;
  display: flex;
`;

const ThumbnailContainer = styled(a.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Thumbnail = styled.img`
  width: 150%;
`;

const Text = styled.div`
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-shadow: 2px 5px 10px black;
  font-family: ${Fonts.어그로체B};
  font-size: 0.8rem;
  padding: 1rem;
  background-color: rgba(0,0,0,0.3);
  transition-property: font-size, background-color;
  transition-duration: 100ms;
  width: 100%;
  height: 100%;

  &:hover {
    font-size: 1rem;
    background-color: rgba(0,0,0,0.5);
  }

`;

const RandomThumbnailContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const thumbnails: Record<number, string> = {
  //General Knowledge
  9: "https://images.unsplash.com/photo-1593061231114-1798846fd643?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  //Entertainment: Books
  10: "https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  //Entertainment: Film
  11: "https://images.unsplash.com/photo-1535016120720-40c646be5580?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  //Entertainment: Music
  12: "https://images.unsplash.com/photo-1458560871784-56d23406c091?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80",
  //Entertainment: Musical
  13: "https://images.unsplash.com/photo-1503095396549-807759245b35?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80",
  //Entertainment: Televison
  14: "https://images.unsplash.com/photo-1559026657-5c4d087156cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
  //Entertainment: Video game
  15: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  //Entertainment: Board game
  16: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=889&q=80",
  //Science & Nature
  17: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  //Science: Computers
  18: "https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=676&q=80",
  //Science: Mathe
  19: "https://images.unsplash.com/photo-1509869175650-a1d97972541a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  //Mythology
  20: "https://images.unsplash.com/photo-1552481902-9ef2babf332d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=675&q=80",
  //Sports
  21: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  //Geography
  22: "https://images.unsplash.com/photo-1579159278799-8add1e53b3fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  //History
  23: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
  //Politics
  24: "https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80",
  //Art
  25: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1047&q=80",
  //Celebrities
  26: "https://images.unsplash.com/photo-1592230961081-c16795380f97?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
  //Animals
  27: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
  //Vehicles
  28: "https://images.unsplash.com/photo-1549375812-2ab575f006f2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
  //Comics
  29: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  //Science: Gadgets
  30: "https://images.unsplash.com/photo-1515940175183-6798529cb860?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=887&q=80",
  //Entertainment: Japanese Anime & Manga
  31: "https://images.unsplash.com/photo-1531501410720-c8d437636169?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=967&q=80",
  //Entertainment: Cartoons & Animations
  32: "https://images.unsplash.com/photo-1515041219749-89347f83291a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80",
}

type CategoryItemProps = TriviaCategory

export default CategoryItem
