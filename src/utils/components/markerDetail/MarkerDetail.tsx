import React, { useState } from 'react';
import { MarkerDetailTabs } from './markerDetail.interface';
import ThreeObjectViewer from '../threeObjectViewer/ThreeObjectViewer';
import { useAppSelector } from '@/redux/hooks';

export const MarkerDetail = () => {

  const marker = useAppSelector((state) => state.markerReducer.marker);
  const [activeTab, setActiveTab] = useState<MarkerDetailTabs>(
    MarkerDetailTabs.THREE_DIMENSIONAL
  );

  return (
    <div className='flex flex-col w-full h-full'>
      <div className="flex items-center gap-10">
        <div
          className={`p-4 hover:bg-slate-400 rounded-md cursor-pointer bg-slate-200 text-slate-500 
          ${activeTab === MarkerDetailTabs.THREE_DIMENSIONAL && '!text-white !bg-slate-400 border-b-2 border-b-slate-500'
            }`}
          onClick={() => setActiveTab(MarkerDetailTabs.THREE_DIMENSIONAL)}
        >
          3D
        </div>
        <div
          className={`p-4 hover:bg-slate-400 rounded-md cursor-pointer bg-slate-200 text-slate-500 ${activeTab === MarkerDetailTabs.CHARTS &&
            '!text-white !bg-slate-400 border-b-2 border-b-slate-500'
            }`}
          onClick={() => setActiveTab(MarkerDetailTabs.CHARTS)}
        >
          Charts
        </div>
      </div>
      <div className='relative flex-1 h-full w-full'>
        {activeTab === MarkerDetailTabs.THREE_DIMENSIONAL ? (
          <div className='bg-white rounded-lg mt-5 w-full'>
            {marker ? (
              <ThreeObjectViewer object={marker} />
            ) : (
              <div className='text-red-500 p-10 flex-1 h-full'>
                <span>Please select a marker first</span>
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
