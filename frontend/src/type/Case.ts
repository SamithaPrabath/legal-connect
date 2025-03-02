import { EventResponse } from "./Event";
import { UserInfoResponse } from "./User";

export enum CaseStatus {
    IN_PROGRESS = "in progress",
    ON_HOLD = "on hold",
    AWAIT_HEARING = "await hearing",
    CLOSED = "closed"
}

type OppositionParty = {
    name: string;
    phone: string;
    lawyerName: string;
}

type Court = {
    name: string;
    phone: string;
    address: string;
}

export type CaseRequest = {
    caseNumber: string;
    caseName: string;
    caseType: string;
    client: {
        id: string;
        name: string;
        phone: string;
        email: string
    }
    lawyerId: string;
    oppositionParty: OppositionParty;
    court: Court;
}

export type CaseResponse = {
    id: string;
    caseName: string;
    client: UserInfoResponse
    lawyer: UserInfoResponse
    oppositionParty: OppositionParty;
    court: Court;
    caseType: string;
    caseStatus: CaseStatus;
    createdDate: string;
    upcomingEvent?: EventResponse;
    deadline: number;
}