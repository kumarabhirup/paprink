import React, { Component } from 'react'

export default class ImageUploader extends Component {

  state = {
    image: null
  }

  thumbnailUpload = async e => {

    const files = e.target.files

    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'paprink')

    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_USERNAME}/image/upload`, {
      method: 'POST',
      body: data
    }).then(res => (res.json()))
    
    console.log(res)

    this.setState({
      image: res.secure_url,
      smallImage: res.eager[0].secure_url,
      blackOverlayImage: res.eager[1].secure_url,
    })

  }

  render() {
    return (
      <div className="white-box-avision">
        <h3>🖼️ Relevant Thumbnail</h3>
        <div className="bottom_panel d-flex flex-row align-items-center justify-content-start" style={{padding: '15px 0px'}}>
          <a>❌</a>
          &nbsp;&nbsp;&nbsp;
          <input type="file" id="thumbnailUpload" name="thumbnailUpload" style={{width: '100%'}} required onChange={this.thumbnailUpload} />
          &nbsp;&nbsp;&nbsp;
          <a>UPLOADING...</a>
        </div>
      </div>
    )
  }

}
