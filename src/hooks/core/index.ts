
// Core hooks exports
export * from "../use-auto-scroll";
export * from "../use-click-outside";
export * from "../use-mobile";
export * from "../use-pagination";
export * from "../use-toast";

// Resolve type ambiguities by using explicit exports
export type { ChatMessage } from "../use-chat-assistant";
export * from "../use-plan-chat-assistant";
export * from "../use-project-planning";

// Export additional hooks
export * from "../useAuthSession";
export * from "../useBasicUserData";
export * from "../useDashboardStats";
export * from "../useEvents";
export * from "../useGoogleAuth";
export * from "../useNotifications";
export * from "../useOnboardingAuth";
export * from "../useOnboardingChat";
export * from "../usePoints";
export * from "../usePortfolio";
export * from "../useProfileData";
export * from "../useProfileImage";
export * from "../useProjectDocumentation";
export * from "../useUser";
export * from "../useViewportLoading";
