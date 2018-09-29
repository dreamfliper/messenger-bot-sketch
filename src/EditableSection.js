import React, { Component, cloneElement } from 'react'

export default class EditableSection extends Component {
	state = { isEdit: false, value: this.props.value.replace('*empty*', '') }

	handleChange = ({ target }) => this.setState({ value: target.value })

	handleBulr = () =>
		this.setState({ isEdit: false }, () => this.props.updateSource(this.state.value))

	handleKeyPress = ({ key }) => key === 'Enter' && this.handleBulr()

	handlFile = async ({ target }) =>
		this.setState({ isEdit: false, value: await filePromise(target.files[0]) }, () =>
			this.props.updateSource(this.state.value),
		)

	render() {
		const { display, img } = this.props
		const { isEdit, value } = this.state
		return (
			<div>
				{isEdit ? (
					img ? (
						<div
							className="image-bg"
							style={{
								background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${value})`,
							}}>
							<input
								type="text"
								value={value}
								onKeyPress={this.handleKeyPress}
								onChange={this.handleChange}
								onBlur={this.handleBulr}
							/>
							<label className="file-btn">
								<input type="file" accept="image/*" onChange={this.handlFile} />
								Upload File
							</label>
						</div>
					) : (
						<input
							type="text"
							value={value}
							onKeyPress={this.handleKeyPress}
							onChange={this.handleChange}
							onBlur={this.handleBulr}
						/>
					)
				) : (
					cloneElement(display, { onClick: () => this.setState({ isEdit: true }) })
				)}
			</div>
		)
	}
}

const filePromise = file =>
	new Promise((resove, reject) => {
		const reader = new FileReader()
		reader.onload = ({ target }) => resove(target.result)
		reader.onerror = error => reject(error)
		reader.readAsDataURL(file)
	})
