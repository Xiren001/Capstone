export default function Frontend() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-background text-foreground px-4 py-8">
      <div className="w-full max-w-4xl flex flex-col justify-center items-center gap-6">
        <h1 className="text-4xl font-bold text-center">
          Frontend Technologies
        </h1>
        <p className="text-lg text-center max-w-3xl mb-8">
          Modern, responsive, and secure frontend technologies powering
          Com-rade's user interface.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
          <div className="p-6 rounded-lg bg-muted/50">
            <h3 className="text-xl font-semibold mb-3">React 19</h3>
            <p className="text-lg">
              Latest React framework with concurrent features, improved
              performance, and modern development patterns.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-muted/50">
            <h3 className="text-xl font-semibold mb-3">TypeScript</h3>
            <p className="text-lg">
              Type-safe development ensuring code reliability, better developer
              experience, and reduced runtime errors.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-muted/50">
            <h3 className="text-xl font-semibold mb-3">Tailwind CSS</h3>
            <p className="text-lg">
              Utility-first CSS framework for rapid UI development with
              consistent design systems and responsive layouts.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-muted/50">
            <h3 className="text-xl font-semibold mb-3">Vite</h3>
            <p className="text-lg">
              Fast build tool and development server with hot module replacement
              and optimized production builds.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-muted/50">
            <h3 className="text-xl font-semibold mb-3">Radix UI</h3>
            <p className="text-lg">
              Accessible, unstyled UI components providing robust foundations
              for complex user interfaces.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-muted/50">
            <h3 className="text-xl font-semibold mb-3">React Router</h3>
            <p className="text-lg">
              Declarative routing for React applications with dynamic route
              matching and navigation management.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
