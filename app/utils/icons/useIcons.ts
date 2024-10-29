import { create } from 'zustand';
import { FaTelegramPlane, FaVk, FaYoutube } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';

const useIcons = create((set) => ({
  socialMedia: [
    { name: 'Telegram', href: 'https://t.me/rhhcc', icon: FaTelegramPlane },
    { name: 'VK', href: 'https://vk.com/rhhcc', icon: FaVk },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/rhhcc',
      icon: AiFillInstagram,
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@RHHCC.official',
      icon: FaYoutube,
    },
  ],
}));

export default useIcons;
