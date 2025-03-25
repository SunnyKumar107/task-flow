import React from 'react'

import Logo from './logo'
import { ThemeToggle } from './toggle-theme'

function Header() {
  return (
    <div className='px:4 border-foreground/30 flex h-24 w-full items-center justify-between border-b md:px-16'>
      <Logo />
      <ThemeToggle />
    </div>
  )
}

export default Header
