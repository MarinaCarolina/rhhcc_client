'use client';
import useTrackStore from '@/app/utils/store/useTrackStore';
import Table from '@/app/utils/components/table/Table';

export default function Results() {
  const { tracks } = useTrackStore();

  const columns = [
    { header: 'Название', key: 'name' },
    { header: 'Адрес', key: 'address' },
    { header: 'Длина круга', key: 'lap_length' },
    { header: 'Рекорд RHHCC', key: 'best_time' },
  ];

  return (
    <div>
      <Table columns={columns} data={tracks} itemsPerPage={20} />
    </div>
  );
}
