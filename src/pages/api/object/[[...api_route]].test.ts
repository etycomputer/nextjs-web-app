import { NextApiRequest, NextApiResponse } from 'next';
import {
  ObjectResponse,
  ObjectListResponse,
  ErrorResponse,
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
import handler from './[[...api_route]]';

jest.mock('./object.routes', () => ({
  handleObjectListRoute: jest.fn(),
  handleGetObjectRoute: jest.fn(),
  handleUpdateObjectRoute: jest.fn(),
  handleAddObjectRoute: jest.fn(),
  handleInvalidRoute: jest.fn(),
  handleInvalidMethod: jest.fn(),
  handleServerError: jest.fn(),
}));

const mockReq: Partial<NextApiRequest> = {
  query: {
    api_route: [] as string[],
  },
  method: '',
  body: {},
};

const mockRes: Partial<
  NextApiResponse<ObjectResponse | ObjectListResponse | ErrorResponse>
> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe('[[...api_route]].ts', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle object list route', () => {
    mockReq.query = { api_route: ['list'] };
    handler(
      mockReq as NextApiRequest,
      mockRes as NextApiResponse<
        ObjectResponse | ObjectListResponse | ErrorResponse
      >
    );
    expect(handleObjectListRoute).toHaveBeenCalledWith(
      mockReq as NextApiRequest,
      mockRes as NextApiResponse<ObjectListResponse>
    );
  });

  it('should handle get object route', () => {
    mockReq.query = { api_route: ['1'] };
    mockReq.method = 'GET';
    handler(
      mockReq as NextApiRequest,
      mockRes as NextApiResponse<
        ObjectResponse | ObjectListResponse | ErrorResponse
      >
    );
    expect(handleGetObjectRoute).toHaveBeenCalledWith(
      mockReq as NextApiRequest,
      mockRes as NextApiResponse<ObjectResponse | ErrorResponse>,
      1
    );
  });

  it('should handle update object route', () => {
    mockReq.query = { api_route: ['1'] };
    mockReq.method = 'PUT';
    mockReq.body = { type: 2, serial: 'M2', holeId: 2 } as UpdateObjectResponse;
    handler(
      mockReq as NextApiRequest,
      mockRes as NextApiResponse<
        ObjectResponse | ObjectListResponse | ErrorResponse
      >
    );
    expect(handleUpdateObjectRoute).toHaveBeenCalledWith(
      mockReq as NextApiRequest,
      mockRes as NextApiResponse<ObjectResponse | ErrorResponse>,
      1,
      { type: 2, serial: 'M2', holeId: 2 }
    );
  });

  // it('should handle add object route', () => {
  //     mockReq.method = 'POST';
  //     mockReq.body = { type: 2, serial: 'M2', holeId: 2 } as UpdateObjectResponse;
  //     handler(
  //         mockReq as NextApiRequest,
  //         mockRes as NextApiResponse<ObjectResponse | ObjectListResponse | ErrorResponse>);
  //     expect(handleAddObjectRoute).toHaveBeenCalledWith(
  //         mockReq as NextApiRequest,
  //         mockRes as NextApiResponse<ObjectResponse | ErrorResponse>,
  //         { type: 2, serial: 'M2', holeId: 2 },
  //     );
  // });

  it('should handle invalid route', () => {
    mockReq.query = { api_route: ['abc'] };
    handler(
      mockReq as NextApiRequest,
      mockRes as NextApiResponse<
        ObjectResponse | ObjectListResponse | ErrorResponse
      >
    );
    expect(handleInvalidRoute).toHaveBeenCalledWith(
      mockRes as NextApiResponse<ErrorResponse>
    );
  });

  // it('should handle invalid method', () => {
  //     mockReq.method = 'DELETE';
  //     handler(
  //         mockReq as NextApiRequest,
  //         mockRes as NextApiResponse<ObjectResponse | ObjectListResponse | ErrorResponse>
  //     );
  //     expect(handleInvalidMethod).toHaveBeenCalledWith(
  //         mockRes as NextApiResponse<ErrorResponse>
  //     );
  // });

  it('should handle server error', () => {
    mockReq.query = { api_route: ['list'] };
    (handleObjectListRoute as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Server error');
    });
    handler(
      mockReq as NextApiRequest,
      mockRes as NextApiResponse<
        ObjectResponse | ObjectListResponse | ErrorResponse
      >
    );
    expect(handleServerError).toHaveBeenCalledWith(
      mockRes as NextApiResponse<ErrorResponse>
    );
  });
});
