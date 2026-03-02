import React from 'react';

const Footer: React.FC = () => {
    const navLinks = [
        { href: '#about', label: 'About' },
        { href: '#projects', label: 'Projects' },
        { href: '#contact', label: 'Contact' },
      ];

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

  return (
    <footer className="bg-white/20 dark:bg-black/20 border-t border-gray-200 dark:border-white/10 py-8">
      <div className="container mx-auto px-6 text-center text-gray-500 dark:text-gray-400">
        <div className="flex justify-center space-x-6 mb-4">
            {navLinks.map((link) => (
                <a 
                    key={link.href} 
                    href={link.href} 
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-sm hover:text-slate-900 dark:hover:text-white transition-colors duration-300 glowing-text-hover relative cursor-pointer"
                >
                    {link.label}
                </a>
            ))}
        </div>
        <p className="text-xs">
            &copy; {new Date().getFullYear()} Utkarsh Adlak. All Rights Reserved.
        </p>
        <p className="text-xs mt-2">
            Made with ❤️ by ME.
        </p>
        <style>{`
            .glowing-text-hover:hover { 
                text-shadow: 0 0 8px rgba(59, 130, 246, 0.5); 
            }
            .dark .glowing-text-hover:hover { 
                text-shadow: 0 0 8px rgba(216, 236, 248, 0.7); 
            }
        `}</style>
      </div>
    </footer>
  );
};

export default Footer;
