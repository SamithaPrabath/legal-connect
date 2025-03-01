export type ReviewResponse = {
  client: {
    profileId: string;
    image: string | null;
    firstName: string;
    lastName: string;
  };
  date: string;
  rating: number;
  title: string;
  description: string;
};

export type ReviewRequest = {
  clientId: string;
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