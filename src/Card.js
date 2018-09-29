import React, { Component } from 'react'
import EditableText from './EditableText'

export default class Card extends Component {
	state = stateInit(this.props.template)

	onInputChange = name => value => this.setState({ [name]: value || '*empty*' })

	onButtonInputChange = index => value =>
		this.setState(({ buttons }) => ({
			buttons: {
				...buttons,
				[index]: value || '*empty*',
			},
		}))

	extendButton = () =>
		this.onButtonInputChange(Object.keys(this.state.buttons).length)('sample action')

	updateDB = () => this.props.updateTemplate(stateToTemplate(this.state))

	render() {
		const { title, subtitle, imgUrl, buttons } = this.state
		const { deleteTemplate } = this.props
		return (
			<div>
				<div className="container">
					<section className="no-padding">
						<img src={imgUrl} alt="sample" />
					</section>
					<section>
						<div className="words">
							<EditableText
								display={<h4>{title}</h4>}
								value={title}
								updateSource={this.onInputChange('title')}
							/>
							<EditableText
								display={<p>{subtitle}</p>}
								value={subtitle}
								updateSource={this.onInputChange('subtitle')}
							/>
						</div>
					</section>
					{Object.values(buttons).map((text, i) => (
						<section key={`${text}_${i}`}>
							<EditableText
								display={<a>{text}</a>}
								value={text}
								updateSource={this.onButtonInputChange(i)}
							/>
						</section>
					))}
					<section className="no-padding">
						<button className="add-action" onClick={this.extendButton}>
							+
						</button>
					</section>
				</div>
				<button className="save" onClick={this.updateDB}>Save</button>
				<button className="save" onClick={deleteTemplate}>Delete</button>
			</div>
		)
	}
}

const stateInit = ({ title, subtitle, image_url, buttons }) => ({
	title,
	subtitle,
	imgUrl: image_url,
	buttons: buttons.reduce((acc, { title }, i) => ({ ...acc, [i]: title }), {}),
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
