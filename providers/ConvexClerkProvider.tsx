"use client"
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { ReactNode, useMemo } from "react";

const ConvexClerkProvider = ({ children } : {children: ReactNode}) => {
  const convex = useMemo(() => {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!convexUrl) {
      throw new Error(
        "Missing NEXT_PUBLIC_CONVEX_URL environment variable. " +
        "Set it in your .env.local file or in your deployment settings."
      );
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