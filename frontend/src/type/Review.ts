export type ReviewResponse = {
  client: {
    profileId: number;
    image: string | null;
    firstName: string;
    lastName: string;
  };
  date: string;
  rating: number;
  title: string;
  description: string;
};
