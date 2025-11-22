"use client"
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { ReactNode, useMemo } from "react";

const ConvexClerkProvider = ({ children } : {children: ReactNode}) => {
  const convex = useMemo(() => {
    // Only initialize in browser, skip during SSR/build
    if (typeof window === 'undefined') {
      // Return a minimal client instance for SSR
      // This will be replaced on the client side
      const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
      if (!convexUrl) {
        // During build, create a client with a dummy URL that won't be used
        // The real client will be created on the client side
        return new ConvexReactClient('https://dummy.convex.cloud');
      }
      return new ConvexReactClient(convexUrl);
    }
    
    // Client-side initialization
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!convexUrl) {
      console.error(
        "Missing NEXT_PUBLIC_CONVEX_URL environment variable. " +
        "Set it in your .env.local file or in your deployment settings."
      );
      // Still create a client to prevent crashes, but it won't work
      return new ConvexReactClient('https://dummy.convex.cloud');
    }
    return new ConvexReactClient(convexUrl);
  }, []);

  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string} appearance={{
      layout: {
        socialButtonsVariant: "iconButton",
        logoImageUrl: '/icons/auth-logo.svg',
      },
      variables: {
        colorBackground: "#15171c",
        colorPrimary : "",
        colorText: "white",
        colorInputBackground: "#1b1f29",
        colorInputText: "white",
      }
    }}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};

export default ConvexClerkProvider;