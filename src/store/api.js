// API call abstracted into api() function to avoid repeating same logic for every request, and to have default error handling

export default function api(path, options = { method: 'GET' }) {
	const url = `https://jsonplaceholder.typicode.com${path}`;

	const requestInit = {
		method: options.method,
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	};

	if (options.body) {
		requestInit.body = JSON.stringify(options.body);
	}

	return fetch(url, requestInit)
		.then(response => {
			// Return JSON for succesfull calls
			if (response.status >= 200 && response.status < 300) {
				return response.json();
			}

			// Throw an error in other cases
			const err = new Error(response.statusText);

			err.response = response;
			err.status = response.status;

			throw err;
		})
		.catch(err => {
			console.error(err);

			throw err;
		});
}
