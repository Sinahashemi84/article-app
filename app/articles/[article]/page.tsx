"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import PrimaryButton from "@/app/components/PrimaryButtun";

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
    <div className="min-h-screen flex flex-col items-center justify-top bg-gradient-to-br from-gray-50 via-white to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-2 py-8">
      <div className="w-full max-w-xl mb-6">
        <PrimaryButton
          href="/articles"
          bgColor="bg-primary-200 dark:bg-primary-600 hover:bg-primary-600 dark:hover:bg-primary-500"
          px="px-6"
        >
          ← Back to Articles
        </PrimaryButton>
      </div>
      {!loading && data ? (
        <div className="w-full max-w-xl bg-white dark:bg-gray-700 rounded-2xl shadow-2xl p-6 sm:p-10 flex flex-col items-center gap-6">
          <Image
            src={`https://picsum.photos/seed/${article}/600/300`}
            alt={`Article ${article}`}
            width={600}
            height={300}
            className="w-full h-48 sm:h-60 object-cover rounded-xl shadow-md"
            priority
          />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white text-center">
            {data.title}
          </h2>
          <p className="text-gray-700 dark:text-gray-200 text-base sm:text-lg text-center leading-relaxed">
            {data.body}
          </p>
        </div>
      ) : (
        <div className="w-full max-w-xl flex justify-center items-center h-64">
          <span className="text-gray-400 text-lg animate-pulse">
            Loading...
          </span>
        </div>
      )}
    </div>
  );
};
export default Article;
