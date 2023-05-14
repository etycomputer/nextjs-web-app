export type PositionResponse = {
  positionId: number;
  objectsId: number;
  timestamp: Date;
  x: number;
  y: number;
  z: number;
};

export type UpdatePositionResponse = {
  objectsId: number;
  timestamp: Date;
  x: number;
  y: number;
  z: number;
};

export type PositionListResponse = PositionResponse[];

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
    positionId: 1,
    objectsId: 1,
    timestamp: new Date(readingTime.setHours(readingTime.getHours() + 2)),
    x: 1,
    y: 10,
    z: 1,
  },
  {
    positionId: 1,
    objectsId: 1,
    timestamp: new Date(readingTime.setHours(readingTime.getHours() + 4)),
    x: 1,
    y: 20,
    z: 1,
  },
];
