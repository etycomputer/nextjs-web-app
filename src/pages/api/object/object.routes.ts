import type { NextApiRequest, NextApiResponse } from 'next';
import {
  ErrorResponse,
  ObjectResponse,
  ObjectListResponse,
  UpdateObjectResponse,
} from './object.types';
import {
  getObjectList,
  getObjectById,
  updateObjectById,
  addObject,
} from './object.model';

export async function handleObjectListRoute(
  req: NextApiRequest,
  res: NextApiResponse<ObjectListResponse>
) {
  res.status(200).json(await getObjectList());
}

export function handleGetObjectRoute(
  req: NextApiRequest,
  res: NextApiResponse<ObjectResponse | ErrorResponse>,
  id: number
) {
  const objectById = getObjectById(id);
  if (objectById === undefined) {
    res.status(404).json({
      message: 'Object not found.',
    });
    return;
  }
  res.status(200).json(objectById);
}

export function handleUpdateObjectRoute(
  req: NextApiRequest,
  res: NextApiResponse<ObjectResponse | ErrorResponse>,
  id: number,
  body: UpdateObjectResponse | any
) {
  const { type, serial, holeId } = body;
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
  const updatedObject = updateObjectById(id, { type, serial, holeId });
  if (updatedObject === undefined) {
    res.status(404).json({
      message: 'Object not found.',
    });
    return;
  }
  res.status(200).json(updatedObject);
}

export function handleAddObjectRoute(
  req: NextApiRequest,
  res: NextApiResponse<ObjectResponse | ErrorResponse>,
  body: UpdateObjectResponse | any
) {
  const { type, serial, holeId } = body;
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
  const newObject = addObject({ type, serial, holeId });
  res.status(200).json(newObject);
}

export function handleInvalidRoute(res: NextApiResponse<ErrorResponse>) {
  res.status(400).json({
    message: 'Invalid request parameter.',
  });
}

export function handleInvalidMethod(res: NextApiResponse<ErrorResponse>) {
  res.status(405).json({
    message: 'Invalid request method.',
  });
}

export function handleServerError(res: NextApiResponse<ErrorResponse>) {
  res.status(500).json({
    message: 'Failed to load data.',
  });
}
