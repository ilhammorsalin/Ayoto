import { Logo } from "./logo";
const Facebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Pinterest = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.168 0 7.41 2.967 7.41 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.592 0 12.017 0z" />
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-10 text-center">
        {/* Logo Section */}
        <Logo className="scale-110" light />

        {/* Brand Statement */}
        <p className="font-serif italic text-lg md:text-xl text-background/90 max-w-md">
          "Furniture for quiet living."
        </p>

        {/* Location & Contact Info */}
        <div className="flex flex-col gap-2 text-sm text-background/60">
          <p>Dhaka, Bangladesh</p>
          <a
            href="mailto:info@ayoto.com"
            id="footer-email-link"
            className="hover:text-primary transition-colors"
          >
            info@ayoto.com
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-6">
          <a
            href="https://www.facebook.com/ayotofurniture"
            target="_blank"
            rel="noopener noreferrer"
            id="footer-fb-link"
            className="text-background/60 hover:text-white transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="size-5" />
          </a>
          <a
            href="https://www.instagram.com/ayotofurniture"
            target="_blank"
            rel="noopener noreferrer"
            id="footer-instagram-link"
            className="text-background/60 hover:text-white transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="size-5" />
          </a>
          <a
            href="#"
            id="footer-pinterest-link"
            className="text-background/60 hover:text-white transition-colors"
            aria-label="Pinterest"
          >
            <Pinterest className="size-5" />
          </a>
        </div>

        {/* Divider */}
        <div className="w-full max-w-lg h-px bg-background/10" />

        {/* Copyright */}
        <p className="text-xs text-background/40 tracking-wider">
          © 2025 Ayoto. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
