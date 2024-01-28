"use client"


import Item from "@/app/_components/pages/[item]/Item"
import CommentsContainer from "@/app/_components/shared/commentsContainer/CommentsContainer";
import { useParams } from "next/navigation";

export default function ItemContainer(){
  const id = useParams()

  return<>
    <main className="w-[90%] md:w-[80%] sm:w-[85%] h-screen-minus-nav m-auto relative py-5 ">
      <div className="md:px-8 sm:px-4 px-6 py-4 overflow-hidden relative h-full gap-5 w-full border-slate-200 border-4 rounded-lg flex flex-col sm:flex-row justify-evenly items-center">
          <Item/>
      </div>
    </main>
    <footer>
      <CommentsContainer productId={String(id?.item)}/>
    </footer>
  </>
}