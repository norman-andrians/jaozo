import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import './App.css'
import { getGenres } from './lib/anime-api'
import Navbar from './assets/components/navbar'
import Landing from './assets/pages/landing'
import Anime from './assets/pages/anime'

function App() {
  const [rpages, setPages] = useState([]);
  
  const pages = [
    {
        name: 'Home',
        url: '/home',
        child: null
    },
    {
        name: 'Genres',
        url: '/genre',
        child: []
    },
    {
        name: 'Theme',
        url: '/theme',
        child: null
    },
    {
        name: 'Status',
        url: '/status',
        child: null
    },
  ]

  // inget ini belum direkomendasikan
  // variabel useState pages, pages, request useEffect ini sudah seharusnya ditempatkan lagi di komponen Navbar
  // masing-masing list navigasi teriterasi yang di Navbar harus di ubah menjadi komponen yang kemudia di iterasikan
  // jadi saat di komponen Navbar melakukan request, data akan update lagi jika data di lemparkan ke komponen genre
  useEffect(() => {
      getGenres().then((data) => {
          pages[1].child = data;
        }).finally(() => {
          setPages(pages);
      })
  }, []);

  return (
    <Router>
      <Navbar pages={rpages} />
      <Routes>
        <Route path='/' element={ <Landing /> } />
        <Route path='/anime/:animeId' element={ <Anime /> } />
      </Routes>
    </Router>
  )
}

export default App
