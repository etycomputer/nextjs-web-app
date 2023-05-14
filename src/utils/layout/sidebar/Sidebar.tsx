'use client';

import { Marker } from '@/interfaces/general';
import { DropDown } from '@/utils/components/dropDown/DropDown'
import React, { useState } from 'react'

interface SidebarProps {
    isOpen: boolean;
}

const markers: Marker[] = [
    {
        id: 1,
        x: 0,
        y: 0,
        z: 0,
        isActive: true
    },
    {
        id: 2,
        x: 1,
        y: 1,
        z: 1,
        isActive: true
    },
    {
        id: 3,
        x: 2,
        y: 2,
        z: 2,
        isActive: true
    },
    {
        id: 4,
        x: 3,
        y: 3,
        z: 3,
        isActive: true
    },
]


export const Sidebar = ({ isOpen }: SidebarProps) => {


    const [selectedMarker, setSelectedMarker] = useState<Marker | undefined>(undefined)

    return (
        <>
            {
                isOpen && (
                    <div className='absolute top-0 md:relative flex flex-col bg-white w-screen md:w-56 h-full'>
                        <div className='flex-1 w-full text-slate-800 rounded-md p-2'>
                            <DropDown
                                title='Markers list'
                                items={markers}
                                selectedItemId={selectedMarker && selectedMarker.id}
                                onSelect={(marker) => setSelectedMarker(marker)}
                            />
                        </div>
                        <div className="border-t-2 border-slate-400 grid grid-cols-2 text-slate-400 font-medium p-2">
                            <span>Property</span>
                            <span>Value</span>
                            <span>x</span>
                            <span>{selectedMarker ? selectedMarker.x : '---'}</span>
                            <span>y</span>
                            <span>{selectedMarker ? selectedMarker.y : '---'}</span>
                            <span>z</span>
                            <span>{selectedMarker ? selectedMarker.z : '---'}</span>
                            <span>isActive</span>
                            <span>{selectedMarker ? (selectedMarker.isActive ? 'True' : 'False') : '---'}</span>
                        </div>
                    </div>
                )
            }
        </>
    )
}
