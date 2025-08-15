import React from 'react'
import {NavLink} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {User, LogIn, ShoppingBag} from 'lucide-react'
import Logo from '../assets/logo.png'
import {Menu} from 'lucide-react'

const Navbar = () => {
    const state = useSelector((state) => state.handleCart)
    
    let quantity = 0
    state.forEach((item) => {
        quantity += item.qty
    })

    return (
        <nav className="sticky top-0 z-20 mb-8 bg-white/90 py-4 shadow-sm [backdrop-filter:saturate(180%)_blur(5px)]">
            <div className="container mx-auto flex h-9 items-center justify-between px-8">
                <span className="mr-2 size-8">
                    <img src={Logo} alt="" className="object-fill" />
                </span>
                <NavLink className="font-fancy text-indigo-500" to="/">
                    MediaShop
                </NavLink>
                <button
                    data-slot="button"
                    className="inline-flex size-9 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border text-sm font-medium shadow-none outline-none transition-all focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 lg:hidden [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0"
                    type="button"
                    aria-haspopup="dialog"
                    aria-expanded="false"
                    aria-controls="navbarSupportedContent"
                    data-state="closed"
                >
                    <span className="sr-only"></span>
                    <Menu />
                </button>

                <div
                    className="mx-auto hidden items-center lg:flex"
                    id="navbarSupportedContent"
                >
                    <ul className="mx-auto flex gap-6 text-center">
                        <li>
                            <NavLink
                                className="text-sm hover:text-gray-700"
                                to="/"
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="text-sm hover:text-gray-700"
                                to="/product"
                            >
                                Products
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="text-sm hover:text-gray-700"
                                to="/about"
                            >
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="text-sm hover:text-gray-700"
                                to="/contact"
                            >
                                Contact
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="hidden gap-2 lg:flex">
                    {/* Register Button */}
                    <NavLink
                        to="/register"
                        className="relative inline-flex flex-1 shrink-0 items-center justify-center gap-2 rounded-lg border border-indigo-600 bg-white px-2.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm transition-colors duration-300 hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 lg:px-5"
                    >
                        <User size={16} />
                        <span className="hidden lg:block">Registrati</span>
                    </NavLink>

                    {/* Login Button */}
                    <NavLink
                        to="/login"
                        className="relative flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-300 hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <LogIn size={16} />
                        <span className="hidden lg:block">Accedi</span>
                    </NavLink>

                    {/* Cart Button */}
                    <NavLink
                        to="/cart"
                        className="relative ml-4 inline-flex size-10 flex-1 shrink-0 items-center justify-center rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-300 hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <ShoppingBag size={16} />
                        <span className="absolute -end-2 -top-2 grid aspect-square h-6 w-6 place-items-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-white">
                            {quantity}
                        </span>
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
