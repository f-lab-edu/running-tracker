import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react"

const DefaultLayout: React.FC = () => {
  return (
    <div aria-label="nav bar" className="min-h-screen bg-gray-50">
      <Navbar>
        <NavbarBrand>
          <p className="font-bold text-inherit">러닝 트래커</p>
        </NavbarBrand>
        <NavbarContent className="sm:flex gap-4" justify="center">
          <NavbarItem>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-primary font-medium" : "text-foreground/70"
              }
              end
            >
              일간
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink
              to="/weekly"
              className={({ isActive }) =>
                isActive ? "text-primary font-medium" : "text-foreground/70"
              }
            >
              주간
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink
              to="/calender"
              className={({ isActive }) =>
                isActive ? "text-primary font-medium" : "text-foreground/70"
              }
            >
              월간
            </NavLink>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}

export default DefaultLayout 