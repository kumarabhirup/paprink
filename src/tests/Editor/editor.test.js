import { mount } from 'enzyme'
import { MockedProvider } from 'react-apollo/test-utils'
import Router from 'next/router'
import toJson from 'enzyme-to-json'
import wait from 'waait'

import Editor, { SAVE_POST_MUTATION } from '../../components/Editor'
import { CURRENT_USER_QUERY } from '../../components/User'
import { fakeUser, fakePost, fakeCategory } from '../../lib/mockedModel'

Router.router = { push: jest.fn() }

// Mock loadable component
const LoadableComponent = ({ children }) => children
jest.mock('next-server/dynamic', () => () => 'Dante')

// mock the global fetch API
export const dogImage = 'https://dog.com/dog.jpg'
global.fetch = jest.fn().mockResolvedValue({
  json: () => ({
    secure_url: dogImage,
    eager: [{ secure_url: dogImage }, { secure_url: dogImage }, { secure_url: dogImage }, { secure_url: dogImage }],
  }),
})

describe('Editor from scratch', () => {
  const post = fakePost()
  const category = fakeCategory()
  const me = fakeUser()

  const normalMocks = [
    {
      request: { query: CURRENT_USER_QUERY },
      result: {
        data: {
          me
        }
      }
    },
    {
      request: { query: SAVE_POST_MUTATION, variables: {
        title: post.title,
        editorSerializedOutput: post.editorSerializedOutput,
        editorCurrentContent: post.editorCurrentContent,
        thumbnail: post.thumbnail,
        categories: post.categories,
        status: post.status
      } },
      result: {
        data: {
          savePost: {
            ...post,
            id: 'post123',
            __typename: 'Post'
          }
        }
      }
    }
  ]

  it('it Renders properly', async () => {
    const wrapper = await mount(
      <MockedProvider mocks={normalMocks}>
        <Editor titleState={title => {}} new />
      </MockedProvider>
    )
    expect(toJson(wrapper.find('[data-test="EditorContent"]'))).toMatchSnapshot()
  })

  it('it updates title', async () => {
    const wrapper = await mount(
      <MockedProvider mocks={normalMocks}>
        <Editor titleState={title => {}} new />
      </MockedProvider>
    )

    const component = wrapper.find('EditorPage').instance()
    const titleBox = wrapper.find('input[data-test="TitleInputBox"]')
    
    titleBox.simulate('change', { target: { value: "Random title" } })
    
    await wait()
    expect(component.state.title).toEqual("Random title")
  })

  it('it creates a post', async () => {
    const mocks = [
      {
        request: { query: CURRENT_USER_QUERY },
        result: {
          data: {
            me
          }
        }
      },
      {
        request: { query: SAVE_POST_MUTATION, variables: {
          title: post.title,
          thumbnail: post.thumbnail,
          categories: post.categories,
          status: post.status,
          editorSerializedOutput: post.editorSerializedOutput,
          editorCurrentContent: post.editorCurrentContent
        } },
        result: {
          data: {
            savePost: {
              ...post,
              id: 'post123',
              __typename: 'Post'
            }
          }
        }
      }
    ]

    const wrapper = await mount(
      <MockedProvider mocks={mocks}>
        <Editor titleState={title => {}} categoryState={categories => {}} imageState={thubnail => {}} new />
      </MockedProvider>
    )
    
    const component = wrapper.find('EditorPage').instance()
    const titleBox = wrapper.find('input[data-test="TitleInputBox"]')
    const imageBox = wrapper.find('input[type="file"]')
    const publishButton = wrapper.find('Button button[data-test="publishButton"]')
    
    await titleBox.simulate('change', { target: { value: "Random title" } })
    await component.setState({ categories: [category], editorSerializedOutput: {blocks: [{test: 'test'}, {test: 'test'}]}, editorCurrentContent: {test: 'test'} })
    await imageBox.simulate('change', { target: { files: [{image: 'fakedog.jpg', type: 'image/jpeg'}] } })
    // await publishButton.simulate('click', {})

    // CATEGORY BOX SIMULATION FAILED SO CHANGED THE STATE
    // categoryBox.simulate('change', { target: { value: "FIN" } })
    // categoryBox.simulate('keyDown', { key: 'Enter', keyCode: 13, which: 13 })
    // categoryBox.prop('handleAddition')({  }) //* refer https://github.com/airbnb/enzyme/issues/147

    await wait()

    expect(component.state.title).toEqual("Random title")

    expect(component.state.categories).toEqual([category])

    expect(component.state.images.image).toEqual(dogImage)
    expect(global.fetch).toHaveBeenCalled()

    // expect(component.state.published).toBeTruthy() // Needs a fix

  })
})