import { FaLinkedin, FaInstagram, FaYoutube, FaFacebook, FaReddit, FaXTwitter } from "react-icons/fa6";

const socials = [
  // { name: "LinkedIn", href: "https://www.linkedin.com", Icon: FaLinkedin },
  { name: "Instagram", href: "https://www.instagram.com/stylofront", Icon: FaInstagram },
  { name: "YouTube", href: "https://www.youtube.com/@stylofront", Icon: FaYoutube },
  { name: "Facebook", href: "https://www.facebook.com/share/p/17gU4REAC1/", Icon: FaFacebook },
  { name: "Reddit", href: "https://www.reddit.com/user/Less_Geologist_2675", Icon: FaReddit },
  { name: "X", href: "https://x.com/stylofront", Icon: FaXTwitter },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12 shadow-inner">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 text-center text-sm text-muted-foreground md:flex-row md:text-left">
        <p className="font-body">© 2025 StyloFront. All rights reserved.</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {socials.map((social) => {
            const IconComponent = social.Icon;
            return (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition hover:scale-110 hover:border-primary hover:bg-primary/10 hover:text-primary hover:shadow-lg hover:shadow-primary/20"
                aria-label={social.name}
              >
                <IconComponent className="text-lg" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
