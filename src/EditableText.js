import React, { Component } from 'react'

export default class EditableText extends Component {
	state = { isEdit: false }

	render() {
    const { display, edit } = this.props
		const { isEdit } = this.state
		return (
			<div onClick={() => this.setState({ isEdit: true })}>
				{isEdit ? edit : display}
			</div>
		)
	}
}
