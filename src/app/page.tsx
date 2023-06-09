'use client';

import { Sidebar } from '@/utils/layout/sidebar/Sidebar';
import { useState } from 'react';
import { MarkerDetail } from '@/utils/components/markerViewer/MarkerDetail';
import Image from 'next/image';
import menuIcn from '../assets/icons/menu.svg';

export default function Home() {
  const [sidebarStatus, setSidebarStatus] = useState<boolean>(true);

  return (
    <main className="h-screen flex flex-col  bg-slate-300">
      <div className="flex items-center w-full border-b-2 border-slate-700 shadow-md bg-white">
        <Image
          src={menuIcn}
          alt="menu"
          className="cursor-pointer"
          width={60}
          height={60}
          onClick={() => setSidebarStatus(!sidebarStatus)}
        />
        <h1 className="text-slate-600 mx-auto text-xl font-bold">Marker App</h1>
      </div>
      <div className="relative flex flex-1 p-1">
        <Sidebar isOpen={sidebarStatus} />
        <div className="flex-1 p-2 overflow-hidden">
          <MarkerDetail />
        </div>
      </div>
    </main>
  );
}
