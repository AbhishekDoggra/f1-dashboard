import styled, { keyframes } from "styled-components";
import { getTeamColor } from "../constants/teamColors";

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const ChartContainer = styled.main`
  max-width: 1400px;
  margin: 1.5rem auto;
  padding: 0 1.5rem 3rem 1.5rem;
`;

const PodiumRibbon = styled.div`
  background: linear-gradient(90deg, #1b202c 0%, #151821 100%);
  border-left: 4px solid #ffd700;
  border-radius: 6px;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;

  .leader-tag {
    font-size: 0.85rem;
    color: #ffd700;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .leader-name {
    font-size: 1.15rem;
    font-weight: 800;
    color: #fff;
  }
`;

const BarsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
`;

const RowWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  height: 44px;
`;

const RankBadge = styled.div`
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-family: "Orbitron", sans-serif;
  font-weight: 800;
  font-size: 0.95rem;
  flex-shrink: 0;

  background: ${(props) => {
    if (props.$rank === 1)
      return "linear-gradient(135deg, #FFD700 0%, #B8860B 100%)";
    if (props.$rank === 2)
      return "linear-gradient(135deg, #E0E0E0 0%, #9E9E9E 100%)";
    if (props.$rank === 3)
      return "linear-gradient(135deg, #D48C46 0%, #8C4B18 100%)";
    return "#171a24";
  }};

  color: ${(props) => (props.$rank <= 3 ? "#000" : "#8b92a5")};
  border: 1px solid ${(props) => (props.$rank <= 3 ? "transparent" : "#272c3d")};
  box-shadow: ${(props) =>
    props.$rank === 1 ? "0 0 12px rgba(255, 215, 0, 0.45)" : "none"};
`;

const BarTrack = styled.div`
  flex: 1;
  height: 100%;
  background: #12151e;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  border: 1px solid #1c2130;
  display: flex;
  align-items: center;
`;

const AnimatedBar = styled.div`
  height: 100%;
  width: ${(props) => props.$width};
  min-width: max-content;
  max-width: 100%;
  background: ${(props) => props.$gradient};
  border-radius: 4px;
  transition: width 0.75s cubic-bezier(0.25, 1, 0.5, 1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.85rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
  position: relative;
  gap: 0.85rem;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    background-size: 200% 100%;
    animation: ${shimmer} 3s infinite linear;
    pointer-events: none;
  }
`;

const BarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  white-space: nowrap;
  z-index: 1;
  flex-shrink: 0;

  .number-pill {
    background: rgba(0, 0, 0, 0.45);
    color: #fff;
    font-size: 0.75rem;
    font-weight: 800;
    padding: 0.15rem 0.4rem;
    border-radius: 3px;
    font-family: "Orbitron", sans-serif;
  }

  .name {
    font-weight: 700;
    font-size: 0.95rem;
    color: ${(props) => props.$textColor};
    text-shadow: ${(props) =>
      props.$textColor === "#FFF" ? "0 1px 3px rgba(0,0,0,0.8)" : "none"};
  }

  .team-label {
    font-size: 0.75rem;
    font-weight: 600;
    opacity: 0.85;
    color: ${(props) => props.$textColor};
  }
`;

const BarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  z-index: 1;
  flex-shrink: 0;

  .race-points {
    background: rgba(0, 0, 0, 0.35);
    color: #fff;
    font-size: 0.75rem;
    font-weight: 800;
    padding: 0.15rem 0.45rem;
    border-radius: 3px;
    font-family: "Orbitron", sans-serif;
  }

  .total-points {
    font-family: "Orbitron", sans-serif;
    font-weight: 800;
    font-size: 0.95rem;
    color: ${(props) => props.$textColor};
    text-shadow: ${(props) =>
      props.$textColor === "#FFF" ? "0 1px 3px rgba(0,0,0,0.8)" : "none"};
  }
`;

const EmptyState = styled.div`
  background: #12151e;
  border: 1px dashed #272c3d;
  border-radius: 8px;
  padding: 4rem 2rem;
  text-align: center;
  margin-top: 2rem;

  h3 {
    font-size: 1.4rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 0.5rem;
  }

  p {
    color: #8b92a5;
    font-size: 0.95rem;
  }

  .hint {
    margin-top: 1rem;
    display: inline-block;
    background: #171b26;
    padding: 0.4rem 1rem;
    border-radius: 4px;
    font-family: monospace;
    color: #27f4d2;
    font-size: 0.85rem;
  }
`;

export const BarChartRace = ({ data, activeTab }) => {
  const isDrivers = activeTab === "drivers";

  // Primary source: computed cumulative standings from f1_analysis
  let items = isDrivers
    ? data?.driverStandings || []
    : data?.constructorStandings || [];

  // Fallback: if raw race results are received directly from ingestion
  if (items.length === 0 && Array.isArray(data?.results) && data.results.length > 0) {
    if (isDrivers) {
      items = data.results
        .map((row, idx) => ({
          rank: parseInt(row.Position || row.position, 10) || idx + 1,
          driver: (row.Driver || row.driver || "Unknown Driver").trim(),
          team: (row.Team || row.team || "Unknown Team").trim(),
          carNumber: row.No || row.no || "",
          racePoints: parseFloat(row.Points || row.points || 0) || 0,
          totalPoints: parseFloat(row.Points || row.points || 0) || 0,
        }))
        .sort((a, b) => b.totalPoints - a.totalPoints || a.rank - b.rank);
    } else {
      const teamPointsMap = {};
      data.results.forEach((row) => {
        const team = (row.Team || row.team || "Unknown Team").trim();
        const pts = parseFloat(row.Points || row.points || 0) || 0;
        teamPointsMap[team] = (teamPointsMap[team] || 0) + pts;
      });
      items = Object.entries(teamPointsMap)
        .map(([team, totalPoints]) => ({
          team,
          totalPoints,
          racePoints: totalPoints,
        }))
        .sort((a, b) => b.totalPoints - a.totalPoints)
        .map((item, idx) => ({ ...item, rank: idx + 1 }));
    }
  }

  if (items.length === 0) {
    return (
      <ChartContainer>
        <EmptyState>
          <h3>🏁 Waiting for Live Telemetry Stream...</h3>
          <p>
            Make sure your <strong>Ingestion</strong>,{" "}
            <strong>Processing</strong>, and <strong>Output</strong> services
            are running.
          </p>
          <div className="hint">{`WebSocket connected to ${import.meta.env.VITE_WS_URL}`}</div>
        </EmptyState>
      </ChartContainer>
    );
  }

  // Calculate highest score to scale the bar widths
  const maxPoints = Math.max(...items.map((i) => i.totalPoints), 25);
  const leader = items[0];

  return (
    <ChartContainer>
      {leader && (
        <PodiumRibbon>
          <span className="leader-tag">
            👑 Championship Leader ({isDrivers ? "Drivers" : "Constructors"})
          </span>
          <span className="leader-name">
            {isDrivers ? leader.driver : leader.team} — {leader.totalPoints} PTS
          </span>
        </PodiumRibbon>
      )}

      <BarsList>
        {items.map((item) => {
          const teamColors = getTeamColor(item.team);

          // Base length fits the driver details + points badge snugly
          const minWidth = isDrivers ? "13.5rem" : "15.5rem";
          const pointsRatio =
            maxPoints > 0 ? Math.max(0, item.totalPoints) / maxPoints : 0;
          // The bar length is determined by total points: driver details + points expansion
          const barWidth = `calc(${minWidth} + ${pointsRatio} * (100% - ${minWidth}))`;

          return (
            <RowWrapper key={isDrivers ? item.driver : item.team}>
              <RankBadge $rank={item.rank}>P{item.rank}</RankBadge>

              <BarTrack>
                <AnimatedBar $width={barWidth} $gradient={teamColors.gradient}>
                  <BarLeft $textColor={teamColors.textColor}>
                    {isDrivers && item.carNumber && (
                      <span className="number-pill">#{item.carNumber}</span>
                    )}
                    <span className="name">
                      {isDrivers ? item.driver : item.team}
                    </span>
                  </BarLeft>

                  <BarRight $textColor={teamColors.textColor}>
                    {item.racePoints > 0 && (
                      <span className="race-points">+{item.racePoints}</span>
                    )}
                    <span className="total-points">{item.totalPoints} PTS</span>
                  </BarRight>
                </AnimatedBar>
              </BarTrack>
            </RowWrapper>
          );
        })}
      </BarsList>
    </ChartContainer>
  );
};
