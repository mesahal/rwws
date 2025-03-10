export async function fetchNews(page = 1) {
  const res = await fetch(`http://localhost:5000/news?page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch news");
  const data = await res.json();
  return data; // Ensure this returns { items, totalPages }
}

export async function fetchNewsItem(id) {
  const res = await fetch(`http://localhost:5000/news/${id}`);
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error("Failed to fetch news item");
  }
  const data = await res.json();
  return data.item || data; // Adjust based on your API response structure
}

// New API functions
export async function fetchTeamMembers() {
  const res = await fetch("http://localhost:5000/teamMembers", {
    next: { revalidate: 3600 }, // Revalidate every hour
  });
  console.log(res);
  if (!res.ok) throw new Error("Failed to fetch team members");
  return res.json();
}

export async function fetchPartners() {
  const res = await fetch("http://localhost:5000/partners", {
    cache: "force-cache", // SSG default
  });
  if (!res.ok) throw new Error("Failed to fetch partners");
  return res.json();
}

export async function fetchMilestones() {
  const res = await fetch("http://localhost:5000/milestones", {
    cache: "force-cache",
  });
  if (!res.ok) throw new Error("Failed to fetch milestones");
  return res.json();
}
