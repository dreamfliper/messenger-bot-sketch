import React, { Component } from 'react'
import EditableText from './EditableText'
import './App.css'
import 'sanitize.css'

class App extends Component {
	state = {
		title: 'sample title',
		description: 'sample description',
		isEditTitle: false,
		isEditDescription: false,
	}

	render() {
		const { title, description, isEditTitle, EditDescription } = this.state
		return (
			<div className="App">
				<div className="container">
					<section style={{ padding: 0 }}>
						<img
							src="https://scontent.ftpe7-3.fna.fbcdn.net/v/t1.0-9/17103404_1361159003959079_6638710110679404100_n.jpg?_nc_cat=1&oh=a161427c2271f0697b34fe06e47a0e26&oe=5C5E3DD7"
							alt="sample"
						/>
					</section>
					<section>
						<div className="words">
							<EditableText
								display={<h4>{title}</h4>}
								edit={
									<input
										name="title"
										type="text"
										value={title}
										onChange={({ target }) => this.setState({ [target.name]: target.value })}
										onBlur={() => this.setState({ isEditTitle: false })}
									/>
								}
							/>
							<p name="description">{description}</p>
						</div>
					</section>
					<section>
						<a href="">Start Shopping</a>
					</section>
					<section>
						<a href="">Call Us</a>
					</section>
				</div>
			</div>
		)
	}
}

export default App
