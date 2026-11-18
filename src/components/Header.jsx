import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(225, 6, 0, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(225, 6, 0, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(225, 6, 0, 0); }
`;

const greenPulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
`;

const HeaderContainer = styled.header`
  background: linear-gradient(180deg, #161922 0%, #0e1015 100%);
  border-bottom: 2px solid #232734;
  padding: 1.25rem 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.25rem;
`;

const BrandSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const F1LogoBadge = styled.div`
  background: #e10600;
  color: #fff;
  font-family: "Orbitron", sans-serif;
  font-weight: 900;
  font-size: 1.25rem;
  padding: 0.35rem 0.8rem;
  border-radius: 4px;
  letter-spacing: 1px;
  box-shadow: 0 0 15px rgba(225, 6, 0, 0.6);
`;

const TitleGroup = styled.div`
  h1 {
    font-size: 1.4rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #fff;
    margin: 0;
  }
  p {
    font-size: 0.85rem;
    color: #8b92a5;
    margin-top: 0.2rem;
  }
`;

const MetaPills = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const StatusPill = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.85rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  background: ${(props) =>
    props.$connected ? "rgba(39, 244, 210, 0.1)" : "rgba(225, 6, 0, 0.15)"};
  color: ${(props) => (props.$connected ? "#27f4d2" : "#ff4d4f")};
  border: 1px solid
    ${(props) =>
      props.$connected ? "rgba(39, 244, 210, 0.4)" : "rgba(225, 6, 0, 0.4)"};
`;

const StatusDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => (props.$connected ? "#27f4d2" : "#ff4d4f")};
  animation: ${greenPulse} 1.5s infinite ease-in-out;
`;

const CyclePill = styled.div`
  padding: 0.35rem 0.85rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  color: #ffd700;
  background: rgba(255, 215, 0, 0.12);
  border: 1px solid rgba(255, 215, 0, 0.35);
  font-family: "Orbitron", sans-serif;
`;

const TrackBanner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #12151e;
  border-radius: 8px;
  border-left: 4px solid #e10600;
  padding: 1rem 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const TrackInfo = styled.div`
  display: flex;
  flex-direction: column;

  .label {
    font-size: 0.75rem;
    font-weight: 700;
    color: #e10600;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .track-name {
    font-size: 1.6rem;
    font-weight: 800;
    font-family: "Orbitron", sans-serif;
    color: #fff;
    margin-top: 0.2rem;
  }
`;

const ProgressSection = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 220px;

  .progress-header {
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
    font-weight: 700;
    margin-bottom: 0.4rem;
    color: #a4adbd;
  }

  .round-number {
    color: #fff;
    font-family: "Orbitron", sans-serif;
  }
`;

const ProgressBarOuter = styled.div`
  width: 100%;
  height: 8px;
  background: #232734;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressBarInner = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #ff8000 0%, #e10600 100%);
  width: ${(props) => props.$percentage}%;
  transition: width 0.5s ease;
  box-shadow: 0 0 10px rgba(225, 6, 0, 0.8);
`;

const BottomNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const ToggleGroup = styled.div`
  display: flex;
  background: #12151e;
  border-radius: 6px;
  padding: 0.25rem;
  border: 1px solid #232734;
`;

const ToggleButton = styled.button`
  background: ${(props) => (props.$active ? "#e10600" : "transparent")};
  color: ${(props) => (props.$active ? "#fff" : "#8b92a5")};
  border: none;
  padding: 0.55rem 1.4rem;
  font-size: 0.9rem;
  font-weight: 700;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: "Titillium Web", sans-serif;

  &:hover {
    color: #fff;
    background: ${(props) => (props.$active ? "#e10600" : "#1c2130")};
  }
`;

const SeasonFinishAlert = styled.div`
  background: linear-gradient(90deg, #ff8000 0%, #e10600 100%);
  color: #fff;
  padding: 0.6rem 1.25rem;
  border-radius: 6px;
  font-weight: 800;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  animation: ${pulse} 1.5s infinite;
  font-family: "Orbitron", sans-serif;
`;

export const Header = ({
  data,
  status,
  countdown,
  activeTab,
  setActiveTab,
}) => {
  const round = data?.round || 1;
  const totalRounds = data?.totalRounds || 24;
  const cycle = data?.cycle || 1;
  const track = data?.race || "Loading Next Grand Prix...";
  const progressPct = Math.min(100, (round / totalRounds) * 100);

  return (
    <HeaderContainer>
      <TopRow>
        <BrandSection>
          <F1LogoBadge>F1</F1LogoBadge>
          <TitleGroup>
            <h1>2025 F1 Championship Bar Chart Race</h1>
            <p>Live Real-Time Streaming Telemetry Pipeline</p>
          </TitleGroup>
        </BrandSection>

        <MetaPills>
          <CyclePill>Season Cycle #{cycle}</CyclePill>
          <StatusPill $connected={status === "connected"}>
            <StatusDot $connected={status === "connected"} />
            {status === "connected" ? "Live Stream Active" : "Connecting..."}
          </StatusPill>
        </MetaPills>
      </TopRow>

      <TrackBanner>
        <TrackInfo>
          <span className="label">Current Race Weekend</span>
          <span className="track-name">🏁 {track} Grand Prix</span>
        </TrackInfo>

        <ProgressSection>
          <div className="progress-header">
            <span>SEASON PROGRESS</span>
            <span className="round-number">
              {round} / {totalRounds}
            </span>
          </div>
          <ProgressBarOuter>
            <ProgressBarInner $percentage={progressPct} />
          </ProgressBarOuter>
        </ProgressSection>
      </TrackBanner>

      <BottomNav>
        <ToggleGroup>
          <ToggleButton
            $active={activeTab === "drivers"}
            onClick={() => setActiveTab("drivers")}
          >
            🏎️ Drivers Championship
          </ToggleButton>
          <ToggleButton
            $active={activeTab === "constructors"}
            onClick={() => setActiveTab("constructors")}
          >
            🏁 Constructors Championship
          </ToggleButton>
        </ToggleGroup>

        {countdown !== null && (
          <SeasonFinishAlert>
            🏆 SEASON FINISHED! RESTARTING IN {countdown}s...
          </SeasonFinishAlert>
        )}
      </BottomNav>
    </HeaderContainer>
  );
};
