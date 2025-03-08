
import { CardStats } from "./types";

export const generateRandomStats = (): CardStats[] => {
  return [
    { label: "Resources", value: Math.floor(Math.random() * 200) + 100 },
    { label: "Downloads", value: Math.floor(Math.random() * 5000) + 1000 },
    { label: "Users", value: Math.floor(Math.random() * 1000) + 500 },
    { label: "Rating", value: (Math.random() * 1 + 4).toFixed(1) }
  ];
};
