import { NextApiRequest, NextApiResponse } from 'next';
import handler, {
  ObjectResponse,
  ObjectListResponse,
  ErrorResponse,
} from './[[...api_route]]';

const mockRequest: NextApiRequest = {
  query: {},
  method: 'GET',
  cookies: {},
  body: null,
  env: {},
} as NextApiRequest;
mockRequest.query = {
  api_route: ['1'],
};

const mockResponse = {
  status: jest.fn(() => mockResponse),
  json: jest.fn(),
} as unknown as NextApiResponse<
  ObjectResponse | ObjectListResponse | ErrorResponse
>;

describe('handler', () => {
  it('should return the object with the specified ID when a valid ID is provided', async () => {
    await handler(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      objectsId: 1,
      type: 1,
      serial: 'M1',
      holeId: -1,
    });
  });

  it('should return a 404 error when an invalid ID is provided', async () => {
    mockRequest.query.api_route = ['999'];

    await handler(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Object not found.',
    });
  });

  it('should return a 400 error when an invalid request parameter is provided', async () => {
    mockRequest.query.api_route = ['abc'];

    await handler(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Invalid request parameter.',
    });
  });

  it('should return a 405 error when an invalid request method is used', async () => {
    mockRequest.method = 'POST';

    await handler(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(405);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Invalid request method.',
    });
  });
});
