export default function AboutUs() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-background text-foreground px-4 py-8">
      <div className="w-full max-w-4xl flex flex-col justify-center items-center gap-6">
        <h1 className="text-4xl font-bold text-center">About Us</h1>
        <div className="space-y-8 max-w-3xl">
          <div className="text-center">
            <p className="text-lg">
              Com-rade is developed by a dedicated team of software engineers,
              security experts, and military technology specialists committed to
              enhancing communication capabilities for the Philippine Army.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-muted/50">
            <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
            <p className="text-lg">
              To provide cutting-edge, secure communication solutions that
              enhance operational effectiveness, ensure soldier safety, and
              strengthen national defense capabilities.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-muted/50">
            <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
            <p className="text-lg">
              To be the leading provider of military communication technology,
              setting the standard for secure, reliable, and innovative
              solutions in defense communications.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-muted/50">
            <h3 className="text-xl font-semibold mb-3">Our Values</h3>
            <ul className="text-lg space-y-2">
              <li>
                • <strong>Security First:</strong> Every feature is designed
                with military-grade security
              </li>
              <li>
                • <strong>Reliability:</strong> Mission-critical systems demand
                unwavering dependability
              </li>
              <li>
                • <strong>Innovation:</strong> Continuous improvement through
                cutting-edge technology
              </li>
              <li>
                • <strong>Service:</strong> Dedicated support for those who
                serve our nation
              </li>
            </ul>
          </div>

          <div className="text-center">
            <p className="text-lg">
              For more information or support, contact our team through official
              military channels or visit our documentation center.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
