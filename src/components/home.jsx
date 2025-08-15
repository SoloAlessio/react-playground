import React from 'react'
import {useState, useRef} from 'react'
import Products from '../assets/MOCK_DATA.json'
import ProductCard from './productCard'

const Home = () => {
  const [category, setCategory] = useState()

  function trovaCategorieUniche(arrayDiOggetti) {
    // Verifichiamo se l'input è un array valido.
    if (!Array.isArray(arrayDiOggetti)) {
      console.error("L'input non è un array.")
      return []
    }

    // Usiamo un Set per raccogliere i valori unici delle categorie.
    const categorieUnicheSet = new Set()

    // Iteriamo su ogni oggetto e aggiungiamo la sua categoria al Set.
    // Il Set gestirà automaticamente i duplicati.
    arrayDiOggetti.forEach((oggetto) => {
      if (oggetto && oggetto.category) {
        if (oggetto.category.includes('-')) {
          categorieUnicheSet.add(
            oggetto.category.substring(0, oggetto.category.indexOf('-')),
          )
        } else {
          categorieUnicheSet.add(oggetto.category)
        }
      }
    })

    // Convertiamo il Set in un array e lo restituiamo.
    return Array.from(categorieUnicheSet)
  }

  const Categorie = trovaCategorieUniche(Products)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const containerRef = useRef(null)

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef.current.scrollLeft)
    e.preventDefault()
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - containerRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    containerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <>
      {/* Categories */}
      <div className="container mb-8 relative mx-auto w-full overflow-x-hidden">
        <div className="right-0  absolute aspect-square h-full bg-gradient-to-r from-transparent to-[#f6f6f6]" />
        <div className="left-0  absolute aspect-square h-full bg-gradient-to-l from-transparent to-[#f6f6f6]" />

        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseUp}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="container mx-auto flex cursor-grab justify-between gap-8 overflow-hidden px-8 active:cursor-grabbing"
        >
          <div className="flex-shrink-0">
            <button
              onClick={() => setCategory('')}
              className="rounded-xl border px-4 py-2 text-center font-semibold text-slate-600 transition-all hover:bg-slate-600 hover:text-white"
            >
              ALL
            </button>
          </div>
          {Categorie.map((categoria) => (
            <div key={categoria} className="flex-shrink-0">
              <button
                onClick={() => setCategory(categoria)}
                className="rounded-xl border px-4 py-2 text-center font-semibold text-slate-600 transition-all hover:bg-slate-600 hover:text-white"
              >
                {categoria}
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Products */}
      <div className="sm :px-0 container mx-auto grid place-items-center gap-8 px-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Products.filter((product) =>
          category ? product.category.includes(category) : true,
        ).map((product) => (
          <ProductCard data={product} key={product.id} />
        ))}
      </div>
    </>
  )
}

export default Home
