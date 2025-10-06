interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  params?: Record<string, any>;
  headers?: Record<string, string>;
  data?: Record<string, any>;
}

export function toCurl(url: string, options: RequestOptions = {}): string {
  const { method, params, headers = {}, data } = options;

  // Build method string
  const methodString = method || 'GET';
  
  // Build query string from params
  const queryString = params
    ? '?' + Object.entries(params)
        .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
        .join('&')
    : '';

  // Build headers string
  const headerString = Object.entries(headers)
    .map(([key, value]) => `-H '${key}: ${value}'`)
    .join(' ');

  // Build data string if present
  const dataString = data ? `-d '${JSON.stringify(data)}'` : '';

  // Combine final cURL command
  return `curl -X ${methodString} '${url}${queryString}' ${headerString} ${dataString}`.trim();
}