"use client";

import {useState, useRef} from "react";
import {KnockProvider, KnockFeedProvider, NotificationIconButton, NotificationFeedPopover} from "@knocklabs/react";
// Required CSS import, unless you're overriding the styling
import "@knocklabs/react/dist/index.css";
import {useAuth} from "@clerk/nextjs";

export const NotificationsFeed = () => {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);
  const {userId, isLoaded} = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!userId) {
    return null;
  }

  return (
    <KnockProvider
      apiKey={process.env.NEXT_PUBLIC_KNOCK_API_KEY!}
      userId={userId}
    >
      <KnockFeedProvider feedId={process.env.NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID!}>
        <>
          <NotificationIconButton
            ref={notifButtonRef}
            onClick={(e) => setIsVisible(!isVisible)}
          />
          <NotificationFeedPopover
            buttonRef={notifButtonRef}
            isVisible={isVisible}
            onClose={() => setIsVisible(false)}
          />
        </>
      </KnockFeedProvider>
    </KnockProvider>
  );
};
