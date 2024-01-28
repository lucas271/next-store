"use client"

import { useEffect, useState } from "react";
import { BsPenFill, BsStarFill } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import StyledButton from "../styledButton/StyledButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewUpdateValidationType, reviewUpdateValidation } from "@/util/reviewValidation";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import axios from "axios";

export default  function Comment({title, text, userId}: {title: string, text: string, userId: string, id: string}){

    const [isEdit, setIsEdit] = useState<boolean>()
    const dispatch = useDispatch()

    const {register, handleSubmit, formState: {errors}} = useForm<reviewUpdateValidationType>({
        resolver: zodResolver(reviewUpdateValidation),
    })
    //need to update models so it allow for stars  and name to be gotten

    const {data: session} = useSession()

    return <>
        <div className="w-full  p-8 relative m-auto bg-slate-100 rounded-lg overflow-auto whitespace-break-spaces">
            <div className="absolute flex justify-between items-center left-0  top-0 p-4 w-full text-slate-500">
                <div className="text-yellow-300">
                    <BsStarFill />
                </div>
                {session?.user.id === userId  && <div className="flex gap-4 items-center ">
                    {<BsPenFill className="hover:text-slate-800 transition cursor-pointer" onClick={() => setIsEdit(true)}/>}
                    <MdClose className="hover:text-slate-800 transition cursor-pointer" onClick={() => setIsEdit(false)}/>
                </div>}
            </div>
            <div className="flex flex-col gap-3">
                <span className="text-sm text-slate-500 mt-2">{'anonymous user'}</span>
                {
                    session?.user.id === userId && (!isEdit ? <>
                        <article className="">
                            <h3 className="text-xl text-slate-600 ">{title}</h3>
                            <p>{text}</p>
                        </article>
                    </> : <>
                        <form className=" flex-col gap-4 w-full flex">
                            <input type="text" value={title} name="title"/>
                            <textarea value={text} className="h-32" name="text"/>
                            <StyledButton text="Atualizar" className={"sm:w-2/6 p-2"}/>
                        </form>
                    </>)
                }

            </div>
        </div>
    
    </>
}