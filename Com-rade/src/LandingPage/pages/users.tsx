export default function Users() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-background text-foreground px-4 py-8">
      <div className="w-full max-w-4xl flex flex-col justify-center items-center gap-6">
        <h1 className="text-4xl font-bold text-center">Users</h1>
        <p className="text-lg text-center max-w-3xl mb-8">
          Com-rade is designed to serve various user groups within the
          Philippine Army, each with specific needs and responsibilities.
        </p>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          <div className="p-6 rounded-lg bg-muted/50">
            <h3 className="text-xl font-semibold mb-3">Infantry Units</h3>
            <p className="text-lg">
              Front-line soldiers who need reliable communication tools for
              tactical coordination, situational awareness, and mission
              reporting.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-muted/50">
            <h3 className="text-xl font-semibold mb-3">Commanders</h3>
            <p className="text-lg">
              Field officers and senior leadership who require comprehensive
              oversight tools, strategic communication capabilities, and
              decision-making support.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-muted/50">
            <h3 className="text-xl font-semibold mb-3">Support Teams</h3>
            <p className="text-lg">
              Medical, logistics, and technical support personnel who need
              specialized communication channels and coordination tools.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-muted/50">
            <h3 className="text-xl font-semibold mb-3">
              Dispatch/Control Center
            </h3>
            <p className="text-lg">
              Central command personnel responsible for monitoring operations,
              coordinating resources, and maintaining overall situational
              awareness.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
