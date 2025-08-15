import {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {CircleMinus, CirclePlus} from 'lucide-react'
import toast from 'react-hot-toast'
import {useDispatch} from 'react-redux'
import {delCart, addCart} from '../redux/action'

const Cart = () => {
    const cartProducts = useSelector((state) => state.handleCart)
    console.log(cartProducts)

    let totalPrice = 0
    cartProducts.forEach((item) => {
        totalPrice += item.price * item.qty
    })

    const dispatch = useDispatch()

    const delProduct = (product) => {
        dispatch(delCart(product))
    }
    const addProduct = (product) => {
        dispatch(addCart(product))
    }

    return (
        <>
            <div className="container relative mx-auto px-8">
                {/* Cart Resumer */}
                <div className="absolute bottom-0 max-h-fit w-full rounded-xl border bg-white/90 p-8 font-semibold text-gray-600 shadow-lg [backdrop-filter:saturate(180%)_blur(5px)] md:right-8 md:top-0 md:w-1/4">
                    <h2 className="mb-4 text-center text-lg font-semibold">
                        Carrello
                    </h2>
                    <div className="mb-2 flex items-center justify-between text-sm">
                        <p>Spedizione</p>
                        <p>{totalPrice <= 50 ? 'Gratis' : '€ 5,95'}</p>
                    </div>
                    <div className="flex items-center justify-between text-sm font-bold">
                        <p>
                            TOTALE{' '}
                            <span className="ml-1 font-light text-slate-500">
                                IVA inclusa
                            </span>
                        </p>
                        <p>€ {totalPrice.toFixed(2)}</p>
                    </div>
                </div>

                {/* Cart Products */}
                <div className="flex flex-col gap-4">
                    {cartProducts.map((data) => (
                        <div
                            key={data.id}
                            className={`flex h-full w-full max-w-lg flex-row overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-all`}
                        >
                            {/* Immagine */}
                            <div className="relative h-56 w-56 flex-none bg-red-500">
                                <img
                                    className={`h-full w-full object-cover ${!data.available ? 'grayscale' : ''}`}
                                    src={'https://picsum.photos/300/200'}
                                    alt={data.title}
                                />
                            </div>

                            {/* Container */}
                            <div className="flex flex-col gap-2 overflow-hidden p-4">
                                {/* Category */}
                                <time className="text-sm font-semibold text-gray-400">
                                    {data.category}
                                </time>

                                {/* Title */}
                                <div className="flex items-start justify-between">
                                    <h2
                                        className="truncate pr-4 text-xl font-bold"
                                        title={data.title}
                                    >
                                        {data.title}
                                    </h2>
                                </div>

                                {/* Decsription */}
                                <p className="line-clamp-3 text-sm italic text-gray-600">
                                    {data.description}
                                    {data.description}
                                    {data.description}
                                </p>

                                {/* Price */}
                                <div className="mt-4 flex items-center justify-between">
                                    <p className="inline-flex flex-auto items-center text-lg font-semibold text-gray-600">
                                        €{' '}
                                        {data.price
                                            .toFixed(2)
                                            .replace('.', ',')}
                                    </p>
                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-3">
                                        {/* Delete Product */}
                                        <button
                                            onClick={() => {
                                                toast.success(
                                                    'Successfully Removed!',
                                                )
                                                delProduct(data)
                                            }}
                                            className="flex size-9 items-center justify-center rounded-lg bg-red-500 text-white shadow-sm transition-colors duration-300 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                        >
                                            <CircleMinus size={16} />
                                        </button>
                                        {/* Proudct QTY */}
                                        <div className="flex size-9 items-center justify-center rounded-lg bg-gray-200 text-gray-600 shadow-sm transition-colors duration-300">
                                            <p className="font-semibold text-gray-600">
                                                {data.qty}
                                            </p>
                                        </div>
                                        {/* Add Product */}
                                        <button
                                            onClick={() => {
                                                toast.success(
                                                    'Successfully Added!',
                                                )
                                                addProduct(data)
                                            }}
                                            className="flex size-9 items-center justify-center rounded-lg bg-indigo-500 text-white shadow-sm transition-colors duration-300 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            <CirclePlus size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Cart
