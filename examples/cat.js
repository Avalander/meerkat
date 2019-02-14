import { app, h } from 'Meerkat/main'


// State

const init = () => ({
	url: null,
	enabled: true,
})


// Actions

const setCatUrl = (state, { url }) => ({
	...state,
	url,
})

const enableButton = (state, { enable }) => ({
	...state,
	enabled: enable,
})

const fetchCat = dispatch => () => {
	dispatch(enableButton, { enable: false })
	return fetch('https://api.thecatapi.com/v1/images/search')
		.then(res => res.json())
		.then(([{ url }]) => url)
		.then(url => dispatch(setCatUrl, { url }))
		.then(() => dispatch(enableButton, { enable: true }))
}


// Render

const render = (state, dispatch) =>
	h('article.column', [
		Picture(state.url),
		Button({
			text: state.url ? 'Another' : 'Gimme a cat!',
			onClick: fetchCat(dispatch),
			enabled: state.enabled
		}),
	])

const Button = ({ text, onClick, enabled }) =>
	h(
		'button',
		{ on: { click: onClick }
		, class: { disabled: !enabled }
		},
		text
	)

const Picture = url => url
	? h('img', { attrs: { src: url }})
	: null


// Main

app(init, render, document.querySelector('#app'))
