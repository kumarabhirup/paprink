import casual from 'casual'

const editorSerializedOutput = '{"blocks":[{"key":"duei8","text":"This is Your Editor","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8i1c7","text":"Use it to your advantage.","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7vs85","text":"PaprInk, where writers meet opportunities.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'
const editorCurrentContent = '{"test": "test"}'
const thumbnail = '{"image":"https://res.cloudinary.com/iqubex/image/upload/v1559537917/paprink/fp4kdl4wgxtelfhualpy.jpg","uploading":"done","smallImage":"https://res.cloudinary.com/iqubex/image/upload/c_scale,q_auto,w_730/v1559537917/paprink/fp4kdl4wgxtelfhualpy.jpg","blackOverlayImage":"https://res.cloudinary.com/iqubex/image/upload/b_rgb:000000,c_scale,o_57,q_auto,w_1032,z_1.2/v1559537917/paprink/fp4kdl4wgxtelfhualpy.jpg","smallCardImage":"https://res.cloudinary.com/iqubex/image/upload/c_fill,f_jpg,g_center,h_174,w_263/v1559537917/paprink/fp4kdl4wgxtelfhualpy.jpg"}'
const profilePicture = "https://res.cloudinary.com/iqubex/image/upload/c_crop,g_face,h_700,w_700/v1559462578/paprink/n5qnngxyxmzzhiupsw7l.jpg"
import { dogImage } from '../tests/Editor/editor.test'

// seed it so we get consistent results
casual.seed(777)

const date = new Date()

const fakeCategory = () => ({
  __typename: 'Category',
  id: casual.word,
  text: casual.word,
  category: casual.word.toUpperCase(),
  posts: []
})

const fakeUser = () => ({
  __typename: 'User',
  id: casual.uuid,
  socialId: 'social123',
  fname: casual.first_name,
  lname: casual.last_name,
  username: casual.username,
  name: casual.name,
  phone: casual.phone,
  email: casual.email,
  gender: null,
  birthday: null,
  upvotes: [],
  bio: casual.description,
  // posts: [fakePost()],
  profilePicture,
  followers: [],
  previledge: ['AUTHOR'],
  signUpMethod: 'test',
  accessToken: casual.uuid
})

const fakePost = () => ({
  __typename: 'Post',
  id: casual.uuid,
  author: fakeUser(),
  title: casual.sentence,
  thumbnail: {image: dogImage},
  categories: [fakeCategory()],
  status: "PUBLISHED",
  slug: "this-is-a-title-i-love",
  editorSerializedOutput: {blocks: [{test: 'test'}]},
  editorCurrentContent: {test: 'test'},
  editorHtml: null,
  publishedAt: date.toISOString(),
  upvotes: [],
  upvotesNumber: 0,
  authorId: fakeUser().id,
  refUrl: null
})

// Fake LocalStorage
class LocalStorageMock {
  constructor() {
    this.store = {}
  }

  clear() {
    this.store = {}
  }

  getItem(key) {
    return this.store[key] || null
  }

  setItem(key, value) {
    this.store[key] = value.toString()
  }

  removeItem(key) {
    delete this.store[key]
  }
}

export {
  LocalStorageMock,
  fakeUser,
  fakePost,
  fakeCategory
}