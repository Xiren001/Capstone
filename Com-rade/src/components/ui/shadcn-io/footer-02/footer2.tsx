interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface Footer2Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

const Footer2 = ({
  logo = {
    src: "https://shadcnblocks.com/images/block/block-1.svg",
    alt: "Com-rade",
    title: "Comrade",
    url: "https://www.shadcnblocks.com",
  },
  tagline = "Built with Zero Trust.",
  menuItems = [
    {
      title: "About Comrade",
      links: [
        { text: "Version info", url: "#" },
        { text: "Internal build reference", url: "#" },
        { text: "Dev team", url: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { text: "Internal Helpdesk", url: "#" },
        { text: "Troubleshooting Docs", url: "#" },
        { text: "Contact DevOps", url: "#" },
      ],
    },
    {
      title: "Security",
      links: [
        { text: "Terms of Use (Internal)", url: "#" },
        { text: "Data Privacy Policy", url: "#" },
        { text: "Incident Reporting Protocol", url: "#" },
      ],
    },
    {
      title: "Social",
      links: [
        { text: "Twitter", url: "#" },
        { text: "Instagram", url: "#" },
        { text: "LinkedIn", url: "#" },
      ],
    },
  ],
  copyright = `© ${new Date().getFullYear()} Com-rade.com. All rights reserved.`,
  bottomLinks = [
    { text: "Terms and Conditions", url: "#" },
    { text: "Privacy Policy", url: "#" },
  ],
}: Footer2Props) => {
  return (
    <section className="relative w-full">
      <div className="w-full m-auto pt-16 pb-4">
        <footer>
          <div className="container m-auto px-4 grid grid-cols-2 gap-8 lg:grid-cols-4 sm:grid-cols-4">
            <div className="col-span-2 mb-8 lg:mb-0 sm:col-span-4 ">
              <div className="flex gap-2 justify-start sm:!justify-center md:!justify-center lg:!justify-center xl:!justify-center 2xl:!justify-center">
                <a href="https://shadcnblocks.com">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    title={logo.title}
                    className="h-10"
                  />
                </a>
              </div>
              <p className="mt-4 font-bold text-left sm:!text-center md:!text-center lg:!text-center xl:!text-center 2xl:!text-center">
                {tagline}
              </p>
            </div>
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 text-left sm:!text-center md:!text-center lg:!text-center xl:!text-center 2xl:!text-center font-bold">
                  {section.title}
                </h3>
                <ul className="space-y-4 text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium text-left sm:!text-center md:!text-center lg:!text-center xl:!text-center 2xl:!text-center hover:text-primary"
                    >
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-24 mb-8 flex flex-col items-center justify-between gap-4 border-t px-4 mx-auto pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
            <p>{copyright}</p>
            <ul className="flex gap-4">
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx} className="underline hover:text-primary">
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer2 };
