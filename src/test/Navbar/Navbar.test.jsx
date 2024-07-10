import { describe, it, expect } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import Navbar from '../../components/Navbar/Navbar'

describe('Navbar', () => {
  const getUserButton = () => screen.getByRole('button')
  const getMenu = () => screen.queryByRole('menu')
  const openMenu = async () => {
    const userButton = getUserButton()
    await act(async () => {
      userButton.click()
    })
  }

  it('should render without errors and show user button', () => {
    render(<Navbar />)

    const userButton = getUserButton()
    expect(userButton).toBeInTheDocument()
  })

  it('should open the menu and click the user button', async () => {
    render(<Navbar />)

    await openMenu()
    const menu = getMenu()
    expect(menu).toBeInTheDocument()
  })
})
