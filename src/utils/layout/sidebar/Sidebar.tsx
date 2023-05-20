'use client';

import {
  PositionListResponse,
  PositionResponse,
} from '@/pages/api/position/[[...api_route]]';
import { setMarker } from '@/redux/features/markerSlice';
import { useAppDispatch } from '@/redux/hooks';
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
  const [selectedMarker, setSelectedMarker] = useState<
    PositionResponse | undefined
  >(undefined);

  return (
    <>
      {isOpen && (
        <div className="absolute top-0 md:relative flex flex-col w-screen md:w-56 h-full">
          <div className="flex-1 w-full text-slate-800 bg-white rounded-md p-2 shadow-xl my-2">
            <h2 className="p-2 text-lg font-medium">Markers list</h2>
            <div className="flx flex-col gap-10 flex-1">
              {PositionList.map((item) => (
                <div
                  key={item.objectsId}
                  className={`text-slate-900 mt-4 hover:bg-slate-500 p-2 rounded-md cursor-pointer ${
                    selectedMarker &&
                    selectedMarker.positionId === item.positionId &&
                    'bg-slate-500'
                  }`}
                  onClick={() => {
                    setSelectedMarker(item);
                    dispatch(setMarker(item));
                  }}
                >
                  Marker: {item.objectsId}
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
