export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROTES = 'api/auth';

export const SIGNUP_ROUTE = `${AUTH_ROTES}/signup`;

export const LOGIN_ROUTE = `${AUTH_ROTES}/login`;

export const GET_USER_INFO = `${AUTH_ROTES}/user-info`;

export const UPDATE_PROFILE_ROUTE = `${AUTH_ROTES}/update-profile`;

export const ADD_PROFILE_IMAGE_ROUTE = `${AUTH_ROTES}/add-profile-image`;

export const REMOVE_PROFILE_IMAGE_ROUTE = `${AUTH_ROTES}/remove-profile-image`;

export const LOGOUT_ROUTE = `${AUTH_ROTES}/logout`;

export const CONTACTS_ROUTES = 'api/contacts';

export const SEARCH_CONTACTS_ROUTES = `${CONTACTS_ROUTES}/search`;