import React, { Component } from 'react'
import styled from 'styled-components'

import PageContent from '../PageContent'
import { today } from '../../api/posts'
import Card from '../Card/'
import CategorySelector from './CategorySelector'
import Editor from './Editor'

const TitleInputBox = styled.input`
  width: 100%;
  border: none;
  padding: 30px;
  font-size: 28px;
  border-radius: 20px;
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

            <TitleInputBox type="text" placeholder="Write an awesome title!" value={this.state.title === '' ? null : this.state.title} onChange={event => this.onTitleChange(event)} />

						<div className="post_body" style={{marginTop: "20px"}}>

							<Editor />

							<div className="post_tags" style={{marginTop: '30px'}}>
								<ul>
									{ this.state.categories.map(category => <li className="post_tag"><a href="#">{category.text}</a></li>) }
								</ul>
							</div>

						</div>

						<CategorySelector categoryState={async categories => {
							await this.setState({ categories })
							this.props.categoryState(this.state.categories)
						}} />
						
						<div className="post_panel bottom_panel d-flex flex-row align-items-center justify-content-start">
							Thanks for spending you time here. ❤️ from PaprInk Team!
						</div>

          </div>
        </div>


        {/* End of Post Content */}
        
      </PageContent>
    )
  }

}
