type NormalizedError = {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
};

export default function onError(e: any): NormalizedError {
  if (!e) return { message: 'Unknown error' };
  // If axios-like error with response
  if (e.response && e.response.data) {
    const { status } = e.response;
    const data = e.response.data;
    // standard shape { message, errors }
    if (data && typeof data === 'object') {
      return { message: data.message || 'Error', status, errors: data.errors };
    }
    return { message: String(data), status };
  }
  // If fetch-based response error passed as { response: { status, data } }
  if (e.response && e.response.status) {
    return {
      message: e.response.data?.message || 'Error',
      status: e.response.status,
      errors: e.response.data?.errors,
    };
  }
  // Generic Error
  if (e.message) return { message: e.message };
  return { message: 'Unknown error' };
}
