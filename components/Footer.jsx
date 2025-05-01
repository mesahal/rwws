import Link from "next/link";
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="RWWS Logo"
                width={32}
                height={32}
                className="h-6 w-6 object-contain"
              />
              <span className="text-lg font-bold">RWWS</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Empowering communities and creating lasting change through
              compassion and action.
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://web.facebook.com/rwws.2018"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/WomenRwws"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/@rwws-rwwelfaresociety4149"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/rwws-rw-welfare-society-61983a232/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/programs"
                  className="text-muted-foreground hover:text-primary"
                >
                  Our Programs
                </Link>
              </li>
              <li>
                <Link
                  href="/impact-stories"
                  className="text-muted-foreground hover:text-primary"
                >
                  Impact Stories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Get Involved
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Contact
            </h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                <span className="text-muted-foreground">
                  889/B (Ground Floor) Nur Ahmed Road,
                  <br />
                  Jamal Khan, Chittagong
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-muted-foreground mr-2" />
                <span className="text-muted-foreground">+880-1730 79 4514</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-muted-foreground mr-2" />
                <span className="text-muted-foreground">rowwsbd@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} RWWS. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              {/* <Link
                href="/privacy-policy"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Terms of Service
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
