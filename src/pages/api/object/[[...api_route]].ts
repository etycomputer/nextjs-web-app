import type { NextApiRequest, NextApiResponse } from 'next';
import {
  ErrorResponse,
  ObjectResponse,
  ObjectListResponse,
  UpdateObjectResponse,
} from './object.types';
import {
  handleObjectListRoute,
  handleGetObjectRoute,
  handleUpdateObjectRoute,
  handleAddObjectRoute,
  handleInvalidRoute,
  handleInvalidMethod,
  handleServerError,
} from './object.routes';

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
        handleObjectListRoute(res);
        return;
      }
      const object_id = Number.parseInt(current_route);
      if (Number.isNaN(object_id) || object_id <= 0) {
        handleInvalidRoute(res);
        return;
      }
      if (req.method === 'GET') {
        // GET /api/object/{object_id}
        // GET Get an object by its ID.
        handleGetObjectRoute(res, object_id);
      } else if (req.method === 'PUT') {
        // PUT /api/object/{object_id}
        // PUT Update an object by its ID.
        const body = req.body;
        handleUpdateObjectRoute(res, object_id, body as UpdateObjectResponse);
      } else {
        handleInvalidMethod(res);
      }
    } else if (req.method === 'POST') {
      // POST /api/object
      // POST Add a new object.
      const body = req.body;
      handleAddObjectRoute(res, body as UpdateObjectResponse);
    } else {
      handleInvalidMethod(res);
    }
  } catch (err) {
    handleServerError(res);
  }
}
