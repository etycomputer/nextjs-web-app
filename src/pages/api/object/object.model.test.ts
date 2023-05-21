import { ObjectListResponse } from './object.types';
import {
  getObjectList,
  getObjectById,
  updateObjectById,
  addObject,
} from './object.model';

describe('objectList', () => {
  let objectList: ObjectListResponse;

  beforeEach(() => {
    objectList = [
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
  });

  describe('getObjectList', () => {
    it('should return the object list', () => {
      const result = getObjectList();
      expect(result).toEqual(objectList);
    });
  });

  describe('getObjectById', () => {
    it('should return the object with the specified ID', () => {
      const objectId = 1;
      const expectedObject = objectList.find(
        (obj) => obj.objectsId === objectId
      );
      const result = getObjectById(objectId);
      expect(result).toEqual(expectedObject);
    });

    it('should return undefined for non-existent object ID', () => {
      const objectId = 999;
      const result = getObjectById(objectId);
      expect(result).toBeUndefined();
    });
  });

  describe('updateObjectById', () => {
    it('should update the object with the specified ID', () => {
      const objectId = 1;
      const updatedObject = {
        objectsId: objectId,
        type: 2,
        serial: 'M2',
        holeId: 2,
      };
      updateObjectById(objectId, updatedObject);
      const result = getObjectById(objectId);
      expect(result).toEqual(updatedObject);
    });

    it('should return undefined for non-existent object ID', () => {
      const objectId = 999;
      const updatedObject = {
        objectsId: objectId,
        type: 2,
        serial: 'M2',
        holeId: 2,
      };
      const result = updateObjectById(objectId, updatedObject);
      expect(result).toBeUndefined();
    });
  });

  describe('addObject', () => {
    it('should add a new object to the list', () => {
      const newObject = {
        type: 2,
        serial: 'M2',
        holeId: 2,
      };
      const result = addObject(newObject);
      const expectedObject = {
        ...newObject,
        objectsId: objectList.length + 1,
      };
      expect(result).toEqual(expectedObject);
    });
  });
});
