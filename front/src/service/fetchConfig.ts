const BASE_URL = "http://localhost:8000/api/";

// Función para realizar una solicitud POST a la API
export async function postConfig<TResponse, TRequest>(
  endpoint: string,
  postData: TRequest,
): Promise<TResponse> {
  // Obtener el token de autenticación almacenado en localStorage (si existe)
  const token = localStorage.getItem("token");

  // Configurar los encabezados de la solicitud, incluyendo el token de autenticación si está disponible
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
  // Realizar la solicitud POST a la API con los datos proporcionados
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers,
    body: JSON.stringify(postData),
  });
  // Intentar analizar la respuesta como JSON, pero si falla, devolver un objeto vacío
  const data = await response.json().catch(() => ({}));

  // Si la respuesta no es exitosa, lanzar un error con el mensaje proporcionado por la API o un mensaje genérico
  if (!response.ok)
    throw new Error(data.message || "No se pudo enviar la información");
  // Devolver los datos de la respuesta como el tipo esperado
  return data as TResponse;
}

// Función para realizar una solicitud GET a la API
export async function getConfig<TResponse>(
  endpoint: string,
): Promise<TResponse> {
  // Obtener el token de autenticación almacenado en localStorage (si existe)
  const token = localStorage.getItem("token");
  // Realizar la solicitud GET a la API con los encabezados adecuados, incluyendo el token de autenticación si está disponible
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  // Intentar analizar la respuesta como JSON, pero si falla, devolver un objeto vacío
  const data = await response.json().catch(() => ({}));
  // Si la respuesta no es exitosa, lanzar un error con el mensaje proporcionado por la API o un mensaje genérico
  if (!response.ok)
    throw new Error(data.message || "Error al obtener la información");
  // Devolver los datos de la respuesta como el tipo esperado
  return data as TResponse;
}

export async function putConfig<TResponse, TRequest>(
  endpoint: string,
  putData: TRequest,
): Promise<TResponse> {
  const token = localStorage.getItem("token");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(putData),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok)
    throw new Error(data.message || "Error al actualizar la información");

  return data as TResponse;
}

// Función para realizar una solicitud DELETE a la API
export async function deleteConfig<TResponse>(
  endpoint: string,
): Promise<TResponse> {
  // Obtener el token de autenticación almacenado en localStorage (si existe)
  const token = localStorage.getItem("token");
  // Realizar la solicitud DELETE a la API con los encabezados adecuados, incluyendo el token de autenticación si está disponible
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  // Intentar analizar la respuesta como JSON, pero si falla, devolver un objeto vacío
  const data = await response.json().catch(() => ({}));
  // Si la respuesta no es exitosa, lanzar un error con el mensaje proporcionado por la API o un mensaje genérico
  if (!response.ok)
    throw new Error(data.message || "Error al eliminar la información");
  // Devolver los datos de la respuesta como el tipo esperado
  return data as TResponse;
}
