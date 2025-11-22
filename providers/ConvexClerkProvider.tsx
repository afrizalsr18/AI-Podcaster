"use client"
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { ReactNode, useMemo } from "react";

// Create client with fallback to allow build to succeed
// The real URL should be set in environment variables
const getConvexClient = () => {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || 'https://placeholder.convex.cloud';
  return new ConvexReactClient(convexUrl);
};

const ConvexClerkProvider = ({ children } : {children: ReactNode}) => {
  const convex = useMemo(() => getConvexClient(), []);

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