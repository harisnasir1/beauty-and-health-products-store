import React from 'react'
import second, { BounceLoader } from 'react-spinners'
import { Bounce } from 'react-toastify'
const Spinner = () => {
  return (
   <BounceLoader color=' black' speedMultiplier={2}/>
  )
}

export default Spinner