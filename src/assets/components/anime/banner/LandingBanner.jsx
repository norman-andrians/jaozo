import React, { useState } from "react";
import { ReactComponent as LeftArrow } from "../../../icons/arrow-left.svg";
import { ReactComponent as RightLongArrow } from "../../../icons/arrow-long-right.svg";
import { useNavigate } from "react-router-dom";

function LandingBanner () {
    return <>You need to choose childs</>
}

function ShortChategories ({ data }) {
    const navigate = useNavigate();
    const [pointIndex, setIndex] = useState(0);
    const { name, url, count } = data[pointIndex];

    const next = () => {
        setIndex(pointIndex < data.length - 1 ? pointIndex + 1 : 0);
    }

    const prev = () => {
        setIndex(pointIndex > 0 ? pointIndex - 1 : data.length - 1);
    }

    return (
        <div className="w-full h-[380px] rounded-[24px] overflow-x-hidden relative">
            <div className="flex flex-row h-full transition-all duration-700" style={{ width: data.length + "00%", transform: `translateX(-${((pointIndex * 100) / data.length) + "%"})` }}>
                {data.map((cate, key) => {
                    return <div className="flex-1 w-full h-full bg-no-repeat bg-center bg-cover" style={{backgroundImage: `url(${cate.img})`}}></div>
                })}
            </div>
            <div className="absolute w-full h-full rounded-[24px] left-0 top-0 bg-black bg-opacity-40"></div>
            <header className="absolute w-full h-full left-0 top-0 flex flex-row items-center">
                <div className="flex flex-col px-32 gap-5">
                    <header className="flex flex-col gap-2">
                        <h1 className="text-5xl font-montserrat">{name}</h1>
                        <div className="text-lg font-montserrat">{count} Anime</div>
                    </header>
                    <button className="flex flex-row justify-between w-44 py-4 px-6 bg-dark-primary bg-opacity-60 hover:bg-opacity-70 transition backdrop-blur-md rounded-lg items-center group" onClick={() => { navigate(url) }}>
                        <div className="font-noto-sans text-yolo-primary">Browse</div>
                        <div className=""><RightLongArrow className="-translate-x-1 group-hover:translate-x-0 transition" /></div>
                    </button>
                </div>
            </header>
            <button className="absolute left-0 top-1/2 -translate-y-1/2 group h-40 w-20 flex justify-center items-center" onClick={prev}><LeftArrow className="opacity-60 group-hover:opacity-90 transition" /></button>
            <button className="absolute right-0 top-1/2 -translate-y-1/2 group h-40 w-20 flex justify-center items-center" onClick={next}><LeftArrow className="rotate-180 opacity-60 group-hover:opacity-90 transition" /></button>
        </div>
    )
}

LandingBanner.ShortChategories = ShortChategories;

export default LandingBanner;