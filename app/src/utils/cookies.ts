export const setBrowserCookie = (name: string, value: string, maxAge: number) => {
	document.cookie = `${name}=${value}; max-age=${maxAge} path=/; SameSite=Strict;`;
};
