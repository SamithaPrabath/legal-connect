import { mergeUrls } from "./urls/url-config";

export const create_account_route = (id: string | null) => `/create-account/${id || ":id"}`;
export const findalawyer_route = "/find-a-lawyer";
export const payments_route = "/payments";
export const mycases_route = "/my-cases";
export const schedule_route = "/schedule";
export const login_signup_route = "/portal";
export const message_route = "/messages";
export const message_with_user_rotue = (profileId: string | null) =>
  mergeUrls(message_route, profileId || ":userId");

export const create_case_route = "/my-cases/create-case";
const view_case = "/my-cases/view-case";
export const view_case_route = (caseId: string | null) =>
  caseId ? `${view_case}/${caseId}` : `${view_case}/:caseId`;
export const view_case_overview_route = (caseId: string | null) =>
  `${view_case_route(caseId)}/overview`;
export const view_case_events_route = (caseId: string | null) =>
  `${view_case_route(caseId)}/events`;
export const view_case_documents_route = (caseId: string | null) =>
  `${view_case_route(caseId)}/documents`;
export const view_case_notes_route = (caseId: string | null) =>
  `${view_case_route(caseId)}/notes`;

export const payment_request_route = "/payments/requests";
export const payment_history_route = "/payments/history";

export const profile_route = (profileId: string | null) =>
  `/profile/${profileId || ":profileID"}`;
export const profile_about_route = (profileId: string | null) =>
  `/profile/${profileId || ":profileID"}/about`;
export const profile_reviews_route = (profileId: string | null) =>
  `/profile/${profileId || ":profileID"}/reviews`;

export const schedule_appointment_route = (lawyerId: string | null) => mergeUrls(schedule_route, lawyerId || ":lawyerId")

export const admin_dashboard_route = "/admin/dashboard";
