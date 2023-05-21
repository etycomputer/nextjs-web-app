import React, { useState } from 'react';
import ThreeObjectViewer from '../threeObjectViewer/ThreeObjectViewer';
import { PositionListResponse } from '@/pages/api/position/[[...api_route]]';


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

export enum MarkerDetailTabs {
	THREE_DIMENSIONAL = '3D',
	CHARTS = 'charts',
}

export const MarkerDetail = () => {

	const [activeTab, setActiveTab] = useState<MarkerDetailTabs>(
		MarkerDetailTabs.THREE_DIMENSIONAL
	);

	return (
		<div className="flex flex-col w-full h-full">
			<div className="flex items-center gap-10 mb-4">
				<div
					className={`p-4 hover:bg-slate-400 rounded-md cursor-pointer bg-slate-200 text-slate-500 ${activeTab === MarkerDetailTabs.THREE_DIMENSIONAL && '!text-white !bg-slate-400 border-b-2 border-b-slate-500'}`}
					onClick={() => setActiveTab(MarkerDetailTabs.THREE_DIMENSIONAL)}
				>
					3D
				</div>
				<div
					className={`p-4 hover:bg-slate-400 rounded-md cursor-pointer bg-slate-200 text-slate-500 ${activeTab === MarkerDetailTabs.CHARTS &&
						'!text-white !bg-slate-400 border-b-2 border-b-slate-500'}`}
					onClick={() => setActiveTab(MarkerDetailTabs.CHARTS)}
				>
					Charts
				</div>
			</div>
			<div className="relative flex-1 w-full">
				{activeTab === MarkerDetailTabs.THREE_DIMENSIONAL ? (
					<div className="bg-white rounded-lg w-full h-full text-red-400">
						<ThreeObjectViewer markersList={PositionList} />
					</div>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};
