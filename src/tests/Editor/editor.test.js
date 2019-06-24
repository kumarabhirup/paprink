import { mount } from 'enzyme'
import { MockedProvider } from 'react-apollo/test-utils'
import Router from 'next/router'

import Editor from '../../components/Editor'
import { CURRENT_USER_QUERY } from '../../components/User'
import { fakeUser, fakePost } from '../../lib/mockedModel'

Router.router = { push: jest.fn() }

describe('Editor from scratch', () => {
  const mocks = [
    {
      request: { query: CURRENT_USER_QUERY },
      result: {
        data: {
          me: fakeUser()
        }
      }
    }
  ]

  const wrapper = mount(
    <MockedProvider mocks={mocks}>
      <Editor new />
    </MockedProvider>
  )

  it('Renders properly', () => {
    expect(wrapper.debug()).toMatchSnapshot()
  })
})