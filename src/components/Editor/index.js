import React, { Component } from 'react'
import styled from 'styled-components'
import { Button as BootstrapButton } from 'react-bootstrap'

import PageContent from '../PageContent'
import CategorySelector from './CategorySelector'
import Editor from './Editor'

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

export default class EditorPage extends Component {

  state = {
    title: 'Write an awesome title!',
		categories: []
  }

  onTitleChange = async event => {
    await this.setState({ title: event.target.value })
		this.props.titleState(this.state.title)
  }

  render() {
    return (
      <PageContent noSidebar>

        {/* Post Content */}

				<div className="col-lg-10 offset-lg-1">
					<div className="post_content">

            <TitleInputBox type="text" placeholder="Write an awesome title!" value={this.state.title === '' ? null : this.state.title} onChange={event => this.onTitleChange(event)} maxLength="55" />

						{/* <div className="post_body" style={{marginTop: "20px"}}> */}

							<div className="post_tags" style={{margin: '30px auto'}}>
								<ul>
									{ this.state.categories.map(category => <li className="post_tag"><a href="#">{category.text}</a></li>) }
								</ul>
							</div>

							<Editor />

						{/* </div> */}

						<CategorySelector categoryState={async categories => {
							await this.setState({ categories })
							this.props.categoryState(this.state.categories)
						}} />
						
						<div className="post_panel bottom_panel d-flex flex-row align-items-center justify-content-end">
							<BootstrapButton variant="dark" style={{marginRight: "10px", cursor: 'pointer'}}>📝 SAVE AS DRAFT</BootstrapButton>
							<BootstrapButton variant="success" style={{cursor: 'pointer'}}>🎉 PUBLISH</BootstrapButton>
						</div>

						<div className="post_panel bottom_panel d-flex flex-row align-items-center justify-content-center">
							Thanks for spending you time here. ❤️ from PaprInk Team!
						</div>

          </div>
        </div>


        {/* End of Post Content */}
        
      </PageContent>
    )
  }

}
