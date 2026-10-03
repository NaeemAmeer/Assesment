import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mini Softphone Panel",
  description: "A small call panel driven by a mock telephony engine.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html suppressHydrationWarning lang="en" className="h-full antialiased">
      <body
        suppressHydrationWarning
        className="min-h-full bg-slate-950 text-slate-50"
      >
        {children}
      </body>
    </html>
  );
}
