import "./globals.css";

export const metadata = {
  title: "YFX Research — Intelligence. Data. Execution.",
  description:
    "Quantitative research and technology company focused on building AI-powered trading systems.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
