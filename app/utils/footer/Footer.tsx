'use client';
import Link from 'next/link';
import Image from 'next/image';
import useNavbarStore from '@/app/utils/navbar/useNavbarStore';
import useIcons from '@/app/utils/icons/useIcons';

const Footer = () => {
  const { navigation } = useNavbarStore();
  const { socialMedia } = useIcons();

  return (
    <footer className="bottom-0 left-0 w-full bg-white z-40 shadow-lg overflow-hidden">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 flex flex-col md:flex-row justify-between items-center md:items-start">
        {/* Логотип и Соцсети */}
        <div className="flex flex-col items-center md:items-start space-y-4 md:space-y-2 text-center md:text-left">
          <Link
            href="/"
            className="flex items-center justify-center md:justify-start"
          >
            <Image
              src="/RHHCC_logo_grey-01.png"
              alt="rhhcc logo"
              width={180}
              height={38}
              priority
            />
          </Link>

          <div className="flex space-x-4">
            {socialMedia.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  href={item.href}
                  key={item.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-900"
                >
                  <IconComponent />
                  <span className="sr-only">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Навигация */}
        <div className="mt-6 md:mt-0 flex flex-wrap justify-center md:justify-end space-x-4 text-gray-500 font-medium">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} className="hover:underline">
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
