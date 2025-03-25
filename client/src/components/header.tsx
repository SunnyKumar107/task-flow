import React from 'react'

import Logo from './logo'
import { ThemeToggle } from './toggle-theme'

function Header() {
  return (
    <div className='px:4 flex w-full items-center justify-between py-10 md:px-16'>
      <Logo />
      <ThemeToggle />
    </div>
  )
}

export default Header
