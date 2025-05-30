"use client";
import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import PrimaryBottun from "../components/PrimaryButtun";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setSelectedArticle } from "@/store/slices/articleSlice";
import { BsEye } from "react-icons/bs";
import axios from "axios";
import Image from "next/image";

export interface Article {
  userId: number;
  id: number;
  title: string;
  body: string;
}
const Articles = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isTableView, setIsTableView] = useState(true);
  const [data, setData] = useState<Article[]>([]);

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const infoData = {
    title: "Articles",
    columns: ["Image", "Number", "Title", "Article Description", ""],
  };

  const itemHandler = (id: number) => {
    const article = data.find((article) => article.id === id);
    if (article) {
      dispatch(setSelectedArticle(article));
    }
    router.push(`/articles/${id}`);
  };

  const toggleHandler = () => {
    setIsTableView(!isTableView);
  };

  const renderCard = (
    row: Article,
    index: number,
    itemHandler?: (id: number) => void
  ) => (
    <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-md w-full">
      <Image
        src={`https://picsum.photos/seed/${row.id}/500/300`}
        alt={`Article ${row.id}`}
        width={500}
        height={300}
        className="w-full h-48 object-cover rounded mb-4"
      />
      <div className="flex items-center">
        <div className="mr-4">
          <div className="font-bold text-gray-600 dark:text-gray-300">{`${row?.title}`}</div>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-sm text-gray-600 dark:text-gray-300">{row.body}</p>
      </div>
      <div className="mt-4 flex gap-2">
        <PrimaryBottun
          width={"w-full"}
          bgColor={"bg-primary-100 dark:bg-primary-600"}
          px={"px-4"}
          clickHandler={() => itemHandler && itemHandler(row.id)}
        >
          Open
          <BsEye size={20} />
        </PrimaryBottun>
      </div>
    </div>
  );

  const renderRow = (
    row: Article,
    index: number,
    itemHandler?: (id: number) => void
  ) => (
    <>
      <td className="px-4 py-4 bg-white dark:bg-gray-800">
        <Image
          src={`https://picsum.photos/seed/${row.id}/100/60`}
          alt={`Article ${row.id}`}
          width={100}
          height={60}
          className="w-24 h-14 object-cover rounded"
        />
      </td>
      <td className="px-4 bg-white dark:bg-gray-800 py-4 font-bold text-gray-600 dark:text-gray-300">
        {row.id}
      </td>
      <td className="px-4 bg-white dark:bg-gray-800 py-4 font-bold text-gray-600 dark:text-gray-300">
        {row.title}
      </td>
      <td className="px-4 bg-white dark:bg-gray-800 py-4 font-bold text-gray-600 dark:text-gray-300">
        {row.body}
      </td>
      <td className="px-4 bg-white dark:bg-gray-800 py-4">
        <div className="flex justify-center items-center gap-3">
          <PrimaryBottun
            width={"w-fit"}
            bgColor={"bg-primary-100 dark:bg-primary-600"}
            px={"px-6"}
            clickHandler={() => itemHandler && itemHandler(row.id)}
          >
            Open
            <BsEye size={20} />
          </PrimaryBottun>
        </div>
      </td>
    </>
  );
  return (
    <div className="bg-primary-100 dark:bg-primary-900 p-6 rounded-lg shadow-md">
      <div className="flex w-full justify-between items-center ">
        <div className="flex gap-2 justify-between items-center">
          <div className="font-bold">Articles List</div>
        </div>
      </div>
      <div className="w-full  border-2 opacity-50 my-4 border-secondary-600"></div>
      <div className="w-full">
        <DataTable
          data={data}
          columns={infoData.columns}
          renderRow={renderRow}
          renderCard={renderCard}
          itemHandler={itemHandler}
          isTableView={isTableView}
          toggleHandler={toggleHandler}
          haveViewToggle={true}
        />
      </div>
    </div>
  );
};
export default Articles;
