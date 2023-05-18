'use client';

import { Marker } from '@/interfaces/general';
import { DropDown } from '@/utils/components/dropDown/DropDown';
import React, { useState } from 'react';

interface SidebarProps {
	isOpen: boolean;
}

const markers: Marker[] = [
	{
		id: 1,
		x: 0,
		y: 0,
		z: 0,
		isActive: true,
	},
	{
		id: 2,
		x: 1,
		y: 1,
		z: 1,
		isActive: true,
	},
	{
		id: 3,
		x: 2,
		y: 2,
		z: 2,
		isActive: true,
	},
	{
		id: 4,
		x: 3,
		y: 3,
		z: 3,
		isActive: true,
	},
];

export const Sidebar = ({ isOpen }: SidebarProps) => {
	const [selectedMarker, setSelectedMarker] = useState<Marker | undefined>(
		undefined
	);

	return (
		<>
			{isOpen && (
				<div className="absolute top-0 md:relative flex flex-col w-screen md:w-56 h-full">
					<div className="flex-1 w-full text-slate-800 bg-white rounded-md p-2 shadow-xl my-2">
						<h2 className='p-2 text-lg font-medium'>Markers list</h2>
						<div className="flx flex-col gap-10 flex-1">
							{markers.map((item) => (
								<div
									key={item.id}
									className={`text-slate-900 mt-4 hover:bg-slate-500 p-2 rounded-md cursor-pointer ${selectedMarker && selectedMarker.id === item.id && 'bg-slate-500'
										}`}
									onClick={() => setSelectedMarker(item)}
								>
									Marker: {item.id}
								</div>
							))}
						</div>
					</div>
					<div className="grid grid-cols-2 bg-white text-slate-400 font-medium p-2 rounded-md">
						<span>Property</span>
						<span>Value</span>
						<span>x</span>
						<span>{selectedMarker ? selectedMarker.x : '---'}</span>
						<span>y</span>
						<span>{selectedMarker ? selectedMarker.y : '---'}</span>
						<span>z</span>
						<span>{selectedMarker ? selectedMarker.z : '---'}</span>
						<span>isActive</span>
						<span>
							{selectedMarker
								? selectedMarker.isActive
									? 'True'
									: 'False'
								: '---'}
						</span>
					</div>
				</div>
			)}
		</>
	);
};
