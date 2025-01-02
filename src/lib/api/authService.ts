import instance from "./instance";

export function postLogin(data: { email: string; password: string }) {
	return instance.post('/auth/login', data);
}
