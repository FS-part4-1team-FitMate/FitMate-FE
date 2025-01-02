import instance from "./instance";

export function postLogin(data: { email: string; password: string }): Promise<{
	user: User;
	accessToken: string;
	refreshToken: string;
}> {
	try {
		return instance.post('/auth/login', data);
	} catch (err) {
		throw err;
	}
}
