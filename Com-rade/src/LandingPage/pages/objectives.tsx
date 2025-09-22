export default function Objectives() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-background text-foreground px-4 py-8">
      <div className="w-full max-w-4xl flex flex-col justify-center items-center gap-6">
        <h1 className="text-4xl font-bold text-center">Objectives</h1>
        <div className="space-y-6 max-w-3xl">
          <div className="p-6 rounded-lg bg-muted/50">
            <h3 className="text-xl font-semibold mb-3">
              Real-time Field Coordination
            </h3>
            <p className="text-lg">
              Enable seamless communication and coordination between field units
              in real-time, ensuring rapid response and efficient mission
              execution.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-muted/50">
            <h3 className="text-xl font-semibold mb-3">
              Decentralized, Resilient Operations
            </h3>
            <p className="text-lg">
              Build a robust system that can operate independently of
              centralized infrastructure, ensuring continuity even in
              challenging environments.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-muted/50">
            <h3 className="text-xl font-semibold mb-3">
              Encrypted Voice & Data
            </h3>
            <p className="text-lg">
              Provide secure communication channels with end-to-end encryption
              for both voice communications and data transmission.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
