'use client';
import Link from 'next/link';
import Image from 'next/image';

const Logo = () => (
  <Link href="/">
    <Image
      src="/RHHCC_logo_white-01.png"
      alt="RHHCC logo"
      width={150}
      height={38}
      priority
    />
  </Link>
);

export default Logo;
