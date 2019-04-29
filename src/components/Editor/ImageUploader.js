import React, { Component } from 'react'
import AbortController from 'abort-controller'
import { resetCaches } from 'graphql-tag';

const controller = new AbortController()
const signal = controller.signal

signal.addEventListener("abort", () => {
  // console.log("Image Upload aborted.")
})

export default class ImageUploader extends Component {

  state = {
    image: this.props.image ? this.props.image : null,
    uploading: this.props.image ? 'done' : null
  }

  inputRef = React.createRef()

  usePreset = async res => {
    if (this.props.uploadPreset === 'paprink') {
      await this.setState({
        image: res.secure_url,
        smallImage: res.eager[0].secure_url,
        blackOverlayImage: res.eager[1].secure_url,
        smallCardImage: res.eager[2].secure_url,
        uploading: 'done'
      })
    } else if (this.props.uploadPreset === 'paprinkProfilePicture') {
      await this.setState({
        image: res.secure_url,
        faceCroppedImage: res.eager[0].secure_url,
        uploading: 'done'
      })
    }
  }

  thumbnailUpload = async e => {

    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', this.props.uploadPreset)

    // console.log(files[0]["type"])

    if(!files[0]) {
      await this.setState({ uploading: null, image: null, blackOverlayImage: null, smallImage: null, smallCardImage: null, faceCroppedImage: null })
    } else if(files[0]["type"] != "image/jpeg" && files[0].type != "image/png" && files[0].type != "image/gif") {
      await this.setState({ uploading: 'error', image: null, blackOverlayImage: null, smallImage: null, smallCardImage: null, faceCroppedImage: null })
    } else {

      await this.setState({ uploading: true })

      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_USERNAME}/image/upload`, {
                    method: 'POST',
                    body: data,
                    // signal [If added signal, res is always catched and then a TypeError is thrown.]
                  })
                  .then(res => (res.json()))
                  .catch(err => {
                    if (err.name === 'AbortError') {
                      console.log('ABORTED.')
                      return 'aborted'
                    } else {
                      console.log(err.name)
                      return false
                    }
                  })

      if(res === 'aborted') {
        await this.setState({
          uploading: false,
          image: null,
          smallImage: null,
          smallCardImage: null,
          blackOverlayImage: null,
          faceCroppedImage: null
        })
      } else if (res) {
        this.usePreset(res)
      } else {
        await this.setState({
          uploading: 'error',
          image: null,
          smallImage: null,
          smallCardImage: null,
          blackOverlayImage: null,
          faceCroppedImage: null
        })
      }

    }
    
    await this.props.imageState(this.state)

  }

  stopThumbnailUpload = async () => {
    controller.abort()
    this.inputRef.current.value = null
    await this.setState({
      uploading: null,
      image: null,
      smallImage: null,
      smallCardImage: null,
      blackOverlayImage: null, 
      faceCroppedImage: null
    })
    return
  }

  render() {
    return (
      <div className="white-box-avision" style={this.props.style}>
        <h3>{this.props.title || "🖼️ Relevant Thumbnail"}</h3>
        <div className="bottom_panel d-flex flex-row align-items-center justify-content-start" style={{padding: '15px 0px'}}>
          {this.state.uploading === true ? (<><a onClick={this.stopThumbnailUpload} style={{cursor: 'pointer'}}>❌</a> &nbsp; &nbsp; <img width="30px" src="https://loading.io/spinners/rolling/lg.curve-bars-loading-indicator.gif" /></>) : this.state.uploading === 'error' ? <a>💩</a> : this.state.uploading === 'done' ? <a>✅</a> : null}
          &nbsp;&nbsp;&nbsp;
          <input type="file" placeholder="Upload the article thumbnail." id="thumbnailUpload" name="thumbnailUpload" style={{width: '100%'}} required onChange={this.thumbnailUpload} ref={this.inputRef} />
          &nbsp;&nbsp;&nbsp;
          {this.state.uploading === true ? <a>UPLOADING...</a> : this.state.uploading === 'error' ? <a style={{color: 'red'}}>Some error occured.</a> : this.state.uploading === 'done' ? <img width="300px" src={this.props.image ? this.state.image : this.state.smallImage} alt="Image uploaded" /> : null}
        </div>
      </div>
    )
  }

}