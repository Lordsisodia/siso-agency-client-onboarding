
import { OnboardingChat } from '@/components/onboarding/OnboardingChat';

export default function SocialOnboarding() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-siso-bg to-siso-bg/95 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl h-[80vh]">
        <OnboardingChat />
      </div>
    </div>
  );
}
