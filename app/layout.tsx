import type { Metadata } from "next";
import "./globals.css";

const APP_URL = process.env.APP_URL ?? "http://localhost:3000";
const SERVICE_NAME = "Clay Shrinkage Calculators";
const SERVICE_DESCRIPTION =
  "Free pottery and ceramics calculators: clay shrinkage percentage, predicted fired size, and the wet size needed to hit a target fired size.";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: SERVICE_NAME,
    template: `%s — ${SERVICE_NAME}`,
  },
  description: SERVICE_DESCRIPTION,
  openGraph: {
    title: SERVICE_NAME,
    description: SERVICE_DESCRIPTION,
    url: APP_URL,
    siteName: SERVICE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: SERVICE_NAME,
    description: SERVICE_DESCRIPTION,
  },
  other: {
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? { "google-site-verification": process.env.GOOGLE_SITE_VERIFICATION }
      : {}),
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
