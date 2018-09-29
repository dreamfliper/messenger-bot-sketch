import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from './Card'
import { updateTemplate, addTemplate, deleteTemplate, changeIndex } from './duckModule'
import templateSelector from './templateSelector'
import './App.css'
import 'sanitize.css'

class App extends Component {
	render() {
		const { currentIndex, templateList, addTemplate, changeIndex } = this.props
		return (
			<div className="App">
				<div className="template-menu">
					{templateList.map(id => (
						<button
							key={id}
							onClick={() => changeIndex(id)}
							className={id === currentIndex ? 'active' : ''}>
							{id}
						</button>
					))}
					<button onClick={addTemplate}>+</button>
				</div>
				<Card key={currentIndex} {...this.props} />
			</div>
		)
	}
}

const mapStateToProps = state => ({
	currentIndex: state.duckModule.currentIndex,
	templateList: state.duckModule.templates,
	template: templateSelector(state),
})

export default connect(mapStateToProps, {
	updateTemplate,
	addTemplate,
	deleteTemplate,
	changeIndex,
})(App)
