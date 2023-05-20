import { NextApiResponse } from 'next';
import {
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
import {
    getObjectList,
    getObjectById,
    updateObjectById,
    addObject,
} from './object.model';

jest.mock('./object.model', () => ({
    getObjectList: jest.fn(),
    getObjectById: jest.fn(),
    updateObjectById: jest.fn(),
    addObject: jest.fn(),
}));

describe('object routes', () => {
    let mockRes: NextApiResponse<any>;

    beforeEach(() => {
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as any;
    });

    describe('handleObjectListRoute', () => {
        it('should respond with the object list', () => {
            const objectList: ObjectListResponse = [
                {
                    objectsId: 1,
                    type: 1,
                    serial: 'M1',
                    holeId: -1,
                },
            ];
            (getObjectList as jest.Mock).mockReturnValue(objectList);

            handleObjectListRoute(null!, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(objectList);
        });
    });

    describe('handleGetObjectRoute', () => {
        it('should respond with the object with the specified ID', () => {
            const objectId = 1;
            const object: ObjectResponse = {
                objectsId: objectId,
                type: 1,
                serial: 'M1',
                holeId: -1,
            };
            (getObjectById as jest.Mock).mockReturnValue(object);

            handleGetObjectRoute(null!, mockRes, objectId);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(object);
        });

        it('should respond with an error message for non-existent object ID', () => {
            const objectId = 999;
            (getObjectById as jest.Mock).mockReturnValue(undefined);

            handleGetObjectRoute(null!, mockRes, objectId);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Object not found.',
            });
        });
    });

    describe('handleUpdateObjectRoute', () => {
        it('should update the object with the specified ID', () => {
            const objectId = 1;
            const updatedObject: ObjectResponse = {
                objectsId: objectId,
                type: 2,
                serial: 'M2',
                holeId: 2,
            };
            (updateObjectById as jest.Mock).mockReturnValue(updatedObject);

            const reqBody: UpdateObjectResponse = {
                type: 2,
                serial: 'M2',
                holeId: 2,
            };

            handleUpdateObjectRoute(null!, mockRes, objectId, reqBody);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(updatedObject);
        });

        it('should respond with an error message for non-existent object ID', () => {
            const objectId = 999;
            (updateObjectById as jest.Mock).mockReturnValue(undefined);

            const reqBody: UpdateObjectResponse = {
                type: 2,
                serial: 'M2',
                holeId: 2,
            };

            handleUpdateObjectRoute(null!, mockRes, objectId, reqBody);

            //expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Object not found.',
            });
        });

        it('should respond with an error message for invalid request body', () => {
            const objectId = 1;
            const reqBody: any = {
                type: '2',
                serial: 'M2',
                holeId: 2,
            };

            handleUpdateObjectRoute(null!, mockRes, objectId, reqBody);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Invalid request body.',
            });
        });
    });

    describe('handleAddObjectRoute', () => {
        it('should add a new object to the list', () => {
            const newObject: ObjectResponse = {
                objectsId: 2,
                type: 2,
                serial: 'M2',
                holeId: 2,
            };
            (addObject as jest.Mock).mockReturnValue(newObject);

            const reqBody: UpdateObjectResponse = {
                type: 2,
                serial: 'M2',
                holeId: 2,
            };

            handleAddObjectRoute(null!, mockRes, reqBody);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(newObject);
        });

        it('should respond with an error message for invalid request body', () => {
            const reqBody: any = {
                type: '2',
                serial: 'M2',
                holeId: 2,
            };

            handleAddObjectRoute(null!, mockRes, reqBody);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Invalid request body.',
            });
        });
    });

    describe('handleInvalidRoute', () => {
        it('should respond with an error message for invalid route', () => {
            handleInvalidRoute(mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Invalid request parameter.',
            });
        });
    });

    describe('handleInvalidMethod', () => {
        it('should respond with an error message for invalid method', () => {
            handleInvalidMethod(mockRes);

            //expect(mockRes.status).toHaveBeenCalledWith(405);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Invalid request method.',
            });
        });
    });

    describe('handleServerError', () => {
        it('should respond with an error message for server error', () => {
            handleServerError(mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Failed to load data.',
            });
        });
    });
});