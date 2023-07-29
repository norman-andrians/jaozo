import { useNavigate, Link } from "react-router-dom";
import Logo from "./icons/Logo";
import SearchBar from "./SearchBar";

function Navbar () {
    const navigate = useNavigate();

    const pages = [
        {
            name: 'Home',
            url: '/home'
        },
        {
            name: 'Genres',
            url: '/genre'
        },
        {
            name: 'Theme',
            url: '/theme'
        },
        {
            name: 'Status',
            url: '/status'
        },
    ]

    return (
        <nav className="py-7 px-8 md:px-60 lg:px-20 flex justify-between items-center">
            <Link to="/">
                <Logo width={74.7} />
            </Link>
            <div className="flex gap-20 font-montserrat">
                {pages.map((p, k) => {
                    return (
                        <button
                            className="text-lg text-white text-opacity-80 hover:text-opacity-100 transition duration-300"
                            onClick={() => navigate(p.url)}
                            key={k}>
                            {p.name}
                        </button>
                    )
                })}
                <SearchBar placeholder="One Piece, Naruto..." theme='darked' />
            </div>
        </nav>
    )
}

export default Navbar