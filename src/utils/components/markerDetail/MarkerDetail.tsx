import React, { useState } from 'react';
import { MarkerDetailTabs } from './markerDetail.interface';

export const MarkerDetail = () => {
  const [activeTab, setActiveTab] = useState<MarkerDetailTabs>(
    MarkerDetailTabs.THREE_DIMENSIONAL
  );

  return (
    <div>
      <div className="flex items-center gap-10">
        <div
          className={`p-4 hover:bg-slate-400 rounded-md cursor-pointer bg-slate-200 text-slate-500 ${
            activeTab === MarkerDetailTabs.THREE_DIMENSIONAL &&
            '!text-white !bg-slate-400 border-b-2 border-b-slate-500'
          }`}
          onClick={() => setActiveTab(MarkerDetailTabs.THREE_DIMENSIONAL)}
        >
          3D
        </div>
        <div
          className={`p-4 hover:bg-slate-400 rounded-md cursor-pointer bg-slate-200 text-slate-500 ${
            activeTab === MarkerDetailTabs.CHARTS &&
            '!text-white !bg-slate-400 border-b-2 border-b-slate-500'
          }`}
          onClick={() => setActiveTab(MarkerDetailTabs.CHARTS)}
        >
          Charts
        </div>
      </div>
    </div>
  );
};
