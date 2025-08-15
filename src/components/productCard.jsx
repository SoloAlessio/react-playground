// src/components/ProductCard.jsx

import React, {useState, useEffect, useRef} from 'react'
import {ShoppingCart, CreditCard, ArrowDown} from 'lucide-react' 
import toast from 'react-hot-toast'
import {useDispatch} from 'react-redux'
import {addCart} from '../redux/action'

const ProductCard = ({data}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [option, setOption] = useState('Variant')

  const menuRef = useRef(null)
  const dispatch = useDispatch()

  /* Add product to cart function */
  const addProduct = (product) => {
    dispatch(addCart(product))
  }

  /* Handle OFB clicks to close dropdowns */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    /* Container */
    <div className="flex w-full max-w-sm h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
      {/* Immagine */}
      <div className="relative h-56 w-full">
        <img
          className={`h-full w-full object-cover ${!data.available ? 'grayscale' : ''}`}
          src={'https://picsum.photos/300/200'}
          alt={data.title}
        />
      </div>

      {/* Container */}
      <div className="flex-grow px-6 py-4">
        {/* Title e subtitle */}
        <time className="mb-2 flex-grow text-sm font-semibold text-gray-400">
          {data.category}
        </time>
        <div className="mb-2 flex items-start justify-between">
          <h2 className="truncate pr-4 text-xl font-bold" title={data.title}>
            {data.title}
          </h2>
        </div>

        {/* Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            aria-haspopup="true"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="my-3 flex w-full justify-between items-center rounded-lg border p-3 font-semibold text-gray-700 shadow hover:text-gray-800 focus:outline-none"
          >
            <span>{option}</span>
            <ArrowDown size={20} className={`transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}/>
          </button>

          {/* Dropdown content */}
          <div
            className={`absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-out ${isMenuOpen ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none -translate-y-2 scale-95 opacity-0'}`}
          >
            <div
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
              className="py-1"
            >
              {/* First value */}
              <a
                onClick={() => {
                  setOption('Papaya Red'), setIsMenuOpen(false)
                }}
                className="block cursor-pointer rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Papaya Red
              </a>

              {/* Second value */}
              <a
                onClick={() => {
                  setOption('Denim Blue'), setIsMenuOpen(false)
                }}
                className="block cursor-pointer rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Denim Blue
              </a>

              {/* Third value */}
              <a
                onClick={() => {
                  setOption('Olive green'), setIsMenuOpen(false)
                }}
                className="block cursor-pointer rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Olive Green
              </a>
            </div>
          </div>
        </div>

        {/* Decsription */}
        <p className="line-clamp-3 flex-grow text-sm italic text-gray-600">
          {data.description}
          {data.description}
          {data.description}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-between gap-3 px-6 pb-5 pt-4">
        {/* check product availability */}
        {data.available ? (
          <>
            {/* Price */}
            <p className="inline-flex flex-auto items-center text-lg font-semibold text-gray-600">
              € {data.price.toFixed(2).replace('.', ',')}
            </p>

            {/* Add to cart button */}
            <button
              onClick={() => {
                toast.success('Added to cart')
                addProduct(data)
              }}
              className="inline-flex flex-1 items-center justify-center rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <ShoppingCart size={20} />
            </button>

            {/* Order button */}
            <button
              onClick={() => {
                toast.success('Your order is on the way :)')
              }}
              className="inline-flex flex-1 items-center justify-center rounded-lg bg-green-500 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-300 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <CreditCard size={20} />
            </button>
          </>
        ) : (
          /* Out of stock alternative */
          <div className="flex h-full w-full items-center justify-center">
            <p className="rounded-lg text-center text-sm font-semibold text-red-500">
              Out of stock
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductCard