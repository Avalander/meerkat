const snabbdom = require('snabbdom')
const patch = snabbdom.init([
	require('snabbdom/modules/class').default,
	require('snabbdom/modules/props').default,
	require('snabbdom/modules/style').default,
	require('snabbdom/modules/eventlisteners').default,
])

const noArgs = fn => () => fn()

const app = (init, render, root) => {
	let state
	let vdom = root

	const dispatch = (fn, props) => {
		const result = fn(state, props)
		Promise.resolve(result)
			.then(new_state => {
				state = new_state
				const view = render(state, dispatch)
				vdom = patch(vdom, view)
			})
	}
	dispatch(noArgs(init))
}

module.exports = app
