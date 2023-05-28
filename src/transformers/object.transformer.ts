import {
    ObjectListResponse,
    ObjectResponse
} from '../pages/api/object/object.types';
import { objects } from '@prisma/client'

// Convert ObjectEntity to ObjectResponse
export function entityToObjectResponse(entity: objects): ObjectResponse {
    const { id, type, serial, hole_id } = entity;
    return { objectsId: id, type, serial, holeId: hole_id };
}

// Convert ObjectEntity[] to ObjectListResponse
export function entityListToObjectListResponse(entityList: objects[]): ObjectListResponse {
    return entityList.map(entity => entityToObjectResponse(entity));
}

// Convert ObjectResponse to ObjectEntity
export function objectResponseToEntity(response: ObjectResponse): objects {
    const { objectsId, type, serial, holeId } = response;
    const entity: objects = { id: objectsId, type, serial, hole_id: holeId };
    return entity;
}