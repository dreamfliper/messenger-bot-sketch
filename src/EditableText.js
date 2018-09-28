import React, { Component, cloneElement } from 'react'

export default class EditableText extends Component {
	state = { isEdit: false, value: this.props.value }

	handleChange = ({ target }) => this.setState({ value: target.value })

	handleBulr = () =>
		this.setState({ isEdit: false }, () => this.props.updateSource(this.state.value))

	handleKeyPress = ({ key }) => key === 'Enter' && this.handleBulr()

	render() {
		const { display } = this.props
		const { isEdit, value } = this.state
		return (
			<div>
				{isEdit ? (
					<input
						type="text"
						value={value}
						onKeyPress={this.handleKeyPress}
						onChange={this.handleChange}
						onBlur={this.handleBulr}
					/>
				) : (
					cloneElement(display, { onClick: () => this.setState({ isEdit: true }) })
				)}
			</div>
		)
	}
}
