import React from 'react'
import axios from 'axios'

import * as rtl from '@testing-library/react'

import '@testing-library/jest-dom/extend-expect'
import App from './App'

jest.mock('axios', () => {
  return {
    get: jest.fn(() =>
      Promise.resolve({
        data: {
          results: ['foo', 'bar'],
        },
      }),
    ),
  }
})

test('make an api call', async () => {
  const wrapper = rtl.render(<App />)

  await wrapper.findByAltText(/logo/i)

  expect(axios.get).toHaveBeenCalled()
})

test('next button clicked', async () => {
  const wrapper = rtl.render(<App />)
  await wrapper.findAllByAltText(/logo/i)

  const nextPage = wrapper.getByText(/next/i)

  rtl.act(() => {
    rtl.fireEvent.click(nextPage)
  })

  expect(wrapper.findByTestId('name-div')).not.toBeNull()
})

test('previous button clicked', async () => {
  const wrapper = rtl.render(<App />)
  await wrapper.findAllByAltText(/logo/i)

  const nextPage = wrapper.getByText(/previous/i)

  rtl.act(() => {
    rtl.fireEvent.click(nextPage)
  })

  expect(wrapper.findByTestId('name-div')).not.toBeNull()
})

test('logo displaying', () => {
  const wrapper = rtl.render(<App />)

  const logoImg = wrapper.getByAltText(/logo/i)

  expect(logoImg).toBeVisible()
})
