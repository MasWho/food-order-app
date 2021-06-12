import { useState, useCallback } from "react";

const useHttp = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const sendRequest = useCallback(async (requestConfig, callback) => {
		setLoading(true);
		setError(null);

		try {
			let response = await fetch(requestConfig.url, {
				method: requestConfig.method || "GET",
				body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
				headers: requestConfig.headers || {},
			});

			if (!response.ok) {
				throw new Error("Request Failed");
			}

			let data = await response.json();

			if (callback) {
				callback(data);
			}
		} catch (error) {
			setError(error.message);
		}

		setLoading(false);
	}, []);

    return {
        loading,
        error,
        sendRequest
    };
};

export default useHttp;
