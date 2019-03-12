import React, { Component } from 'react'
import Head from 'next/head'
import { WithContext as ReactTags } from 'react-tag-input'
import { categorySuggessions } from '../../api/mini'
 
const KeyCodes = {
  comma: 188,
  enter: 13,
}
 
const delimiters = [KeyCodes.comma, KeyCodes.enter]
 
class CategorySelector extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tags: [
            //   { id: "", text: "" }
            ],
            suggestions: [...categorySuggessions]
        }
        this.handleDelete = this.handleDelete.bind(this)
        this.handleAddition = this.handleAddition.bind(this)
        this.handleDrag = this.handleDrag.bind(this)
    }
 
    async handleDelete(i) {

        const { tags } = this.state;
        if(tags.length <= 3) {
          await this.setState({ error: null })
        }
        await this.setState({
         tags: tags.filter((tag, index) => index !== i),
        })

    }
 
    async handleAddition(tag) {

        if (this.state.tags.includes(tag)) { // This if statement seems to not work.
            await this.setState({ error: '💢 Category already in use 💢' })
        } else if (this.state.tags.length <= 2) { // This technically should be comparing to 3 but dont know why 2 just works!
            await this.setState(state => ({ tags: [...state.tags, tag] }))
        } else {
            await this.setState({ error: '💢 Please use only 3 tags 💢' })
        }

    }
 
    async handleDrag(tag, currPos, newPos) {

        const tags = [...this.state.tags]
        const newTags = tags.slice()
 
        newTags.splice(currPos, 1)
        newTags.splice(newPos, 0, tag)
 
        // re-render
        await this.setState({ tags: newTags })

    }
 
    render() {
        const { tags, suggestions } = this.state
        return (
            <>
            <Head>
              <link rel="stylesheet" type="text/css" href="/static/styles/CategorySelector.css" />
            </Head>
            <div class="white-box-avision">
                <h3 style={{marginLeft: "3px"}}>Category</h3>
                <ReactTags 
                    tags={tags}
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    delimiters={delimiters}
                    maxLength={24}
                    minQueryLength={2}
                    allowDragDrop={false}
                    placeholder={this.state.error || "Categories (max 3)"}
                    allowDeleteFromEmptyInput={false}
                />
            </div>
            </>
        )
    }
}

export default CategorySelector