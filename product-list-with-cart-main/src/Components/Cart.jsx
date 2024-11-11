import React from 'react'
import Emptycart from './Emptycart'
import Filledcart from './Filledcart'

export default function Cart() {
  return (
    <div
    class="cart mt-8 mb-8 bg-rose-50 min-w-[21em] rounded-lg flex flex-col items-center justify-center"
  >
    <h2
      class="text-red flex items-start font-bold py-4 px-8 text-2xl text-left w-full"
    >
      Your Cart &nbsp;
      <span class="number_of_items">(0)</span>
    </h2>
    {/* Filled Cart */}
    <Filledcart />

    {/* Empty Cart */}
    <Emptycart />
  </div>
  )
}
