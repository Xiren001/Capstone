export default function Security() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-background text-foreground px-4 py-8">
      <div className="w-full max-w-4xl flex flex-col justify-center items-center gap-6">
        <h1 className="text-4xl font-bold text-center">Security</h1>
        <p className="text-lg text-center max-w-3xl mb-8">
          Military-grade security measures ensuring the highest level of
          protection for sensitive communications and data.
        </p>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          <div className="p-6 rounded-lg bg-muted/50">
            <h3 className="text-xl font-semibold mb-3">
              End-to-End Encryption
            </h3>
            <p className="text-lg">
              AES-256 encryption for all communications, ensuring that only
              intended recipients can access message content.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-muted/50">
            <h3 className="text-xl font-semibold mb-3">
              Multi-Factor Authentication
            </h3>
            <p className="text-lg">
              Layered authentication system combining passwords, biometrics, and
              hardware tokens for maximum security.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-muted/50">
            <h3 className="text-xl font-semibold mb-3">
              Zero-Trust Architecture
            </h3>
            <p className="text-lg">
              Never trust, always verify approach with continuous authentication
              and authorization for all network access.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-muted/50">
            <h3 className="text-xl font-semibold mb-3">
              Secure Key Management
            </h3>
            <p className="text-lg">
              Advanced cryptographic key distribution and rotation system
              ensuring secure communication channels.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-muted/50">
            <h3 className="text-xl font-semibold mb-3">Audit Logging</h3>
            <p className="text-lg">
              Comprehensive logging and monitoring of all system activities for
              security analysis and compliance.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-muted/50">
            <h3 className="text-xl font-semibold mb-3">Network Isolation</h3>
            <p className="text-lg">
              Segmented network architecture with strict access controls and
              intrusion detection systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
