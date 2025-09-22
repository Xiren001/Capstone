export default function Tutorials() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-background text-foreground px-4 py-8">
      <div className="w-full max-w-4xl flex flex-col justify-center items-center gap-6">
        <h1 className="text-4xl font-bold text-center">Tutorials</h1>
        <p className="text-lg text-center max-w-3xl mb-8">
          Comprehensive tutorials to help you master Com-rade's features and
          capabilities.
        </p>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          <div className="p-6 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors cursor-pointer">
            <h3 className="text-xl font-semibold mb-3">Basic Communication</h3>
            <p className="text-lg mb-4">
              Learn how to send secure messages, make voice calls, and share
              location data with your unit.
            </p>
            <div className="text-sm text-muted-foreground">
              Duration: 10 minutes
            </div>
          </div>
          <div className="p-6 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors cursor-pointer">
            <h3 className="text-xl font-semibold mb-3">GPS Navigation</h3>
            <p className="text-lg mb-4">
              Master the GPS features, waypoint navigation, and tactical mapping
              capabilities.
            </p>
            <div className="text-sm text-muted-foreground">
              Duration: 15 minutes
            </div>
          </div>
          <div className="p-6 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors cursor-pointer">
            <h3 className="text-xl font-semibold mb-3">Group Operations</h3>
            <p className="text-lg mb-4">
              Coordinate with multiple units, manage group communications, and
              share tactical information.
            </p>
            <div className="text-sm text-muted-foreground">
              Duration: 20 minutes
            </div>
          </div>
          <div className="p-6 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors cursor-pointer">
            <h3 className="text-xl font-semibold mb-3">Emergency Protocols</h3>
            <p className="text-lg mb-4">
              Critical procedures for emergency situations, distress signals,
              and backup communication methods.
            </p>
            <div className="text-sm text-muted-foreground">
              Duration: 25 minutes
            </div>
          </div>
          <div className="p-6 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors cursor-pointer">
            <h3 className="text-xl font-semibold mb-3">
              Security Best Practices
            </h3>
            <p className="text-lg mb-4">
              Essential security protocols, encryption management, and
              operational security guidelines.
            </p>
            <div className="text-sm text-muted-foreground">
              Duration: 30 minutes
            </div>
          </div>
          <div className="p-6 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors cursor-pointer">
            <h3 className="text-xl font-semibold mb-3">Advanced Features</h3>
            <p className="text-lg mb-4">
              Explore advanced capabilities including custom protocols,
              integration tools, and administrative functions.
            </p>
            <div className="text-sm text-muted-foreground">
              Duration: 45 minutes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
