import React from 'react'

import Logo from './logo'
import { ThemeToggle } from './toggle-theme'

function Header() {
  return (
    <div className='border-foreground/30 bg-background fixed top-0 z-50 flex h-24 w-full items-center justify-between border-b px-6 md:px-16'>
      <Logo />
      <ThemeToggle />
    </div>
  )
}

export default Header
