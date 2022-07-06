import { useState } from "react";
import styled from "styled-components";
import { GlobalStyles } from "./GlobalStyles";
import { MomentCard } from "./moments/components/MomentCard";
import { emptyMoment } from "./moments/data";

const App = () => {
  return (
    <AppShell>
      <GlobalStyles />
      <ColumnWrapper>
        <h1>BuildBetter Moments</h1>
        <MomentStackWrapper>
          <MomentCard moment={emptyMoment} />
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
