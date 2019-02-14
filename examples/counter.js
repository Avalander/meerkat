import { app, h } from 'Meerkat/main'


// Init

const init = () => ({
	count: 0,
})


// Actions

const delay = dt => new Promise((resolve) => {
	setTimeout(resolve, dt)
})

const increment = (state) => ({
	...state,
	count: state.count + 1,
})

const decrement = (state) => ({
	...state,
	count: state.count - 1,
})

const incrementLater = dispatch => () =>
	delay(500)
		.then(() => dispatch(increment))

const decrementLater = dispatch => () =>
	delay(500)
		.then(() => dispatch(decrement))


// Render

const Button = ({ text, onClick }) =>
	h(
		'button',
		{ on: { click: onClick }},
		text
	)

const render = (state, dispatch) => 
	h('article', [
		h('h1', 'Counter'),
		h('h2', state.count),
		h('div', [
			Button({
				text: 'Inc. later',
				onClick: incrementLater(dispatch),
			}),
			Button({
				text: 'Inc.',
				onClick: () => dispatch(increment),
			}),
			Button({
				text: 'Dec.',
				onClick: () => dispatch(decrement),
			}),
			Button({
				text: 'Dec. Later',
				onClick: decrementLater(dispatch),
			}),
		]),
	])


// Main

const main = app(init, render, document.querySelector('#app'))
