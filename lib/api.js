const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getAll(page = 1, pageSize = 10, activeTab) {
  const res = await fetch(
    `${API_BASE_URL}${activeTab}?page=${page}&pageSize=${pageSize}`
  );
  if (!res.ok) throw new Error("Failed to fetch news");
  const data = await res.json();
  return data; // Ensure this returns { items, totalPages }
}

export async function getById(id) {
  const res = await fetch(`${API_BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch news");
  const data = await res.json();
  return data; // Ensure this returns { items, totalPages }
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

// export async function fetchNewsItem(id) {
//   const res = await fetch(`${API_BASE_URL}/${id}`);
//   if (!res.ok) {
//     if (res.status === 404) return null;
//     throw new Error("Failed to fetch news item");
//   }
//   const data = await res.json();
//   return data.item || data; // Adjust based on your API response structure
// }

// // New API functions
// export async function fetchTeamMembers() {
//   const res = await fetch("http://localhost:5000/rwws/v1/teamMembers", {
//     next: { revalidate: 3600 }, // Revalidate every hour
//   });
//   console.log(res);
//   if (!res.ok) throw new Error("Failed to fetch team members");
//   return res.json();
// }

// export async function fetchPartners() {
//   const res = await fetch("http://localhost:5000/rwws/v1/partners", {
//     cache: "force-cache", // SSG default
//   });
//   if (!res.ok) throw new Error("Failed to fetch partners");
//   return res.json();
// }

// export async function fetchMilestones() {
//   const res = await fetch("http://localhost:5000/rwws/v1/milestones", {
//     cache: "force-cache",
//   });
//   if (!res.ok) throw new Error("Failed to fetch milestones");
//   return res.json();
// }
