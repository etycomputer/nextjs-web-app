export type MarkerResponse = {
  markerId: number;
  subnet: number;
  node: number;
  activated: boolean;
  activationTime: null | Date;
};

export type UpdateMarkerResponse = {
  subnet: number;
  node: number;
  activated: boolean;
  activationTime: null | Date;
};

export type MarkerListResponse = MarkerResponse[];

let MarkerList: MarkerListResponse = [
  {
    markerId: 1,
    subnet: 1,
    node: 1,
    activated: false,
    activationTime: null,
  },
  {
    markerId: 2,
    subnet: 1,
    node: 2,
    activated: false,
    activationTime: null,
  },
  {
    markerId: 3,
    subnet: 1,
    node: 3,
    activated: true,
    activationTime: new Date('2000-01-23T04:56:10.000+00:00'),
  },
];

export type ReadingResponse = {
  readingId: number;
  markerId: number;
  timestamp: Date;
  temperature: null | number;
  porePressure: null | number;
};

export type UpdateReadingResponse = {
  timestamp: Date;
  temperature: null | number;
  porePressure: null | number;
};

export type ReadingListResponse = ReadingResponse[];

let readingTime = new Date('2000-01-23T04:56:10.000+00:00');
let ReadingList: ReadingListResponse = [
  {
    readingId: 1,
    markerId: 1,
    timestamp: new Date(readingTime.setHours(readingTime.getHours() + 1)),
    temperature: 22.2,
    porePressure: 50000.0,
  },
  {
    readingId: 2,
    markerId: 1,
    timestamp: new Date(readingTime.setHours(readingTime.getHours() + 2)),
    temperature: 22.4,
    porePressure: 50000.0,
  },
  {
    readingId: 3,
    markerId: 1,
    timestamp: new Date(readingTime.setHours(readingTime.getHours() + 3)),
    temperature: 22.5,
    porePressure: 50000.0,
  },
  {
    readingId: 4,
    markerId: 2,
    timestamp: new Date(readingTime.setHours(readingTime.getHours() + 1)),
    temperature: 24.2,
    porePressure: 50100.0,
  },
  {
    readingId: 5,
    markerId: 2,
    timestamp: new Date(readingTime.setHours(readingTime.getHours() + 2)),
    temperature: 24.4,
    porePressure: 50100.0,
  },
  {
    readingId: 6,
    markerId: 2,
    timestamp: new Date(readingTime.setHours(readingTime.getHours() + 3)),
    temperature: 24.5,
    porePressure: 50100.0,
  },
];
