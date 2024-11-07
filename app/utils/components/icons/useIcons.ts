import { create } from 'zustand';
import {
  FaCalendarAlt,
  FaEdit,
  FaTelegramPlane,
  FaVk,
  FaYoutube,
} from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
import { IconType } from 'react-icons';
import { PiMapPinSimpleAreaFill } from 'react-icons/pi';
import { MdDeleteForever, MdDriveEta } from 'react-icons/md';
import { TbCategoryFilled } from 'react-icons/tb';
import { GiFullMotorcycleHelmet, GiTireTracks } from 'react-icons/gi';
import { IoMdTimer } from 'react-icons/io';

interface UseIconsProps {
  socialMedia: { name: string; href: string; icon: IconType }[];
  CalendarIcon: IconType;
  ClassIcon: IconType;
  PilotIcon: IconType;
  CarIcon: IconType;
  ResultIcon: IconType;
  MapIcon: IconType;
  TrackIcon: IconType;
  EditIcon: IconType;
  DeleteIcon: IconType;
}

const useIcons = create<UseIconsProps>((set) => ({
  socialMedia: [
    { name: 'telegram', href: 'https://t.me/rhhcc', icon: FaTelegramPlane },
    { name: 'vk', href: 'https://vk.com/rhhcc', icon: FaVk },
    {
      name: 'instagram',
      href: 'https://www.instagram.com/rhhcc',
      icon: AiFillInstagram,
    },
    {
      name: 'youtube',
      href: 'https://www.youtube.com/@RHHCC.official',
      icon: FaYoutube,
    },
  ],
  CalendarIcon: FaCalendarAlt,
  ClassIcon: TbCategoryFilled,
  PilotIcon: GiFullMotorcycleHelmet,
  CarIcon: MdDriveEta,
  ResultIcon: IoMdTimer,
  MapIcon: PiMapPinSimpleAreaFill,
  TrackIcon: GiTireTracks,
  EditIcon: FaEdit,
  DeleteIcon: MdDeleteForever,
}));

export default useIcons;
