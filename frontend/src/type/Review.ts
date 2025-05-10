import { UserInfoResponse } from "./User";

export type ReviewResponse = {
  client: UserInfoResponse;
  date: string;
  rating: number;
  title: string;
  description: string;
};

export type ReviewRequest = {
  clientId: string;
  lawyerId: string;
  date: string;
  rating: number;
  title: string;
  description: string
}

export type ReviewSummary = {
  "5": number,
  "4": number,
  "3": number,
  "2": number,
  "1": number,
}