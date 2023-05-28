import type { NextApiResponse } from 'next';
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
  res: NextApiResponse<ObjectListResponse | ErrorResponse>
) {
  const response = await getObjectList();
  if ('status' in response) {
    res.status(response.status).json(response);
    return;
  }
  res.status(200).json(response);
}

export async function handleGetObjectRoute(
  res: NextApiResponse<ObjectResponse | ErrorResponse>,
  id: number
) {
  const response = await getObjectById(id);
  if ('status' in response) {
    res.status(response.status).json(response);
    return;
  }
  res.status(200).json(response);
}

export async function handleUpdateObjectRoute(
  res: NextApiResponse<ObjectResponse | ErrorResponse>,
  id: number,
  body: UpdateObjectResponse | any
) {
  const { type, serial, holeId } = body;
  if (
    !(type === null || Number.isInteger(type)) ||
    !(holeId === null || Number.isInteger(holeId)) ||
    !(serial === null || typeof serial === 'string')
  ) {
    res.status(400).json({
      status: 400,
      message: 'Invalid request body.',
    });
    return;
  }
  const response = await updateObjectById(id, { type, serial, holeId });
  if ('status' in response) {
    res.status(response.status).json(response);
    return;
  }
  res.status(200).json(response);
}

export async function handleAddObjectRoute(
  res: NextApiResponse<ObjectResponse | ErrorResponse>,
  body: UpdateObjectResponse | any
) {
  const { type, serial, holeId } = body;
  if (
    !(type === null || Number.isInteger(type)) ||
    !(holeId === null || Number.isInteger(holeId)) ||
    !(serial === null || typeof serial === 'string')
  ) {
    res.status(400).json({
      status: 400,
      message: 'Invalid request body.',
    });
    return;
  }
  const response = await addObject({ type, serial, holeId });
  console.log(JSON.stringify(response));
  if ('status' in response) {
    res.status(response.status).json(response);
    return;
  }
  res.status(200).json(response);
}

export function handleInvalidRoute(res: NextApiResponse<ErrorResponse>) {
  res.status(400).json({
    status: 400,
    message: 'Invalid request parameter.',
  });
}

export function handleInvalidMethod(res: NextApiResponse<ErrorResponse>) {
  res.status(405).json({
    status: 405,
    message: 'Invalid request method.',
  });
}

export function handleServerError(res: NextApiResponse<ErrorResponse>) {
  res.status(500).json({
    status: 500,
    message: 'Failed to load data.',
  });
}
