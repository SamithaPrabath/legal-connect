export type EventRequest = {
  caseId?: string;
  title: string;
  description: string;
  date: string;
  time: string;
  clientId: string;
  lawyerId: string;
};

export type EventResponse = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  caseId?: string;
  clientId: string;
  lawyerId: string;
};

export const timeSlots = [
    "8.00 AM",
    "9.00 AM",
    "10.00 AM",
    "11.00 AM",
    "12.00 PM",
    "1.00 PM",
    "2.00 PM",
    "3.00 PM",
    "4.00 PM",
  ];

export type TimeLineEvent = {
    date: string;
    description: string;
}