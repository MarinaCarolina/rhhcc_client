'use client';
import Link from 'next/link';
import useNavbarStore from '@/app/utils/components/navbar/useNavbarStore';

function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

const NavLinks = () => {
  const { activeNav, navigation } = useNavbarStore();

  return (
    <div className="flex flex-col items-start sm:flex-row sm:items-center sm:space-x-4">
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          aria-current={activeNav === item.href ? 'page' : undefined}
          className={classNames(
            activeNav === item.href
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'rounded-md px-3 py-2 text-sm font-medium'
          )}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
