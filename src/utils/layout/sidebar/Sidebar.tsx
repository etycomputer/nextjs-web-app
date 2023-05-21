'use client';

import {
	PositionListResponse,
	PositionResponse,
} from '@/pages/api/position/[[...api_route]]';
import { setMarker } from '@/redux/features/markerSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';

interface SidebarProps {
	isOpen: boolean;
}

let readingTime = new Date('2000-01-23T04:56:10.000+00:00');
let PositionList: PositionListResponse = [
	{
		positionId: 1,
		objectsId: 1,
		timestamp: new Date(readingTime.setHours(readingTime.getHours())),
		x: 1,
		y: 1,
		z: 1,
	},
	{
		positionId: 2,
		objectsId: 2,
		timestamp: new Date(readingTime.setHours(readingTime.getHours())),
		x: 1,
		y: 1,
		z: 10,
	},
	{
		positionId: 3,
		objectsId: 3,
		timestamp: new Date(readingTime.setHours(readingTime.getHours())),
		x: 1,
		y: 1,
		z: 20,
	},
	{
		positionId: 4,
		objectsId: 1,
		timestamp: new Date(readingTime.setHours(readingTime.getHours() + 2)),
		x: 1,
		y: 10,
		z: 1,
	},
	{
		positionId: 5,
		objectsId: 1,
		timestamp: new Date(readingTime.setHours(readingTime.getHours() + 4)),
		x: 1,
		y: 20,
		z: 1,
	},
];

export const Sidebar = ({ isOpen }: SidebarProps) => {

	const dispatch = useAppDispatch();
	const selectedMarker = useAppSelector((state) => state.markerReducer.marker);
	const [editStatus, setEditStatus] = useState<boolean>(false);


	return (
		<>
			{isOpen && (
				<div className="absolute top-0 md:relative flex flex-col w-screen md:w-80 h-full z-10">
					<div className="flex-1 w-full text-slate-800 bg-white rounded-md p-2 shadow-xl my-2">
						<h2 className="p-2 text-lg font-medium">Markers list</h2>
						<div className="flx flex-col gap-10 flex-1">
							{PositionList.map((item) => (
								<div
									key={item.positionId}
									className={`text-slate-900 mt-4 hover:bg-slate-500 p-2 rounded-md cursor-pointer ${selectedMarker &&
										selectedMarker.positionId === item.positionId && 'bg-slate-500'}`}
									onClick={() => {
										dispatch(setMarker(item));
									}}
								>
									Marker: {item.objectsId}
								</div>
							))}
						</div>
					</div>
					<div className="bg-white text-slate-400 font-medium p-2 rounded-md">
						<div className='flex items-center justify-between'>
							<div className='flex items-center gap-3'>
								<span>Property</span>
								<span>Value</span>
							</div>
							{
								editStatus ? (
									<div className='flex items-center gap-3'>
										<Button
											variant="outlined"
											className='p-1'
											onClick={() => setEditStatus(true)}
										>
											Apply
										</Button>
										<Button
											variant="outlined"
											className='p-1'
											color="error"
											onClick={() => setEditStatus(false)}
										>
											Cancel
										</Button>
									</div>
								) : (
									<Button
										variant="outlined"
										className='p-1'
										disabled={!selectedMarker}
										onClick={() => setEditStatus(true)}
									>
										Edit
									</Button>
								)
							}
						</div>
						<div className='flex flex-col items-start gap-3 mt-5'>
							<div className='flex items-center gap-20'>
								<span>x</span>
								<TextField
									disabled={!editStatus}
									className='w-10'
									id="standard-number"
									type="number"
									variant="standard"
									value={selectedMarker ? selectedMarker.x : '---'}
								/>
							</div>
							<div className='flex items-center gap-20'>
								<span>y</span>
								<TextField
									disabled={!editStatus}
									className='w-10'
									id="standard-number"
									type="number"
									variant="standard"
									value={selectedMarker ? selectedMarker.y : '---'}
								/>
							</div>
							<div className='flex items-center gap-20'>
								<span>z</span>
								<TextField
									disabled={!editStatus}
									className='w-10'
									id="standard-number"
									type="number"
									variant="standard"
									value={selectedMarker ? selectedMarker.z : '---'}
								/>
							</div>
						</div>

						{/*
						<span>isActive</span> */}
						{/* <span>
							{selectedMarker
								? selectedMarker.isActive
									? 'True'
									: 'False'
								: '---'}
						</span> */}
					</div>
				</div>
			)}
		</>
	);
};
