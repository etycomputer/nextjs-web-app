import { useState } from "react";
import Image from "next/image";
import arrowIcn from '../../../assets/icons/arrow.svg'
import { Marker } from "@/interfaces/general";

interface DropDownProps {
    title: string;
    items: Marker[];
    selectedItemId?: number;
    onSelect: (marker: Marker) => void
}

export const DropDown = ({ items, title, selectedItemId, onSelect }: DropDownProps) => {

    const [itemsStatus, setItemsStatus] = useState<boolean>(false);

    return (
        <div className='w-full h-full flex flex-col justify-between'>
            <div className="flex flex-col p-2 bg-slate-400">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => setItemsStatus(!itemsStatus)}>
                    <span className="text-slate-900">{title}</span>
                    <Image src={arrowIcn} alt="arrow" className={`${itemsStatus && 'rotate-180'}`} />
                </div>
                <div>
                    {itemsStatus && (
                        <div className="flx flex-col gap-10  bg-slate-400 flex-1">
                            {items.map((item) =>
                                <div
                                    key={item.id}
                                    className={`text-slate-900 mt-4 hover:bg-slate-500 p-2 rounded-md cursor-pointer ${selectedItemId === item.id && 'bg-slate-500'}`}
                                    onClick={() => onSelect(item)}
                                >
                                    Marker: {item.id}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
