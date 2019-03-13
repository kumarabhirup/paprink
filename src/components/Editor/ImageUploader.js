import React, { Component } from 'react'

export default class ImageUploader extends Component {
  render() {
    return (
      <div className="white-box-avision">
        <h3>🖼️ Relevant Thumbnail</h3>
        <div className="bottom_panel d-flex flex-row align-items-center justify-content-start" style={{padding: '15px 0px'}}>
          <a>❌</a>
          &nbsp;&nbsp;&nbsp;
          <input type="file" style={{width: '100%'}} />
          &nbsp;&nbsp;&nbsp;
          <a>UPLOADING...</a>
        </div>
      </div>
    )
  }
}
