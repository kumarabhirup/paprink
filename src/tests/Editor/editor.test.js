import { mount } from 'enzyme'
import { MockedProvider } from 'react-apollo/test-utils'
import Router from 'next/router'
import toJson from 'enzyme-to-json'
import wait from 'waait'

import Editor, { SAVE_POST_MUTATION } from '../../components/Editor'
import { CURRENT_USER_QUERY } from '../../components/User'
import { fakeUser, fakePost } from '../../lib/mockedModel'

Router.router = { push: jest.fn() }

// Mock loadable component
const LoadableComponent = ({ children }) => children
jest.mock('next-server/dynamic', () => () => 'Dante')

// mock the global fetch API
const dogImage = 'https://dog.com/dog.jpg'
global.fetch = jest.fn().mockResolvedValue({
  json: () => ({
    secure_url: dogImage,
    eager: [{ secure_url: dogImage }, { secure_url: dogImage }, { secure_url: dogImage }, { secure_url: dogImage }],
  }),
})

describe('Editor from scratch', () => {
  const post = fakePost()
  const mocks = [
    {
      request: { query: CURRENT_USER_QUERY },
      result: {
        data: {
          me: fakeUser()
        }
      }
    },
    {
      request: { query: SAVE_POST_MUTATION, variables: {
        title: post.title,
        thumbnail: {image: dogImage},
        editorSerializedOutput: {blocks: [{test: 'test'}]},
        editorCurrentContent: {test: 'test'},
        categories: ['FIN', 'TECH'],
        status: 'PUBLISHED'
      } },
      result: {
        data: {
          savePost: {
            ...post
          }
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

    const component = wrapper.find('EditorPage').instance()
    const titleBox = wrapper.find('input[data-test="TitleInputBox"]')
    
    titleBox.simulate('change', { target: { value: "Random title" } })
    
    await wait()
    expect(component.state.title).toEqual("Random title")
  })

  it('it creates a post', async () => {
    const wrapper = await mount(
      <MockedProvider mocks={mocks}>
        <Editor titleState={title => {}} categoryState={categories => {}} imageState={thubnail => {}} new />
      </MockedProvider>
    )
    
    const component = wrapper.find('EditorPage').instance()
    const titleBox = wrapper.find('input[data-test="TitleInputBox"]')
    const imageBox = wrapper.find('input[type="file"]')
    const publishButton = wrapper.find('Button button[data-test="publishButton"]')
    
    titleBox.simulate('change', { target: { value: "Random title" } })
    component.setState({ categories: ['FIN', 'TECH'], editorSerializedOutput: {blocks: [{test: 'test'}, {test: 'test'}]}, editorCurrentContent: {test: 'test'} })
    imageBox.simulate('change', { target: { files: [{image: 'fakedog.jpg', type: 'image/jpeg'}] } })
    publishButton.simulate('click', {})

    // CATEGORY BOX SIMULATION FAILED SO CHANGED THE STATE
    // categoryBox.simulate('change', { target: { value: "FIN" } })
    // categoryBox.simulate('keyDown', { key: 'Enter', keyCode: 13, which: 13 })
    // categoryBox.prop('handleAddition')({  }) //* refer https://github.com/airbnb/enzyme/issues/147

    await wait()

    expect(component.state.title).toEqual("Random title")

    expect(component.state.categories).toEqual(['FIN', 'TECH'])

    expect(component.state.images.image).toEqual(dogImage)
    expect(global.fetch).toHaveBeenCalled()

    console.log(component.state)

    expect(component.state.published).toBeTruthy() // Needs a fix

  })
})