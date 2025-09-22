export default function GettingStarted() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-background text-foreground px-4 py-8">
      <div className="w-full max-w-4xl flex flex-col justify-center items-center gap-6">
        <h1 className="text-4xl font-bold text-center">Getting Started</h1>
        <p className="text-lg text-center max-w-3xl mb-8">
          Quick start guide to get you up and running with Com-rade in minutes.
        </p>
        <div className="space-y-6 max-w-3xl w-full">
          <div className="p-6 rounded-lg bg-muted/50 border-l-4 border-primary">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold">System Requirements</h3>
            </div>
            <p className="text-lg ml-12">
              Ensure your device meets the minimum requirements: Android 8.0+ or
              iOS 12+, 2GB RAM, and stable internet connection.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-muted/50 border-l-4 border-primary">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold">Installation</h3>
            </div>
            <p className="text-lg ml-12">
              Download Com-rade from the official military app store or receive
              the installation package from your commanding officer.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-muted/50 border-l-4 border-primary">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold">Authentication Setup</h3>
            </div>
            <p className="text-lg ml-12">
              Complete the secure registration process using your military ID
              and set up multi-factor authentication.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-muted/50 border-l-4 border-primary">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <h3 className="text-xl font-semibold">First Mission</h3>
            </div>
            <p className="text-lg ml-12">
              Join your unit's communication channel and complete the initial
              training scenarios to familiarize yourself with the interface.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
