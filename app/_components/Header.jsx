import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const Header = () => {
    return (
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="md:ml-6 relative h-8 w-8 overflow-hidden rounded-md bg-primary">
                <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-primary-foreground">
                  P
                </div>
              </div>
              <span className="text-xl font-bold">PortfolioHub</span>
            </Link>
          </div>

          <nav className="md:mr-6 hidden md:flex md:items-center md:gap-6">
            <Link href="/create" className="text-sm font-medium transition-colors hover:text-primary">
              Create
            </Link>
            <Link href="/showcase" className="text-sm font-medium transition-colors hover:text-primary">
              Showcase
            </Link>
                    <SignedOut>
                        <SignInButton>
                            <button className="cta-button-small hover:text-primary">Sign In</button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
          </nav>

          <button variant="outline" size="icon" className="md:hidden">
            <span className="sr-only">Toggle menu</span>
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
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
        </header>
    )
}
export default Header;