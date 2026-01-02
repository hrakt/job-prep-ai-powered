import { ReactNode } from "react";
import { ClerkProvider as OriginalClerkProvider } from "@clerk/nextjs";

export function ClerkProvider({ children }: { children: ReactNode }) {
    return <OriginalClerkProvider
        appearance={{
            cssLayerName: "vendor",
            variables: {
                colorBackground: "var(--color-background)",
                borderRadius: "var(--radius-md)",
                colorBorder: "var(--color-secondary-foreground)",
                colorPrimary: "var(--color-primary)",
                colorText: "var(--color-foreground)",
                fontFamily: "var(--font-sans)",
                colorDanger: "var(--color-destructive)",
                colorForeground: "var(--color-foreground)",
                colorPrimaryForeground: "var(--color-primary-foreground)",
                colorInput: "var(--color-input)",
                colorInputForeground: "var(--color-text)",
                colorMuted: "var(--color-muted)",
                colorMutedForeground: "var(--color-muted-foreground)",
                colorNeutral: "var(--color-secondary-foreground)",
                colorRing: "var(--color-ring)",
                colorShadow: "var(--color-shadow-color)",
                colorSuccess: "var(--color-success)",
                colorWarning: "var(--color-warning)",
                fontFamilyButtons: "var(--font-sans)",
            }
        }}>
        {children}
    </OriginalClerkProvider>
}