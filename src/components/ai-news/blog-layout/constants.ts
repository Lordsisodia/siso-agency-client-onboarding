
// Define color mappings for importance levels
export const importanceColors: Record<string, {bg: string, text: string, border: string}> = {
  "high": {
    bg: "bg-red-100",
    text: "text-red-800",
    border: "border-red-300"
  },
  "medium": {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    border: "border-yellow-300"
  },
  "low": {
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-green-300"
  },
  "default": {
    bg: "bg-gray-100",
    text: "text-gray-800",
    border: "border-gray-300"
  }
};

// Define color mappings for complexity
export const complexityColors: Record<string, string> = {
  "low": "bg-green-100 text-green-800 border-green-300",
  "medium": "bg-yellow-100 text-yellow-800 border-yellow-300",
  "high": "bg-red-100 text-red-800 border-red-300",
  "default": "bg-gray-100 text-gray-800 border-gray-300"
};

// Define event types and their colors
export const eventTypeColors: Record<string, string> = {
  "conference": "bg-blue-100 text-blue-800 border-blue-300",
  "webinar": "bg-purple-100 text-purple-800 border-purple-300",
  "hackathon": "bg-orange-100 text-orange-800 border-orange-300",
  "release": "bg-green-100 text-green-800 border-green-300",
  "announcement": "bg-yellow-100 text-yellow-800 border-yellow-300",
  "default": "bg-gray-100 text-gray-800 border-gray-300"
};
