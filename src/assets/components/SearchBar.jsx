import React, { useEffect, useState } from "react"
import SearchIcon from "./icons/SearchIcon"
import { useNavigate } from "react-router-dom";

export default function SearchBar ({ placeholder, theme }) {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [btnTheme, setBtnTheme] = useState("");
    const [inpTheme, setInpTheme] = useState("");

    useEffect(() => {
        switch (theme) {
            case 'original':
                setBtnTheme("bg-primary hover:bg-border-primary text-white");
                setInpTheme("ps-5");
                break;
            case 'darked':
                setBtnTheme('bg-transparent hover:bg-transparent text-pit-primary');
                setInpTheme("ps-0");
                break;
            default:
                setBtnTheme("bg-primary hover:bg-border-primary text-white");
                setInpTheme("ps-5");
        }
    }, [theme]);

    const handleSearch = (e) => {
        const q = query;

        e.preventDefault();

        if (query.length > 0) {
            setQuery("");
            navigate(`/search?query=${encodeURIComponent(q)}`);
        }

    }

    const handleChange = (e) => {
        setQuery(e.target.value);
    }

    return (
        <form onSubmit={handleSearch}>
            <div className='flex flex-row h-14 sm:w-96 mx-auto rounded-md bg-dark-primary border border-border-primary border-opacity-30'>
                <button
                    type="submit"
                    className={btnTheme + " transition duration-200 w-16 h-full grid items-center rounded-s-md"}
                    >
                        <SearchIcon width={17} center={true} />
                    </button>
                <input
                    type="text"
                    name="query"
                    onChange={handleChange}
                    value={query}
                    placeholder={placeholder}
                    className={inpTheme + " h-full w-full bg-transparent text-white font-noto-sans placeholder:text-sm placeholder:text-pit-primary placeholder:text-opacity-50"}
                />
            </div>
        </form>
    )
}