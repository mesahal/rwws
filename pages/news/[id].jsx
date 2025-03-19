import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { getById, getAll } from "../../lib/api";
import NewsDetail from "../../components/NewsDetail";

export async function getStaticPaths() {
  try {
    const { items } = await getAll();
    if (!items || items.length === 0) {
      console.warn("No news items found.");
      return { paths: [], fallback: true };
    }

    const paths = items.map((item) => ({
      params: { id: String(item.id) }, // Ensure it's a string
    }));

    return { paths, fallback: "blocking" };
  } catch (error) {
    console.error("Error generating static paths:", error);
    return { paths: [], fallback: true };
  }
}

export async function getStaticProps({ params }) {
  if (!params?.id) {
    return { notFound: true };
  }

  try {
    const newsItem = await getById(params.id);

    if (!newsItem) {
      return { notFound: true };
    }

    return { props: { newsItem } };
  } catch (error) {
    console.error("Error fetching news item:", error);
    return { notFound: true };
  }
}

export default function NewsDetailPage({ newsItem }) {
  const router = useRouter();

  // If the page is still loading
  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  return <NewsDetail newsItem={newsItem} />;
}
