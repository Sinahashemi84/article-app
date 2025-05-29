import React, { FC } from "react";
import type { Article } from "../../page";

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
          <p>{data.body}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
export default Article;
