import "reflect-metadata"
import {
  ObjectListResponse,
  ObjectResponse,
  UpdateObjectResponse,
} from './object.types';

// import { ObjectRepository } from '../../../repositories/object.repository';
import { entityListToObjectListResponse } from '../../../transformers/object.transformer'

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

export async function getObjectList(): Promise<ObjectListResponse> {
  // let ObjectList: ObjectListResponse;
  // console.log("11")
  // try {
  //   const obj_list = await ObjectRepository.find();
  //   console.log("22")
  //   console.log(obj_list.length)
  //   ObjectList = entityListToObjectListResponse(obj_list);
  //   console.log("33")
  // } catch (err) {
  //   ObjectList = [];
  //   console.error("Error during getObjectList", err)
  // }
  // return ObjectList;
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
