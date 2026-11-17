export const TEAM_COLORS = {
  "McLaren": {
    primary: "#FF8000",
    gradient: "linear-gradient(90deg, #FF8000 0%, #FFA834 100%)",
    accent: "#000000",
    textColor: "#000",
  },
  "Ferrari": {
    primary: "#E80020",
    gradient: "linear-gradient(90deg, #E80020 0%, #FF2A45 100%)",
    accent: "#FFFFFF",
    textColor: "#FFF",
  },
  "Red Bull Racing": {
    primary: "#3671C6",
    gradient: "linear-gradient(90deg, #1B3F8B 0%, #3671C6 100%)",
    accent: "#CC1E4A",
    textColor: "#FFF",
  },
  "Mercedes": {
    primary: "#27F4D2",
    gradient: "linear-gradient(90deg, #18A68E 0%, #27F4D2 100%)",
    accent: "#000000",
    textColor: "#000",
  },
  "Aston Martin": {
    primary: "#229971",
    gradient: "linear-gradient(90deg, #17654B 0%, #229971 100%)",
    accent: "#CEDC00",
    textColor: "#FFF",
  },
  "Alpine": {
    primary: "#0093CC",
    gradient: "linear-gradient(90deg, #0093CC 0%, #FF87BC 100%)",
    accent: "#FF87BC",
    textColor: "#FFF",
  },
  "Williams": {
    primary: "#64C4FF",
    gradient: "linear-gradient(90deg, #004694 0%, #64C4FF 100%)",
    accent: "#FFFFFF",
    textColor: "#FFF",
  },
  "Kick Sauber": {
    primary: "#52E252",
    gradient: "linear-gradient(90deg, #2D9E2D 0%, #52E252 100%)",
    accent: "#000000",
    textColor: "#000",
  },
  "Sauber": {
    primary: "#52E252",
    gradient: "linear-gradient(90deg, #2D9E2D 0%, #52E252 100%)",
    accent: "#000000",
    textColor: "#000",
  },
  "Haas": {
    primary: "#B6BABD",
    gradient: "linear-gradient(90deg, #787D81 0%, #B6BABD 100%)",
    accent: "#E6002B",
    textColor: "#000",
  },
  "RB": {
    primary: "#6692FF",
    gradient: "linear-gradient(90deg, #2A48A5 0%, #6692FF 100%)",
    accent: "#FFFFFF",
    textColor: "#FFF",
  },
  "Racing Bulls": {
    primary: "#6692FF",
    gradient: "linear-gradient(90deg, #2A48A5 0%, #6692FF 100%)",
    accent: "#FFFFFF",
    textColor: "#FFF",
  },
};

export const getTeamColor = (teamName = "") => {
  if (!teamName) {
    return {
      primary: "#7A828E",
      gradient: "linear-gradient(90deg, #515661 0%, #7A828E 100%)",
      accent: "#FFF",
      textColor: "#FFF",
    };
  }

  const normalized = Object.keys(TEAM_COLORS).find((key) =>
    teamName.toLowerCase().includes(key.toLowerCase())
  );

  return (
    TEAM_COLORS[normalized] || {
      primary: "#E10600",
      gradient: "linear-gradient(90deg, #B00500 0%, #E10600 100%)",
      accent: "#FFF",
      textColor: "#FFF",
    }
  );
};
