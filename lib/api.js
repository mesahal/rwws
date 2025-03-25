const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getAll(page = 1, pageSize = 6, activeTab) {
  const res = await fetch(
    `${API_BASE_URL}${activeTab}?page=${page}&pageSize=${pageSize}`
  );
  console.log(res);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`${data.message || "Failed to get content"}`);
  }
  return data;
}

export async function getById(category, id) {
  const res = await fetch(`${API_BASE_URL}${category}/${id}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`${data.message || "Failed to get content"}`);
  }
  return data;
}

export async function create(formData, activeTab) {
  const accessToken = localStorage.getItem("accessToken");
  const res = await fetch(`${API_BASE_URL}${activeTab}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`${data.message || "Failed to create content"}`);
  }
  return data;
}

export async function update(id, formData, activeTab) {
  console.log(formData);
  console.log(id);
  const accessToken = localStorage.getItem("accessToken");
  const res = await fetch(`${API_BASE_URL}${activeTab}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`${data.message || "Failed to update content"}`);
  }
  return data;
}

export async function remove(id, activeTab) {
  const accessToken = localStorage.getItem("accessToken");
  const res = await fetch(`${API_BASE_URL}${activeTab}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`${data.message || "Failed to remove content"}`);
  }
  return data;
}

export async function getHome(page = 1, pageSize = 10) {
  const res = await fetch(
    `${API_BASE_URL}home?page=${page}&pageSize=${pageSize}`
  );
  console.log(res);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`${data.message || "Failed to get content"}`);
  }
  return data.data;
}
