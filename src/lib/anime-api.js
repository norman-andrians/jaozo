import axios from "axios";

// backend url
const BACKEND_DOMAIN = import.meta.env.VITE_HOSTED_BACKEND || import.meta.env.VITE_LOCAL_BACKEND;
const JIKAN_URL = "https://api.jikan.moe/v4";

/* ------------------------- */
// 
// _   __________   __
// | | / /| ___ \ \ / /
// | |/ / | |_/ /\ V / 
// |    \ |    /  \ /  
// | |\  \| |\ \  | |  
// \_| \_/\_| \_| \_/  
// 
// Keep Repeat Yourself💀💀💀
// 
/* ------------------------- */

async function fetchAnime (endpoint, config) { // idk what endpoint and route is that
    try {
        console.log(`Make request for ${JIKAN_URL + endpoint}`)
        const response = await axios.get(JIKAN_URL + endpoint, config);
        console.log(`Get data from response`);
        const data = await response.data;
        
        if (response.status != 200 && data) {
            const status = data.status;
            const type = data.type;
            const message = data.message;
    
            throw new Error(`${type}: (${status}) ${message}`);
        }

        console.log(`Successful fetching data`);
        
        return data;
    }
    catch (error) {
        if (error.response) {
            const status = error.response.status;
            const message = error.message;

            if (status == 429) {
                console.error(`<${status}> Too Many Request! You can't make another request in such a short time. \n\n${message}`);
            }
        }
        else {
            console.error("Something is wrong when trying get anime data");
        }

        throw error;
    }
}

// tryna get genres
// nyoba ngambil genre, tapi dikembalikan dalam bentuk objek
export async function getGenres () {
    try {
        const res = await fetchAnime(`/genres/anime`, { params: { filter: "genres" } });
        const populary = res.data;
        const genres = [];

        populary.forEach(v => {
            const genre_name = v.name;
            const genre_url = `/genre/${genre_name.toLowerCase()}`.replace(/\s+/g, "-");

            genres.push({ name: genre_name, url: genre_url });
        });
        return genres;
    } catch (error) {
        console.error("Can't get genre data");
        return false;
    }
}

export async function getFullGenres () {
    try {
        const res = await fetchAnime(`/genres/anime`, { params: { filter: "genres" } });
        
        const genres = res.data.map((genre) => {
            genre.url = `/genre/${genre.name.toLowerCase()}`.replace(/\s+/g, "-");
            return genre;
        })

        return genres;
    }
    catch (error) {
        throw error;
    }
}

export async function getGenreByName (name) {
    try {
        const { data } = await fetchAnime(`/genres/anime`, { params: { filter: "genres" } });
        const oneGenre = data.filter((genre) => {
            return genre.name.toLowerCase().replace(/\s+/g, "-") === name;
        });
        return { ...oneGenre[0] };
    }
    catch (error) {
        throw error;
    }
}

export function getEpisodeById (id) {
    return fetchAnime(`/anime/${id}/episodes`);
}

export function getAnime (id) {
    return fetchAnime(`/anime/${id}/full`);
}

export async function getPopularAnimeByGenre (id) {
    const thisYear = new Date().getFullYear();
    try {
        const { data } = await fetchAnime(`/anime`, {
            params: {
                order_by: "popularity",
                start_date: `${thisYear}-01-23`,
                genres: id
            }
        })
        return data;
    }
    catch (error) {
        throw error;
    }
}

export async function getAnimeByGenre (id, page) {
    try {
        const data = await fetchAnime(`/anime`, {
            params: {
                genres: id,
                page: page || 1
            }
        });
        return data;
    }
    catch (error) {
        throw error;
    }
}

export async function getMultipleAnime (ids) {
    try {
        const animes = await axios.get(`${BACKEND_DOMAIN}/anime`, {
            params: {
                mal_id: ids
            }
        })
        return animes;
    }
    catch (error) {
        throw error;
    }
}

export async function getTopAnime (filter) {
    try {
        const data = await fetchAnime(`/top/anime`, {
            params: {
                filter: filter
            }
        });
        return data;
    } catch (error) {
        throw error;
    }
}

export async function getTrendingAnime () {
    try {
        const data = await fetchAnime(`/seasons/now`);
        return data;
    } catch (error) {
        throw error;
    }
}

export async function getRecommendByAnime (id) {
    try {
        const { data } = await fetchAnime(`/anime/${id}/recommendations`);
        return data;
    }
    catch (error) {
        
    }
}

export async function getLatestEpisode () {
    try {
        const data = await fetchAnime(`/watch/episodes`);
        return data;
    } catch (error) {
        throw error;
    }
}

export async function findAnime (query) {
    try {
        return await fetchAnime(`/anime?q="${query}"`);
    } catch (error) {
        throw error;
    }
}