import VisitorCounter from "./Component/VisitorCounter";

export default function Home() {
  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      {/* Invisible visitor tracking */}
      <VisitorCounter />

      {/* Visible UI */}
      <h1>Welcome to My Website</h1>

      <p style={{ marginTop: "12px" }}>
        Visitor tracking is enabled.  
        This page is visible to users.
      </p>
    </main>
  );
}
