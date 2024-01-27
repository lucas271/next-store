"use client"

import { MdStar, MdStarOutline } from "react-icons/md"
import StyledButton from "../shared/styledButton/StyledButton"
import { useAppDispatch } from "@/lib/services/reduxStore/storeHooks"
import { useState } from "react"
import { addReview } from "@/lib/services/slices/reviewSlicer"

const AddCommentForm = ({productId}: {productId: string}) => {
    const dispatch = useAppDispatch()
    const [starHoverPosition, setStarHoverPosition] = useState<number>(0)
    const [starSelectedPosition, setStarSelectedPosition] = useState<number>(0)
    const [title, setTitle] = useState<string>('')
    const [message, setMessage] = useState<string>('')

    return <>
        <form action="" className="text-slate-800 mb-6 flex flex-col gap-4 lg:w-[55%] md:w-[70%] w-full " onSubmit={() => dispatch(addReview({title, message, productId: productId || '', rating: starSelectedPosition}))}>
            <header>
                <h3 className="text-2xl uppercase">faça sua avaliação:</h3>
            </header>
            <div className="flex gap-4 sm:items-center sm:justify-start sm:flex-row flex-col items-start justify-center">
                <label htmlFor="title">Titulo da avaliação</label>
                <input type="text" id="title" name="title" className=" border-2 p-2 border-slate-400 rounded-lg w-full sm:w-auto sm:flex-grow" onChange={e => setTitle(e.target.value)} value={title}/>
            </div>
            <div className="flex w-fit p-1" onMouseLeave={() => setStarHoverPosition(starSelectedPosition)}>
                {
                    
                    [...Array(5)].map((_value, index) => {
                        const starIndex = index 
                        //there are a lot of easier ways to do this, but not with react icons aparently. 
                        //the way they handle their icons make it impossible to transition from outline to fill without multiple components and to customize 
                        //svg style 
                        //other svg libraries are not like that, so my mistake here indeed. Just choose another library next time XD
                        return <div className="flex relative w-[1.75rem] h-[2rem]" key={index}>
                            <div className="absolute left-0 w-1/2 group">
                            <input
                                type="radio"
                                name="star"
                                id={`star-${starIndex + 0.5}`}
                                className="hidden"
                                onClick={() => setStarSelectedPosition(pv => pv === starIndex + 0.5 ? 0 : starIndex + 0.5)}
                                value={0.5 + starIndex}
                            />
                            <label
                                htmlFor={`star-${starIndex + 0.5}`}
                                className={`block cursor-pointer text-3xl overflow-hidden left-0 text-yellow-500`}
                            >
                                <MdStarOutline
                                className={`py-[0.25rem] ${(starHoverPosition >= starIndex + 0.5 || starSelectedPosition >= starIndex + 0.5) && 'hidden '}`}
                                onMouseEnter={() => setStarHoverPosition(starIndex + 0.5)}
                                />
                                <MdStar
                                className={`py-[0.25rem] ${(starHoverPosition < starIndex + 0.5 && starSelectedPosition < starIndex + 0.5) && 'hidden '} ${starIndex + 0.5 > starHoverPosition &&  starHoverPosition < starSelectedPosition && ' opacity-50'} text-transparent  transition-all duration-500 text-yellow-500`}
                                onMouseEnter={() => setStarHoverPosition(starIndex + 0.5)}
                                onMouseLeave={() => setStarHoverPosition(starHoverPosition - 0.5)}
                                />
                            </label>
                            </div>
                            <div className="absolute right-0 w-1/2 group peer-grup">
                            <input
                                type="radio"
                                name="star"
                                id={`star-${starIndex + 1}`}
                                className="hidden"
                                onClick={() => setStarSelectedPosition(pv => pv === starIndex + 1 ? 0 : starIndex + 1)}
                            />
                            
                            <label
                                htmlFor={`star-${starIndex + 1}`}
                                className="block cursor-pointer text-3xl overflow-hidden text-yellow-500"
                            >
                                <MdStarOutline
                                className={`py-[0.25rem] ${(starHoverPosition >= starIndex + 1 || starSelectedPosition >= starIndex + 1) && 'hidden'} transform -translate-x-1/2 `}
                                onMouseEnter={() => setStarHoverPosition(starIndex + 1)}
                                />
                                <MdStar
                                className={`py-[0.25rem] ${(starHoverPosition < starIndex + 1 && starSelectedPosition < starIndex + 1) && 'hidden' } ${starIndex + 1 > starHoverPosition &&  starHoverPosition < starSelectedPosition && ' opacity-50'} transform -translate-x-1/2 text-yellow-500`}
                                onMouseEnter={() => setStarHoverPosition(starIndex + 1)}
                                onMouseLeave={() => setStarHoverPosition(starHoverPosition - 0.5)}
                                />
                            </label>
                            </div>
                        </div>
                    })
                }
            </div>
            <div className=" flex flex-col gap-2">
                <label htmlFor="text">Texto da avaliação</label>
                <textarea name="text" className='h-[30vh] rounded-xl border-2 p-3 border-slate-400 w-full' id="text" onChange={e => setMessage(e.target.value)} value={message}/>
            </div>
            
            <StyledButton text="Enviar mensagem" className={'px-6 py-4'}/>
        </form>
    </>
}

export default AddCommentForm