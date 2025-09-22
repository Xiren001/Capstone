export default function Infra() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-background text-foreground px-4 py-8">
      <div className="w-full max-w-4xl flex flex-col justify-center items-center gap-6">
        <h1 className="text-4xl font-bold text-center">Infrastructure</h1>
        <p className="text-lg text-center max-w-3xl mb-8">
          Resilient and scalable infrastructure designed for mission-critical
          operations in diverse environments.
        </p>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          <div className="p-6 rounded-lg bg-muted/50">
            <h3 className="text-xl font-semibold mb-3">
              Cloud-Native Architecture
            </h3>
            <p className="text-lg">
              Containerized microservices deployed across multiple cloud regions
              for high availability and disaster recovery.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-muted/50">
            <h3 className="text-xl font-semibold mb-3">Edge Computing</h3>
            <p className="text-lg">
              Distributed computing nodes deployed at strategic locations for
              low-latency operations and offline capabilities.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-muted/50">
            <h3 className="text-xl font-semibold mb-3">Mesh Networking</h3>
            <p className="text-lg">
              Self-healing network topology that maintains connectivity even
              when individual nodes are compromised.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-muted/50">
            <h3 className="text-xl font-semibold mb-3">Auto-Scaling</h3>
            <p className="text-lg">
              Dynamic resource allocation based on demand, ensuring optimal
              performance during peak operations.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-muted/50">
            <h3 className="text-xl font-semibold mb-3">Backup & Recovery</h3>
            <p className="text-lg">
              Automated backup systems with point-in-time recovery and
              cross-region data replication.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-muted/50">
            <h3 className="text-xl font-semibold mb-3">
              Monitoring & Analytics
            </h3>
            <p className="text-lg">
              Real-time system monitoring with predictive analytics for
              proactive maintenance and optimization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
