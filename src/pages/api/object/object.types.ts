export type ErrorResponse = {
  status: number;
  message: string;
};
export type ObjectResponse = {
  objectsId: number;
  type: number | null;
  serial: string | null;
  holeId: number | null;
};

export type UpdateObjectResponse = {
  type: number | null;
  serial: string | null;
  holeId: number | null;
};

export type ObjectListResponse = ObjectResponse[];
