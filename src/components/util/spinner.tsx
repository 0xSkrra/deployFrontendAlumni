import React from 'react'
import { Puff, Vortex } from 'react-loader-spinner'

export const Spinner = () => {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
    <Puff
  height="80"
  width="80"
  radius={1}
  color="#5A5A5A"
  ariaLabel="puff-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>
  </div>
  )
}
