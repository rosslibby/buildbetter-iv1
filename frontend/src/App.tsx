import { useState } from "react";
import styled from "styled-components";
import { GlobalStyles } from "./GlobalStyles";
import { MomentCard } from "./moments/components/MomentCard";
import { emptyMoment, moments } from "./moments/data";
import { Moment } from './moments/data'

const App = () => {
  const [cards, setCards] = useState<Moment[]>(moments)
  const updateCardData = (data: Moment) => {
    setCards(cards => cards.map(card => card.id === data.id ? data : card))
  }
  const removeCard = (id: number) => setCards(cards => cards.filter(card => card.id !== id))

  return (
    <AppShell>
      <GlobalStyles />
      <ColumnWrapper>
        <h1>BuildBetter Moments</h1>
        <MomentStackWrapper>
          {cards.map(card => (
            <MomentCard
              key={`moment_${card.id}`}
              moment={card}
              handleChanges={updateCardData}
              removeCard={removeCard}
            />
          ))}
        </MomentStackWrapper>
      </ColumnWrapper>
    </AppShell>
  );
};

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
`;

const AppShell = styled.div`
  height: 100%;
  width: 100%;
  padding: 48px;
`;

const MomentStackWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 300px;
`;

export default App;
