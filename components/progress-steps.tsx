"use client";

import React, {useEffect, useRef} from "react";
import {gsap} from "gsap";
import {Flip} from "gsap/all";
import {cn} from "@/lib/utils";

gsap.registerPlugin(Flip);

interface SteppedProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: number;
  currentStep: number;
}

export default function Component({steps, currentStep, className, ...props}: SteppedProgressProps) {
  const progressRef = useRef<HTMLDivElement>(null);
  const activeStepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!progressRef.current || !activeStepRef.current) return;

    const state = Flip.getState(activeStepRef.current);

    const stepProgressElements = progressRef.current.children;
    const currentStepProgress = stepProgressElements[currentStep] as HTMLElement;

    if (currentStepProgress) {
      currentStepProgress.appendChild(activeStepRef.current);
      activeStepRef.current.classList.add("w-full");
    }

    Flip.from(state, {
      duration: 0.3,
      ease: "power2.out",
      absolute: true,
    });
  }, [currentStep]);

  return (
    <div
      className={cn("relative flex h-2 w-full gap-2.5", className)}
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={steps}
      aria-valuenow={currentStep}
      {...props}
    >
      <div
        ref={activeStepRef}
        className="absolute z-10 h-full rounded-full bg-primary"
      />
      <div
        ref={progressRef}
        className="flex flex-1 gap-2.5"
      >
        {Array.from({length: steps}).map((_, index) => (
          <div
            key={index}
            className="relative flex-1 rounded-full bg-primary/20"
          ></div>
        ))}
      </div>
    </div>
  );
}
