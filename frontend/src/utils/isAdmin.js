import { API_URL } from "../constants"

export const getUser = async (userAuth) => {
	const res = await fetch(`${API_URL}/api/users/${userAuth._id}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userAuth?.token}`,
		},
	});
	const data = await res.json();
	return data.isAdmin;
};