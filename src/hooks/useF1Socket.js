import { useState, useEffect, useRef } from "react";

const WS_URL = import.meta.env.VITE_WS_URL || "ws://localhost:3002";
const HTTP_URL = import.meta.env.VITE_HTTP_URL || "http://localhost:3002";

export const useF1Socket = () => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("connecting"); // 'connecting' | 'connected' | 'disconnected'
  const [countdown, setCountdown] = useState(null);
  const socketRef = useRef(null);
  const countdownIntervalRef = useRef(null);

  const cumulativeStatsRef = useRef({
    cycle: null,
    drivers: {},
    constructors: {},
  });

  const enrichPayload = (payload) => {
    if (!payload) return payload;
    // If backend already provided computed standings (from f1_analysis), use directly
    if (Array.isArray(payload.driverStandings) && payload.driverStandings.length > 0) {
      return payload;
    }

    // Otherwise, compute cumulative standings from raw race results
    if (Array.isArray(payload.results) && payload.results.length > 0) {
      const cycle = payload.cycle || 1;
      const round = payload.round || 1;
      const isStart =
        payload.isSeasonStart ||
        round === 1 ||
        cumulativeStatsRef.current.cycle === null ||
        cycle !== cumulativeStatsRef.current.cycle;

      if (isStart) {
        cumulativeStatsRef.current = {
          cycle,
          drivers: {},
          constructors: {},
        };
      }

      const { drivers, constructors } = cumulativeStatsRef.current;
      const raceDriverPoints = {};
      const raceTeamPoints = {};

      for (const row of payload.results) {
        const driver = (row.Driver || row.driver || "Unknown Driver").trim();
        const team = (row.Team || row.team || "Unknown Team").trim();
        const pts = parseFloat(row.Points || row.points || 0) || 0;
        const carNo = row.No || row.no || "";

        raceDriverPoints[driver] = pts;
        raceTeamPoints[team] = (raceTeamPoints[team] || 0) + pts;

        if (!drivers[driver]) {
          drivers[driver] = {
            driver,
            team,
            carNumber: carNo,
            totalPoints: 0,
            wins: 0,
            podiums: 0,
          };
        }
        drivers[driver].totalPoints += pts;
        drivers[driver].team = team;
        if (carNo) drivers[driver].carNumber = carNo;

        const pos = parseInt(row.Position || row.position, 10);
        if (pos === 1) drivers[driver].wins += 1;
        if (pos && pos <= 3) drivers[driver].podiums += 1;

        if (!constructors[team]) {
          constructors[team] = {
            team,
            totalPoints: 0,
          };
        }
        constructors[team].totalPoints += pts;
      }

      const driverStandings = Object.values(drivers)
        .sort((a, b) => b.totalPoints - a.totalPoints || b.wins - a.wins)
        .map((d, idx) => ({
          rank: idx + 1,
          driver: d.driver,
          team: d.team,
          carNumber: d.carNumber,
          racePoints: raceDriverPoints[d.driver] || 0,
          totalPoints: d.totalPoints,
          wins: d.wins,
          podiums: d.podiums,
        }));

      const constructorStandings = Object.values(constructors)
        .sort((a, b) => b.totalPoints - a.totalPoints)
        .map((c, idx) => ({
          rank: idx + 1,
          team: c.team,
          racePoints: raceTeamPoints[c.team] || 0,
          totalPoints: c.totalPoints,
        }));

      return {
        ...payload,
        driverStandings,
        constructorStandings,
      };
    }

    return payload;
  };

  // Fetch initial REST snapshot if available
  useEffect(() => {
    fetch(`${HTTP_URL}/api/latest`)
      .then((res) => res.json())
      .then((json) => {
        if (json?.data) {
          setData(enrichPayload(json.data));
        }
      })
      .catch(() => {
        // Output service may not be running yet, harmless
      });
  }, []);

  // Handle 10-second season-end countdown
  useEffect(() => {
    let timer;
    if (data?.isSeasonEnd) {
      timer = setTimeout(() => {
        setCountdown(10);
      }, 0);
      clearInterval(countdownIntervalRef.current);

      countdownIntervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(countdownIntervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      timer = setTimeout(() => {
        setCountdown(null);
      }, 0);
      clearInterval(countdownIntervalRef.current);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(countdownIntervalRef.current);
    };
  }, [data?.isSeasonEnd, data?.round, data?.cycle]);

  // WebSocket Connection Lifecycle
  useEffect(() => {
    let reconnectTimeout;

    const connect = () => {
      setStatus("connecting");
      const ws = new WebSocket(WS_URL);
      socketRef.current = ws;

      ws.onopen = () => {
        setStatus("connected");
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          if (
            message.type === "LEADERBOARD_UPDATE" ||
            message.type === "INITIAL_STATE"
          ) {
            setData(enrichPayload(message.payload));
          }
        } catch (err) {
          console.error("Error parsing WebSocket message:", err);
        }
      };

      ws.onclose = () => {
        setStatus("disconnected");
        reconnectTimeout = setTimeout(connect, 2000);
      };

      ws.onerror = () => {
        ws.close();
      };
    };

    connect();

    return () => {
      clearTimeout(reconnectTimeout);
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  return {
    data,
    status,
    countdown,
  };
};
