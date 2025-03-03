import { UserInfoResponse } from "./User";

export enum PaymentStatus {
    PAID = "paid",
    UNPAID = "unpaid"
}

export type PaymentRequest = {
    invoiceId: string;
    name: string;
    clientId: string;
    amount: number;
    dueDate: string;
    lawyerId: string;
}

export type PaymentResponse = {
    id: string;
    invoiceId: string;
    name: string;
    clientId: string;
    amount: number;
    dueDate: string;
    lawyer: UserInfoResponse;
    status: PaymentStatus;
}