export const UPDATE_TEMPLATE = 'duck/UPDATE_TEMPLATE'
export const ADD_TEMPLATE = 'duck/ADD_TEMPLATE'
export const DELETE_TEMPLATE = 'duck/DELETE_TEMPLATE'
export const CHANGE_INDEX = 'duck/CHANGE_INDEX'

const defaultTemplate = {
	title: 'sample title',
	image_url:
		'https://scontent.ftpe7-3.fna.fbcdn.net/v/t1.0-9/17103404_1361159003959079_6638710110679404100_n.jpg?_nc_cat=1&oh=a161427c2271f0697b34fe06e47a0e26&oe=5C5E3DD7',
	subtitle: 'sample subtitle',
	default_action: {
		type: 'web_url',
		url: 'dummy_url',
		messenger_extensions: false,
		webview_height_ratio: 'comppact',
	},
	buttons: [
		{
			type: 'dummy_type',
			url: 'dummy_url',
			title: 'Start Shopping',
		},
		{
			type: 'dummy_type',
			url: 'dummy_url',
			title: 'Call Us',
		},
	],
}

const initialState = {
	currentIndex: 1,
	templates: [1],
	templateDB: {
		1: JSON.parse(JSON.stringify(defaultTemplate)),
	},
}

export default (state = initialState, action) => {
	switch (action.type) {
		case CHANGE_INDEX:
			return {
				...state,
				currentIndex: action.index
			}
		case UPDATE_TEMPLATE:
			return {
				...state,
				templateDB: {
					...state.templateDB,
					[state.currentIndex]: {
						...state.templateDB[state.currentIndex],
						...action.template,
					}
				}
			}
		case ADD_TEMPLATE:
			const nextID = state.templates[state.templates.length -1] + 1
			return {
				...state,
				currentIndex: nextID,
				templates: [...state.templates, nextID],
				templateDB: {
					...state.templateDB,
					[nextID]: JSON.parse(JSON.stringify(defaultTemplate))
				}
			}
		case DELETE_TEMPLATE:
			const index = state.templates.indexOf(state.currentIndex)
			const nextIndex = index > 0  ? index - 1 : index + 1
			if (!state.templateDB[state.templates[nextIndex]]) return state
			const { [state.currentIndex]:_omit , ...newTemplateDB } = state.templateDB
			return {
				...state,
				currentIndex: state.templates[nextIndex],
				templates: state.templates.filter(id => id !== state.currentIndex),
				templateDB: newTemplateDB
			}		
		default:
			return state
	}
}

export const updateTemplate = template => ({
	type: UPDATE_TEMPLATE,
	template,
})

export const addTemplate = () => ({
	type: ADD_TEMPLATE,
})

export const deleteTemplate = () => ({
	type: DELETE_TEMPLATE,
})

export const changeIndex = index => ({
	type: CHANGE_INDEX,
	index
})


