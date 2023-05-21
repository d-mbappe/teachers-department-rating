import axios, { AxiosError } from 'axios'

export function errorResponse(error: AxiosError | unknown) {
	if(axios.isAxiosError(error) && error.response) {
		return {
			success: false,
			errorCode: error.response.status,
			errorData: error.response.data,
		}
	} else {
		return {
			success: false,
		}
	}
}
