"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

const Article = () => {
  const params = useParams();
  const article = params.article; 

  type ArticleData = {
    userId: number;
    id: number;
    title: string;
    body: string;
  };
  const [data, setData] = useState<ArticleData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!article) return;
    const fetchData = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${article}`
      );
      const json = await response.json();
      setData(json);
      setLoading(false);
    };
    fetchData();
  }, [article]);

  return (
    <div>
      {!loading && data ? (
        <div>
          <h2>{data.title}</h2>
          <Image
            src={`https://picsum.photos/seed/${article}/100/60`}
            alt={`Article ${article}`}
            width={100}
            height={60}
            className="w-24 h-14 object-cover rounded"
          />
          <p>{data.body}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
export default Article;
