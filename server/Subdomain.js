export default (subdomain, handler) => {
	return (request, response, next) => {
		request._subdomainLevel = request._subdomainLevel ?? 0;
		const subdomains = subdomain.split('.').reverse();
		for (let i = 0; i < subdomains.length; i++) {
			const expected = subdomains[i];
			if (expected === '*') continue;
			const actual = request.subdomains[i + request._subdomainLevel];
			if (actual !== expected) return next();
		}
		request._subdomainLevel++;
		return handler(request, response, next);
	};
};
