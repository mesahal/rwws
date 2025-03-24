const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getAll(page = 1, pageSize = 6, activeTab) {
  const res = await fetch(
    `${API_BASE_URL}${activeTab}?page=${page}&pageSize=${pageSize}`
  );
  console.log(res);
  if (!res.ok) throw new Error("Failed to fetch news");
  const data = await res.json();
  return data; // Ensure this returns { items, totalPages }
}

export async function getById(category, id) {
  const res = await fetch(`${API_BASE_URL}${category}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch news");
  const data = await res.json();
  return data; // Ensure this returns { items, totalPages }
}

export async function create(formData, activeTab) {
  console.log(activeTab, formData);
  const accessToken = localStorage.getItem("accessToken");
  const res = await fetch(`${API_BASE_URL}${activeTab}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to fetch news");
  const data = await res.json();
  return data; // Ensure this returns { items, totalPages }
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
  if (!res.ok) throw new Error("Failed to fetch news");
  const data = await res.json();
  return data; // Ensure this returns { items, totalPages }
}

export async function remove(id, activeTab) {
  const accessToken = localStorage.getItem("accessToken");
  const res = await fetch(`${API_BASE_URL}${activeTab}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error("Failed to delete news");
  return await res.json();
}

export async function getHome(page = 1, pageSize = 10) {
  const res = await fetch(
    `${API_BASE_URL}home?page=${page}&pageSize=${pageSize}`
  );
  console.log(res);
  if (!res.ok) throw new Error("Failed to fetch home content");
  const data = await res.json();
  return data.data; // Returns { content, total_count }
}
