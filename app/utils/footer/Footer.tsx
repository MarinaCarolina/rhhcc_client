'use client';
import Link from 'next/link';
import Image from 'next/image';
import useNavbarStore from '@/app/utils/navbar/useNavbarStore';
import useIcons from '@/app/utils/icons/useIcons';

const Footer = () => {
  const { navigation } = useNavbarStore();
  const { socialMedia } = useIcons();

  return (
    <footer className="bottom-0 left-0 w-full bg-white dark:bg-gray-900 z-40 shadow-lg">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="flex flex-col items-center space-y-2">
            {/* Логотип */}
            <Link href="/" className="flex items-center">
              <Image
                className="dark:invert"
                src="/RHHCC_logo_grey-01.png"
                alt="rhhcc logo"
                width={180}
                height={38}
                priority
              />
            </Link>

            {/* Соцсети */}
            <div className="flex items-center space-x-4">
              {socialMedia.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    href={item.href}
                    key={item.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  >
                    <IconComponent className="w-6 h-6" aria-label={item.name} />
                    <span className="sr-only">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Навигация */}
          <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400 font-medium">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="hover:underline p-4"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
