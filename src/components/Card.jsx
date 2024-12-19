import React from 'react'

export default function Card({item, checkCard}) {

  return (
    <div className={`relative w-32 h-44 group card cursor-pointer ${item.toFlip || !item.canFlip ? "visible" : ""}`} onClick={checkCard}>
        <div className={`bg-black border-mm-yellow [transform:rotateY(0deg)] absolute flex justify-center items-center w-full h-full rounded-md border border-solid overflow-hidden transition-transform duration-500 ease-out card-face group/back card-back`}>
            <img src="../assets/Images/Cobweb.png" alt="" className="absolute transition-width transition-height duration-100 ease-in-out w-11 h-11 transform -rotate-90 top-0 left-0 group-hover/back:size-[54px]" />
            <img src="../assets/Images/Cobweb.png" alt="" className="absolute transition-width transition-height duration-100 ease-in-out w-11 h-11 transform top-0 right-0 group-hover/back:size-[54px]" />
            <img src="../assets/Images/Cobweb.png" alt="" className="absolute transition-width transition-height duration-100 ease-in-out w-11 h-11 transform rotate-180 bottom-0 left-0 group-hover/back:size-[54px]" />
            <img src="../assets/Images/Cobweb.png" alt="" className="absolute transition-width transition-height duration-100 ease-in-out w-11 h-11 transform rotate-90 bottom-0 right-0 group-hover/back:size-[54px]" />
            <img src="../assets/Images/Spider.png" alt="" className="self-start transition-transform duration-100 ease-in-out -translate-y-2.5 group-hover/back:translate-y-0" />
        </div>
        <div className={`bg-mm-orange border-gray-900 [transform:rotateY(180deg)] absolute flex justify-center items-center w-full h-full rounded-md border border-solid overflow-hidden duration-500 ease-out card-face group/front card-front`}>
            <img src="../assets/Images/CobwebGrey.png" alt="" className="absolute transition-width transition-height duration-100 ease-in-out w-11 h-11 transform -rotate-90 top-0 left-0 group-hover/front:size-[54px]" />
            <img src="../assets/Images/CobwebGrey.png" alt="" className="absolute transition-width transition-height duration-100 ease-in-out w-11 h-11 transform top-0 right-0 group-hover/front:size-[54px]" />
            <img src="../assets/Images/CobwebGrey.png" alt="" className="absolute transition-width transition-height duration-100 ease-in-out w-11 h-11 transform rotate-180 bottom-0 left-0 group-hover/front:size-[54px]" />
            <img src="../assets/Images/CobwebGrey.png" alt="" className="absolute transition-width transition-height duration-100 ease-in-out w-11 h-11 transform rotate-90 bottom-0 right-0 group-hover/front:size-[54px]" />
            <img src={item.image} alt="" className="relative card-value transition-transform duration-100 ease-in-out scale-90 group-hover/front:scale-100" />
        </div>

    </div>
  )
}
