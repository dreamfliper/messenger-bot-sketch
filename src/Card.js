import React, { Component } from 'react'
import EditableSection from './EditableSection'
import defaultBg from './default_bg.png'

export default class Card extends Component {
	state = stateInit(this.props.template)

	onInputChange = name => value =>
		this.setState({ [name]: value || (name !== 'imgUrl' && '*empty*') })

	onButtonInputChange = index => value =>
		this.setState(({ buttons }) => ({
			buttons: {
				...buttons,
				[index]: value || '*empty*',
			},
		}))

	extendButton = () => {
		const btnKeys = Object.keys(this.state.buttons)
		this.onButtonInputChange(
			btnKeys[btnKeys.length - 1] + 1,
		)('sample action')
	}

	deleteButton = index => {
		this.setState(({ buttons }) => {
			const { [index]: _omit, ...newButtons } = buttons
			return { buttons: newButtons }
		})
	}

	updateDB = () => this.props.updateTemplate(stateToTemplate(this.state))

	render() {
		const { title, subtitle, imgUrl, buttons } = this.state
		const { deleteTemplate } = this.props
		return (
			<div>
				<div className="container">
					<section className="no-padding">
						<EditableSection
							img
							display={<img src={imgUrl || defaultBg} alt="sample" />}
							value={imgUrl}
							updateSource={this.onInputChange('imgUrl')}
						/>
					</section>
					<section>
						<div className="words">
							<EditableSection
								display={<h4>{title}</h4>}
								value={title}
								updateSource={this.onInputChange('title')}
							/>
							<EditableSection
								display={<p>{subtitle}</p>}
								value={subtitle}
								updateSource={this.onInputChange('subtitle')}
							/>
						</div>
					</section>
					{Object.entries(buttons).map(([index, text]) => (
						<section key={`${text}_${index}`}>
							<EditableSection
								display={<a>{text}</a>}
								value={text}
								updateSource={this.onButtonInputChange(index)}
							/>
							<button className="delete-btn" onClick={() => this.deleteButton(index)}>
								x
							</button>
						</section>
					))}
					<section className="no-padding">
						<button className="add-action" onClick={this.extendButton}>
							+
						</button>
					</section>
				</div>
				<button className="save" onClick={this.updateDB}>
					Save
				</button>
				<button className="save" onClick={deleteTemplate}>
					Delete
				</button>
			</div>
		)
	}
}

const stateInit = ({ title, subtitle, image_url, buttons }) => ({
	title,
	subtitle,
	imgUrl: image_url,
	buttons: buttons.reduce((acc, { title }, i) => ({ ...acc, [i + '']: title }), {}),
})

const stateToTemplate = ({ title, subtitle, imgUrl, buttons }) => ({
	title,
	subtitle,
	image_url: imgUrl,
	buttons: Object.values(buttons).map(title => ({
		title,
		type: 'dummy_type',
		url: 'dummy_url',
	})),
})
