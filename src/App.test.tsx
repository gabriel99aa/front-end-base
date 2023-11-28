import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './App'

test('Show App Component', () => {
  render(<App />)

  expect(
    screen.getByText('Hello Vite + Redux-Toolkit & RTK Query!'),
  ).toBeInTheDocument()
})

test('Working Counter', async () => {
  const user = userEvent.setup()
  const { getByText } = render(<App />)
  expect(getByText('count is: 0')).toBeInTheDocument()

  const button = getByText('Increment')

  await user.click(button)
  expect(getByText('count is: 1')).toBeInTheDocument()

  await user.click(button)
  expect(getByText('count is: 2')).toBeInTheDocument()

  await user.click(button)
  expect(getByText('count is: 3')).toBeInTheDocument()
})

test('working with msw', async () => {
  const user = userEvent.setup()
  const { getByRole } = render(<App />)
  // move to /doclist page
  const link = getByRole('link')
  await user.click(link)
  // Showing Spinner
  await waitFor(
    () => {
      expect(screen.getByText('Redux Toolkit')).toBeInTheDocument()
      expect(screen.getByText('MSW')).toBeInTheDocument()
      expect(screen.getByText('Tailwind CSS')).toBeInTheDocument()
    },
    { timeout: 4000 },
  )
})
