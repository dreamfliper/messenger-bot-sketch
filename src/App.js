import React, { Component } from 'react'
import EditableText from './EditableText'
import './App.css'
import 'sanitize.css'

class App extends Component {
	state = {
		title: 'sample title',
		description: 'sample description',
		buttons: {
			0: 'Start Shopping',
			1: 'Call Us',
		},
	}

	onInputChange = name => value => this.setState({ [name]: value || '*empty*' })

	onButtonInputChange = index => value =>
		this.setState(({ buttons }) => ({
			buttons: {
				...buttons,
				[index]: value || '*empty*',
			},
		}))

	extendButton = () => this.onButtonInputChange(Object.keys(this.state.buttons).length)('sample action')

	render() {
		const { title, description, buttons } = this.state
		return (
			<div className="App">
				<div className="container">
					<section className="no-padding">
						<img
							src="https://scontent.ftpe7-3.fna.fbcdn.net/v/t1.0-9/17103404_1361159003959079_6638710110679404100_n.jpg?_nc_cat=1&oh=a161427c2271f0697b34fe06e47a0e26&oe=5C5E3DD7"
							alt="sample"
						/>
					</section>
					<section>
						<div className="words">
							<EditableText
								display={<h4>{title}</h4>}
								value={title}
								updateSource={this.onInputChange('title')}
							/>
							<EditableText
								display={<p>{description}</p>}
								value={description}
								updateSource={this.onInputChange('description')}
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
			</div>
		)
	}
}

export default App
