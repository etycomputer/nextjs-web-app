export type ErrorResponse = {
    message: string;
  };
  
  export type ObjectResponse = {
    objectsId: number;
    type: number;
    serial: string;
    holeId: number;
  };
  
  export type UpdateObjectResponse = {
    type: number;
    serial: string;
    holeId: number;
  };
  
  export type ObjectListResponse = ObjectResponse[];