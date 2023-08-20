import axios from "axios";

// backend url
const momoko_domain = "";
const local_domain = "http://localhost:6969";

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

async function fetchAnime (url, config) {
    try {
        console.log(`Make request for ${url}`)
        const response = await axios.get(url, config);
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
        const res = await fetchAnime(`https://api.jikan.moe/v4/genres/anime`, { params: { filter: "genres" } });
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
        const res = await fetchAnime(`https://api.jikan.moe/v4/genres/anime`, { params: { filter: "genres" } });
        
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

export function getEpisodeById (id) {
    return fetchAnime(`https://api.jikan.moe/v4/anime/${id}/episodes`);
}

export function getAnime (id) {
    return fetchAnime(`https://api.jikan.moe/v4/anime/${id}/full`);
}

export async function getMultipleAnime (ids) {
    try {
        const animes = await axios.get(`${local_domain}/anime`, {
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
        const data = await fetchAnime(`https://api.jikan.moe/v4/top/anime`, {
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
        const data = await fetchAnime(`https://api.jikan.moe/v4/seasons/now`);
        return data;
    } catch (error) {
        throw error;
    }
}

export async function getLatestEpisode () {
    try {
        const data = await fetchAnime(`https://api.jikan.moe/v4/watch/episodes`);
        return data;
    } catch (error) {
        throw error;
    }
}

export async function findAnime (query) {
    try {
        return await fetchAnime(`https://api.jikan.moe/v4/anime?q="${query}"`);
    } catch (error) {
        throw error;
    }
}