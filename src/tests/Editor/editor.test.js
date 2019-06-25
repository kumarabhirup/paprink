import { mount } from 'enzyme'
import { MockedProvider } from 'react-apollo/test-utils'
import Router from 'next/router'
import toJson from 'enzyme-to-json'
import wait from 'waait'

import Editor from '../../components/Editor'
import { CURRENT_USER_QUERY } from '../../components/User'
import { fakeUser, fakePost } from '../../lib/mockedModel'

Router.router = { push: jest.fn() }

// Mock loadable component
const LoadableComponent = ({ children }) => children
jest.mock('next-server/dynamic', () => () => 'Dante')

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

  it('it Renders properly', async () => {
    const wrapper = await mount(
      <MockedProvider mocks={mocks}>
        <Editor titleState={title => {}} new />
      </MockedProvider>
    )
    expect(toJson(wrapper.find('[data-test="EditorContent"]'))).toMatchSnapshot()
  })

  it('it updates title', async () => {
    const wrapper = await mount(
      <MockedProvider mocks={mocks}>
        <Editor titleState={title => {}} new />
      </MockedProvider>
    )
    const titleBox = wrapper.find('input[data-test="TitleInputBox"]')
    const component = wrapper.find('EditorPage').instance()
    // console.log(wrapper.find('input[data-test="TitleInputBox"]').debug())
    titleBox.simulate('change', { target: { value: "Random title" } })
    // wrapper.update()
    await wait()
    expect(component.state.title).toEqual("Random title")
  })
})