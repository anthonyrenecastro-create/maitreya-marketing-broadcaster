import Link from "next/link";

export default function HomePage(): JSX.Element {
  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: "48px 20px" }}>
      <h1 style={{ fontSize: "clamp(2rem, 4vw, 4rem)", marginBottom: 12 }}>Maitreya Marketing Broadcaster</h1>
      <p style={{ fontSize: "1.1rem", maxWidth: 620 }}>
        Content Graph orchestration for multi-tenant campaign generation and cross-channel propagation.
      </p>
      <Link href="/demo-org/campaigns">Open campaign workspace</Link>
    </main>
  );
}
