export type NoteResponse = {
    id: string;
    date: string;
    time: string;
    note: string;
}

export type NoteRequest = {
    date: string;
    time: string;
    note: string;
    caseId: string;
    userId: string;
}