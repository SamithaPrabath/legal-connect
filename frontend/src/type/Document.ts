import { UserType } from './User';

export type DocumentRequest = {
  caseId: string;
  title: string;
  description: string;
  userType: UserType,
  fileName: string;
  file: string;
};

export type DocumentResponse = {
  id: string;
  caseId: string;
  title: string;
  description: string;
  userType: UserType;
  fileName: string;
};
