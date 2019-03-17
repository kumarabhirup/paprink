import React, { Component } from 'react'

export default class ImageUploader extends Component {

  state = {
    image: null,
    uploading: null
  }

  thumbnailUpload = async e => {

    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'paprink')

    if(!files[0]) {
      await this.setState({ uploading: null })
    } else {

      await this.setState({ uploading: true })

      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_USERNAME}/image/upload`, {
                    method: 'POST',
                    body: data
                  })
                  .then(res => (res.json()))
                  .catch(err => (false))

      if (res) {
        await this.setState({
          image: res.secure_url,
          smallImage: res.eager[0].secure_url,
          blackOverlayImage: res.eager[1].secure_url,
          uploading: 'done'
        })
      } else {
        await this.setState({
          uploading: 'error'
        })
      }

    }
    
    await this.props.imageState(this.state)

  }

  render() {
    return (
      <div className="white-box-avision">
        <h3>🖼️ Relevant Thumbnail</h3>
        <div className="bottom_panel d-flex flex-row align-items-center justify-content-start" style={{padding: '15px 0px'}}>
          {this.state.uploading === true ? (<><a>❌</a> &nbsp; &nbsp; <img width="30px" src="https://loading.io/spinners/rolling/lg.curve-bars-loading-indicator.gif" /></>) : this.state.uploading === 'error' ? <a>💩</a> : this.state.uploading === 'done' ? <a>✅</a> : null}
          &nbsp;&nbsp;&nbsp;
          <input type="file" placeholder="Upload the article thumbnail." id="thumbnailUpload" name="thumbnailUpload" style={{width: '100%'}} required onChange={this.thumbnailUpload} />
          &nbsp;&nbsp;&nbsp;
          {this.state.uploading === true ? <a>UPLOADING...</a> : this.state.uploading === 'error' ? <a color="red">Some error occured.</a> : this.state.uploading === 'done' ? <img width="300px" src={this.state.smallImage} alt="Image uploaded" /> : null}
        </div>
      </div>
    )
  }

}