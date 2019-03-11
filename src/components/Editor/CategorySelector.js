import React, { Component } from 'react'
import Head from 'next/head'
import { WithContext as ReactTags } from 'react-tag-input'
 
const KeyCodes = {
  comma: 188,
  enter: 13,
}
 
const delimiters = [KeyCodes.comma, KeyCodes.enter];
 
class CategorySelector extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tags: [
              { id: "Thailand", text: "Thailand" },
              { id: "India", text: "India" }
            ],
            suggestions: [
                { id: 'USA', text: 'USA' },
                { id: 'Germany', text: 'Germany' },
                { id: 'Austria', text: 'Austria' },
                { id: 'Costa Rica', text: 'Costa Rica' },
                { id: 'Sri Lanka', text: 'Sri Lanka' },
                { id: 'Thailand', text: 'Thailand' }
             ]
        }
        this.handleDelete = this.handleDelete.bind(this)
        this.handleAddition = this.handleAddition.bind(this)
        this.handleDrag = this.handleDrag.bind(this)
    }
 
    handleDelete(i) {
        const { tags } = this.state;
        this.setState({
         tags: tags.filter((tag, index) => index !== i),
        })
    }
 
    handleAddition(tag) {
        this.setState(state => ({ tags: [...state.tags, tag] }))
    }
 
    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags]
        const newTags = tags.slice()
 
        newTags.splice(currPos, 1)
        newTags.splice(newPos, 0, tag)
 
        // re-render
        this.setState({ tags: newTags })
    }
 
    render() {
        const { tags, suggestions } = this.state
        return (
            <>
            <Head>
              <link rel="stylesheet" type="text/css" href="/static/styles/CategorySelector.css" />
            </Head>
            <div class="white-box-avision">
                <h3>Category</h3>
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
                    placeholder="Categories (max 3)"
                />
            </div>
            </>
        )
    }
}

export default CategorySelector