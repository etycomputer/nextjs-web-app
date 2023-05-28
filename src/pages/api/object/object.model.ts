import {
  ErrorResponse,
  ObjectListResponse,
  ObjectResponse,
  UpdateObjectResponse,
} from './object.types';
import { Prisma } from '@prisma/client'
import { prisma } from '@/database/dbConnection'
import { entityListToObjectListResponse, entityToObjectResponse, objectResponseToEntity } from '@/transformers/object.transformer'

export async function getObjectList(): Promise<ObjectListResponse | ErrorResponse> {
  try {
    const object_list = await prisma.objects.findMany();
    return entityListToObjectListResponse(object_list);
  } catch (err) {
    return {
      status: 500,
      message: 'Failed to load data.',
    };
  }
}

export async function getObjectById(id: number): Promise<ObjectResponse | ErrorResponse> {
  try {
    const object = await prisma.objects.findFirstOrThrow({
      where: { id: id }
    });
    return entityToObjectResponse(object);
  } catch (err) {
    if (err instanceof Prisma.NotFoundError) {
      return {
        status: 404,
        message: 'Object not found.',
      }
    }
    return {
      status: 500,
      message: 'Failed to load data.',
    };
  }
}

export async function updateObjectById(
  id: number,
  update: UpdateObjectResponse
): Promise<ObjectResponse | ErrorResponse> {
  try {
    const updatedObject = objectResponseToEntity({ objectsId: id, type: update.type, serial: update.serial, holeId: update.holeId });
    const newObject = await prisma.objects.update({
      where: { id: id },
      data: updatedObject
    });
    return entityToObjectResponse(newObject);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      return {
        status: 404,
        message: 'Object not found.',
      }
    }
    return {
      status: 500,
      message: 'Failed to load data.',
    };
  }
}

export async function addObject(object: UpdateObjectResponse): Promise<ObjectResponse | ErrorResponse> {

  try {
    const newObject = await prisma.objects.create({
      data: {
        type: object.type,
        serial: object.serial,
        hole_id: object.holeId
      }
    });
    return entityToObjectResponse(newObject);
  } catch (err) {
    return {
      status: 500,
      message: 'Failed to load data.',
    };
  }
}
