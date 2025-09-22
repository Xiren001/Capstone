export default function Backend() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-background text-foreground px-4 py-8">
      <div className="w-full max-w-4xl flex flex-col justify-center items-center gap-6">
        <h1 className="text-4xl font-bold text-center">Backend Technologies</h1>
        <p className="text-lg text-center max-w-3xl mb-8">
          Robust and scalable backend infrastructure designed for military-grade
          reliability and performance.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
          <div className="p-6 rounded-lg bg-muted/50">
            <h3 className="text-xl font-semibold mb-3">Node.js</h3>
            <p className="text-lg">
              High-performance JavaScript runtime for building scalable
              server-side applications with excellent concurrency.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-muted/50">
            <h3 className="text-xl font-semibold mb-3">Express.js</h3>
            <p className="text-lg">
              Minimal and flexible web framework providing robust features for
              building APIs and web applications.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-muted/50">
            <h3 className="text-xl font-semibold mb-3">WebSocket</h3>
            <p className="text-lg">
              Real-time bidirectional communication enabling instant messaging
              and live updates across all connected devices.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-muted/50">
            <h3 className="text-xl font-semibold mb-3">PostgreSQL</h3>
            <p className="text-lg">
              Advanced relational database with strong consistency, ACID
              compliance, and excellent performance characteristics.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-muted/50">
            <h3 className="text-xl font-semibold mb-3">Redis</h3>
            <p className="text-lg">
              In-memory data structure store for caching, session management,
              and real-time data processing.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-muted/50">
            <h3 className="text-xl font-semibold mb-3">JWT Authentication</h3>
            <p className="text-lg">
              Secure token-based authentication system ensuring authorized
              access and session management.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
