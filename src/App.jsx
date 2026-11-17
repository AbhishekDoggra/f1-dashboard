import { useState } from "react";
import styled from "styled-components";
import { useF1Socket } from "./hooks/useF1Socket";
import { Header } from "./components/Header";
import { BarChartRace } from "./components/BarChartRace";

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Footer = styled.footer`
  margin-top: auto;
  border-top: 1px solid #1c2130;
  padding: 1rem 2rem;
  text-align: center;
  font-size: 0.8rem;
  color: #5d6579;
  background: #090b0e;

  span {
    color: #e10600;
    font-weight: 700;
  }
`;

function App() {
  const { data, status, countdown } = useF1Socket();
  const [activeTab, setActiveTab] = useState("drivers"); // 'drivers' | 'constructors'

  return (
    <AppContainer>
      <Header
        data={data}
        status={status}
        countdown={countdown}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <BarChartRace data={data} activeTab={activeTab} />

      <Footer>
        F1 Telemetry Streaming Engine • Ingestion <span>|</span> Processing <span>|</span> Output <span>|</span> Frontend
      </Footer>
    </AppContainer>
  );
}

export default App;
