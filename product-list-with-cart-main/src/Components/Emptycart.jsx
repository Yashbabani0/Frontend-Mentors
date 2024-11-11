import React from 'react'

export default function Emptycart() {
  return (
    <div
    class="empty_cart w-full flex items-center justify-center flex-col"
  >
    <img
      src="./assets/images/illustration-empty-cart.svg"
      class="w-[50%] h-full"
      alt=""
    />
    <p class="text-rose-500 mb-4">Your added items will appear here</p>
  </div>
  )
}
