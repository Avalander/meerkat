import app from 'Meerkat/main'
import h from 'snabbdom/h'


// Init

const init = () => ({
	count: 0,
})


// Actions

const delay = dt => new Promise((resolve) => {
	setTimeout(resolve, dt)
})

const constant = (fn, value) => () => fn(value)

const increment = (state) => ({
	...state,
	count: state.count + 1,
})

const decrement = (state) => ({
	...state,
	count: state.count - 1,
})

const incrementLater = (state) =>
	delay(500)
		.then(constant(increment, state))

const decrementLater = (state) =>
	delay(500)
		.then(constant(decrement, state))


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
				onClick: () => dispatch(incrementLater),
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
				onClick: () => dispatch(decrementLater),
			}),
		]),
	])


// Main

const main = app(init, render, document.querySelector('#app'))