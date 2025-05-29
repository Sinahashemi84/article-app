"use client";
import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import PrimaryBottun from "../components/PrimaryButtun";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setSelectedArticle } from "@/store/slices/articleSlice";
import { BsEye } from "react-icons/bs";
import axios from "axios";

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
    columns: ["Number", "Title", "Article Description", ""],
  };

  const itemHandler = (id: number) => {
    const article = data.find((article) => article.id === id);
    if (article) {
      dispatch(setSelectedArticle(article));
    }
    router.push(`/articles/article/${id}`);
  };

  const toggleHandler = () => {
    setIsTableView(!isTableView);
  };

  const renderCard = (
    row: Article,
    index: number,
    itemHandler?: (id: number) => void
  ) => (
    <div className="p-4 border rounded-lg bg-white shadow-md w-full">
      <div className="flex items-center">
        <div className="mr-4 font-16Regular !text-Gray600">
          <div>{`${row?.title}`}</div>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-sm text-gray-600"> شرایط: {row.body}</p>
      </div>
      <div className="mt-4 flex gap-2">
        <PrimaryBottun
          width={"w-full"}
          bgColor={"bg-blue-500"}
          px={"px-4"}
          clickHandler={() => itemHandler && itemHandler(row.id)}
        >
          <BsEye size={18} />
          Open
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
      <td className="px-4 py-4">{row.id}</td>
      <td className="px-4 py-4">{row.title}</td>
      <td className="px-4 py-4">{row.body}</td>
      <td>
        <div className="flex justify-center items-center gap-3">
          <PrimaryBottun
            width={"w-fit"}
            bgColor={"bg-blue-500"}
            px={"px-6"}
            clickHandler={() => itemHandler && itemHandler(row.id)}
          >
            <BsEye size={18} />
            Open
          </PrimaryBottun>
        </div>
      </td>
    </>
  );
  return (
    <div className="">
      <div className="flex w-full justify-between items-center ">
        <div className="flex gap-2 justify-between items-center">
          <div className="border-l-8 rounded-l-[6px] border-DarkBlue400 h-10"></div>
          <div className="font-20Bold !text-Gray600">Articles List</div>
        </div>
      </div>
      <div className="w-full  border-1 opacity-50 mb-4"></div>
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
