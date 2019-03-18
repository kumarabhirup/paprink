import React, { Component } from 'react'
import styled from 'styled-components'
import Router, { withRouter } from 'next/router'
import { Button as BootstrapButton } from 'react-bootstrap'
import isEmpty from 'lodash.isempty'

import PageContent from '../PageContent'
import CategorySelector from './CategorySelector'
import Editor from './Editor'
import ImageUploader from './ImageUploader'

const TitleInputBox = styled.input`
  width: 100%;
  border: none;
  padding: 30px;
  font-size: 28px;
  border-radius: 6px;
  &:focus {
    outline: none;
  }
`

class EditorPage extends Component {

  state = {
    title: 'Write an awesome title!',
    editorContent: {},
		categories: [],
    images: {},
    error: false
  }

  onTitleChange = async event => {
    await this.setState({ title: event.target.value })
		this.props.titleState(this.state.title)
  }

  publish = async () => {
    await this.setState({ error: false })
    if (this.state.title.length === 0 || this.state.categories.length === 0 || isEmpty(this.state.images) || this.state.images.image === null || this.state.editorContent.blocks.length === 1) {
      await this.setState({ error: true })
    } else {
      
    }
  }

  render() {
    return (
      <PageContent noSidebar>

        {/* Post Content */}

				<div className="col-lg-10 offset-lg-1">
					<div className="post_content">

            <TitleInputBox type="text" placeholder="Write an awesome title!" value={this.state.title === '' ? null : this.state.title} onChange={event => this.onTitleChange(event)} maxLength="55" />

            <hr style={{opacity: 0.3}} />

						<div className="post_body" style={{marginTop: "20px", color: "#000000"}}>

							<div className="post_tags" style={{margin: '10px auto'}}>
								<ul>
									{ this.state.categories.map(category => <li className="post_tag"><a href="#">{category.text}</a></li>) }
								</ul>
							</div>

							<Editor editorState={async editorContent => await this.setState({ editorContent })} />

						</div>

						<CategorySelector categoryState={async categories => {
							await this.setState({ categories })
							this.props.categoryState(this.state.categories)
						}} />

						<ImageUploader imageState={async images => {
              await this.setState({ images })
							this.props.imageState(this.state.images)
            }} />
						
						<div className="post_panel bottom_panel d-flex flex-row align-items-center justify-content-end">
              { this.state.error && <p style={{color: "red", fontWeight: "bold"}}>You have to fill all those blanks!</p> }
              &nbsp; &nbsp; &nbsp;
							<BootstrapButton variant="dark" style={{marginRight: "10px", cursor: 'pointer'}}>📝 SAVE AS DRAFT</BootstrapButton>
							<BootstrapButton variant="success" style={{cursor: 'pointer'}} onClick={this.publish}>🎉 PUBLISH</BootstrapButton>
						</div>

						<div className="post_panel bottom_panel d-flex flex-row align-items-center justify-content-center">
							Thanks for spending your time here. ❤️ from PaprInk Team!
						</div>

          </div>
        </div>


        {/* End of Post Content */}
        
      </PageContent>
    )
  }

}

export default withRouter(EditorPage)