import "./globals.css";
import VisitorCounter from "./Component/VisitorCounter";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Invisible visitor tracking */}
        <VisitorCounter />

        {/* Visible pages */}
        {children}
      </body>
    </html>
  );
}
