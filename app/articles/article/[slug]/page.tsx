import React, { FC } from "react";
import type { Article } from "../../page";
import Image from "next/image";

interface ArticleProps {
  params: {
    slug: string;
  };
}

const Article: FC<ArticleProps> = async ({ params }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.slug}`
  );
  const data = await response.json();
  return (
    <div>
      {data ? (
        <div>
          <h2>{data.title}</h2>
          <Image
            src={`https://picsum.photos/seed/${params.slug}/100/60`}
            alt={`Article ${params.slug}`}
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
