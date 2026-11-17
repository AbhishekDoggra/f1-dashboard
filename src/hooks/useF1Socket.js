import { useState, useEffect, useRef } from "react";

const WS_URL = import.meta.env.VITE_WS_URL || "ws://localhost:3002";
const HTTP_URL = import.meta.env.VITE_HTTP_URL || "http://localhost:3002";

export const useF1Socket = () => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("connecting"); // 'connecting' | 'connected' | 'disconnected'
  const [countdown, setCountdown] = useState(null);
  const socketRef = useRef(null);
  const countdownIntervalRef = useRef(null);

  // Fetch initial REST snapshot if available
  useEffect(() => {
    fetch(`${HTTP_URL}/api/latest`)
      .then((res) => res.json())
      .then((json) => {
        if (json?.data) {
          setData(json.data);
        }
      })
      .catch(() => {
        // Output service may not be running yet, harmless
      });
  }, []);

  // Handle 10-second season-end countdown
  useEffect(() => {
    if (data?.isSeasonEnd) {
      setCountdown(10);
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
      setCountdown(null);
      clearInterval(countdownIntervalRef.current);
    }

    return () => clearInterval(countdownIntervalRef.current);
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
            setData(message.payload);
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
