import { FaLinkedin, FaInstagram, FaYoutube, FaFacebook, FaReddit, FaXTwitter } from "react-icons/fa6";

const socials = [
  { name: "LinkedIn", href: "https://www.linkedin.com", Icon: FaLinkedin },
  { name: "Instagram", href: "https://www.instagram.com", Icon: FaInstagram },
  { name: "YouTube", href: "https://www.youtube.com", Icon: FaYoutube },
  { name: "Facebook", href: "https://www.facebook.com", Icon: FaFacebook },
  { name: "Reddit", href: "https://www.reddit.com", Icon: FaReddit },
  { name: "X", href: "https://x.com", Icon: FaXTwitter },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-12 shadow-inner backdrop-invert-0">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 text-center text-sm text-gray-600 md:flex-row md:text-left">
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
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition hover:scale-110 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-500/20"
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
