import { ObjectListResponse, ObjectResponse, UpdateObjectResponse } from './object.types';

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

export function getObjectList(): ObjectListResponse {
    return ObjectList;
}

export function getObjectById(id: number): ObjectResponse | undefined {
    return ObjectList.find((obj) => obj.objectsId === id);
}

export function updateObjectById(
    id: number,
    update: UpdateObjectResponse
): ObjectResponse | undefined {
    const index = ObjectList.findIndex((obj) => obj.objectsId === id);
    if (index !== -1) {
        const updatedObject = {
            ...ObjectList[index],
            ...update,
            objectsId: id,
        };
        ObjectList[index] = updatedObject;
        return updatedObject;
    }
    return undefined;
}

export function addObject(object: UpdateObjectResponse): ObjectResponse {
    const newObject: ObjectResponse = {
        objectsId: ObjectList.length + 1,
        ...object,
    };
    ObjectList.push(newObject);
    return newObject;
}