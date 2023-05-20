import type { NextApiRequest, NextApiResponse } from 'next';

export type ErrorResponse = {
  message: string;
};

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MarkerResponse | MarkerListResponse | ErrorResponse>
) {
  try {
    const api_query = req.query;
    if ('api_route' in api_query) {
      const api_route = api_query['api_route'] ?? [];
      let route_index = 0;
      const current_route = api_route[route_index++] ?? '';
      if (current_route.toLowerCase() === 'list') {
        // GET /api/marker/list
        // GET Get all marker.
        res.status(200).json(MarkerList);
        return;
      }

      const marker_id = Number.parseInt(current_route);
      if (Number.isNaN(marker_id) || marker_id <= 0) {
        res.status(400).json({
          message: 'Invalid request parameter.',
        });
        return;
      }

      if (req.method === 'GET') {
        // GET /api/marker/{marker_id}
        // GET Get an marker by its ID.
        const markerById = MarkerList.find((obj) => obj.markerId === marker_id);
        if (markerById === undefined) {
          res.status(404).json({
            message: 'Object not found.',
          });
          return;
        }
        res.status(200).json(markerById);
        return;
      } else if (req.method === 'PUT') {
        // PUT /api/marker/{marker_id}
        // PUT Update an object by its ID.
        const body = req.body;
        if (!body || typeof body !== 'object') {
          res.status(400).json({
            message: 'Request body is required.',
          });
          return;
        }
        const { activated, activationTime, node, subnet } =
          req.body as UpdateMarkerResponse;
        if (
          !Number.isInteger(subnet) ||
          !Number.isInteger(node) ||
          typeof activated !== 'boolean' ||
          (activationTime !== null && !(activationTime instanceof Date))
        ) {
          res.status(400).json({
            message: 'Invalid request body.',
          });
          return;
        }
        const marker_index = MarkerList.findIndex(
          (obj) => obj.markerId === marker_id
        );
        if (marker_index === -1) {
          res.status(404).json({
            message: 'Object not found.',
          });
          return;
        }
        const updatedObject = {
          ...MarkerList[marker_index],
          ...body,
          objectsId: marker_id,
        };
        MarkerList[marker_index] = updatedObject;
        res.status(200).json(updatedObject);
        return;
      } else {
        res.status(405).json({
          message: 'Invalid request method.',
        });
      }
    } else if (req.method === 'POST') {
      // POST /api/marker
      // POST Add a new marker.
      const body = req.body;
      if (!body || typeof body !== 'object') {
        res.status(400).json({
          message: 'Request body is required.',
        });
        return;
      }
      const { activated, activationTime, node, subnet } =
        req.body as UpdateMarkerResponse;
      if (
        !Number.isInteger(subnet) ||
        !Number.isInteger(node) ||
        typeof activated !== 'boolean' ||
        (activationTime !== null && !(activationTime instanceof Date))
      ) {
        res.status(400).json({
          message: 'Invalid request body.',
        });
        return;
      }
      const object_index = MarkerList.push({
        markerId: MarkerList.length + 1,
        activated: activated,
        activationTime: activationTime,
        node: node,
        subnet: subnet,
      });
      res.status(200).json(MarkerList[object_index]);
    } else {
      res.status(405).json({
        message: 'Invalid request method.',
      });
    }
  } catch (err) {
    res.status(500).json({
      message: 'failed to load data',
    });
  }
}
