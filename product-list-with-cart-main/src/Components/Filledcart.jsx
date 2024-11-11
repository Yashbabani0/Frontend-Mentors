import React from 'react'

export default function Filledcart() {
  return (
    <div class="flex-col items-center justify-center hidden filled_cart">
      <div class="mx-8 mb-4 pb-4 border-b border-rose-400 w-[80%]">
        <b class="name_of_product text-rose-500"></b>
        <div class="flex items-center justify-between">
          <div class="flex gap-4 my-2">
            <span class="number_of_products text-red font-bold"></span>
            <span class="price_of_product text-rose-400"></span>
            <span
              class="price_multiply_by_number_of_products_of_same_item text-rose-500 font-semibold"
            ></span>
          </div>
          <div
            class="rounded-full w-4 h-4 border border-rose-500 flex items-center justify-center"
          >
            <img
              src="./assets/images/icon-remove-item.svg"
              class="cursor-pointer"
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="total flex items-center justify-between px-8 mb-8 w-full">
        <p class="text-rose-500">Order Total</p>
        <h2 class="text-rose-900 text-2xl font-bold total_amount"></h2>
      </div>
      <div
        class="flex items-center justify-center gap-2 bg-rose-100 text-sm mb-6 p-4 mx-8 w-[80%] rounded-lg"
      >
        <img src="./assets/images/icon-carbon-neutral.svg" alt="" />
        <p>This is a <b class="">carbon-neutral</b> delivery</p>
      </div>
      <button
        class="mb-8 bg-red py-3 text-rose-50 font-semibold rounded-full tracking-wide w-[80%]"
      >
        Confirm Order
      </button>
    </div>
  )
}
