import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import Brand from './Brand';
import Navigation from './Navigation';
import UserNavigation from './UserNavigation';
import TeamNavigation from './TeamNavigation';
import ProductNavigation from './ProductNavigation';

const AppShell = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const { t } = useTranslation('common');

  return (
    <div className="flex h-full flex-col">
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Brand />
          <nav className="flex items-center space-x-4">
            <ProductNavigation />
            <TeamNavigation />
            <UserNavigation />
          </nav>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto bg-gray-100">
        <div className="container mx-auto px-4 py-8">{children}</div>
      </main>
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <p>&copy; {new Date().getFullYear()} CheatGPT</p>
          <nav className="flex items-center space-x-4">
            <a href="/about" className="hover:text-gray-400">
              About
            </a>
            <a href="/contact" className="hover:text-gray-400">
              Contact
            </a>
            <a href="/privacy" className="hover:text-gray-400">
              Privacy
            </a>
            <a href="/terms" className="hover:text-gray-400">
              Terms
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default AppShell;
