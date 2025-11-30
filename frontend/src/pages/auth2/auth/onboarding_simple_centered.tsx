import type React from 'react';
import Onboarding from './partials/onboarding';

const OnboardingSimpleCentered: React.FC = () => {
  return (
    <div className="container py-base-4xl">
      <div className="row items-start justify-center">
        <div className="col-12 md:col-7 lg:col-6 xl:col-5">
          <Onboarding />
        </div>
      </div>
    </div>
  );
};

export default OnboardingSimpleCentered;
