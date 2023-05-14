import type { NextApiRequest, NextApiResponse } from 'next';

export type ErrorResponse = {
  message: string;
};

export type ObjectResponse = {
  objectsId: number;
  type: number;
  serial: string;
  holeId: number;
};

export type UpdateObjectResponse = {
  type: number;
  serial: string;
  holeId: number;
};

export type ObjectListResponse = ObjectResponse[];

let ObjectList: ObjectListResponse = [
  {
    objectsId: 1,
    type: 1,
    serial: 'M1',
    holeId: -1,
  },
  {
    objectsId: 2,
    type: 1,
    serial: 'M2',
    holeId: -1,
  },
  {
    objectsId: 3,
    type: 1,
    serial: 'M3',
    holeId: 1,
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ObjectResponse | ObjectListResponse | ErrorResponse>
) {
  try {
    const api_query = req.query;
    if ('api_route' in api_query) {
      const api_route = api_query['api_route'] ?? [];
      let route_index = 0;
      const current_route = api_route[route_index++] ?? '';
      if (current_route.toLowerCase() === 'list') {
        // GET /api/object/list
        // GET Get all objects.
        res.status(200).json(ObjectList);
        return;
      }

      const object_id = Number.parseInt(current_route);
      if (Number.isNaN(object_id) || object_id <= 0) {
        res.status(400).json({
          message: 'Invalid request parameter.',
        });
        return;
      }

      if (req.method === 'GET') {
        // GET /api/object/{object_id}
        // GET Get an object by its ID.
        const objectById = ObjectList.find(
          (obj) => obj.objectsId === object_id
        );
        if (objectById === undefined) {
          res.status(404).json({
            message: 'Object not found.',
          });
          return;
        }
        res.status(200).json(objectById);
        return;
      } else if (req.method === 'PUT') {
        // PUT /api/object/{object_id}
        // PUT Update an object by its ID.
        const body = req.body;
        if (!body || typeof body !== 'object') {
          res.status(400).json({
            message: 'Request body is required.',
          });
          return;
        }
        const { type, serial, holeId } = req.body as UpdateObjectResponse;
        if (
          !Number.isInteger(type) ||
          !Number.isInteger(holeId) ||
          typeof serial !== 'string'
        ) {
          res.status(400).json({
            message: 'Invalid request body.',
          });
          return;
        }
        const object_index = ObjectList.findIndex(
          (obj) => obj.objectsId === object_id
        );
        if (object_index === -1) {
          res.status(404).json({
            message: 'Object not found.',
          });
          return;
        }
        const updatedObject = {
          ...ObjectList[object_index],
          ...body,
          objectsId: object_id,
        };
        ObjectList[object_index] = updatedObject;
        res.status(200).json(updatedObject);
        return;
      } else {
        res.status(405).json({
          message: 'Invalid request method.',
        });
      }
    } else if (req.method === 'POST') {
      // POST /api/object
      // POST Add a new object.
      const body = req.body;
      if (!body || typeof body !== 'object') {
        res.status(400).json({
          message: 'Request body is required.',
        });
        return;
      }
      const { type, serial, holeId } = req.body as UpdateObjectResponse;
      if (
        !Number.isInteger(type) ||
        !Number.isInteger(holeId) ||
        typeof serial !== 'string'
      ) {
        res.status(400).json({
          message: 'Invalid request body.',
        });
        return;
      }
      const object_index = ObjectList.push({
        objectsId: ObjectList.length + 1,
        type: type,
        serial: serial,
        holeId: holeId,
      });
      res.status(200).json(ObjectList[object_index]);
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
