import util from '@/util';

const URL_LOGIN = '/login';
const URL_LOGOUT = '/logout';

export function login(data) {
	return util.request.foxPost(URL_LOGIN, data);
}

export function logOut() {
	return util.request.foxPost(URL_LOGOUT);
}