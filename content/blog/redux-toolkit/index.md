---
title: Up and running with Redux Toolkit
date: 2019-12-14
description: The better way to write Redux logic
template: post
---

A couple weeks ago I wrote a post about [Using Redux with Classes and Hooks](https://www.johnraptis.dev/using-redux-with-classes-and-hooks/). In this post I will take that same example app I made and rewrite it using Redux Toolkit.

RTK(Redux Toolkit) is a new way to write Redux. It takes away the somewhat annoying parts of Redux, like scattered file structure, store configuration and cumbersome boilerplate.

RTK provides us with some cool functions and utilities that take care a lot of repetitive code for us.

Since this is a brief starter example, I highly recommend taking a look at the official [documentation](https://redux-toolkit.js.org/), which I think is very well written.

Here is the finished [code](https://github.com/john2220/redux-tutorial/tree/redux_toolkit). If you want to see the 'vanilla' version go to the master branch.

Let's start

##Prerequisites

- Have worked with Redux and understand the basics of it.

##Goals

- Convert a 'vanilla Redux' app into a 'RTK' app.

<hr />
<br />

First some brief explanation and then we will jump to the code.

##configureStore

In a typical Redux app we set our store with <span class="highlight-in-text">createStore</span>. That's fine but most times you are copy pasting code which is prone to bugs.<span class="highlight-in-text"> configureStore </span> takes care of that. It also combines our slice reducers and any kind of middleware we might have.
It uses Redux Thunk by default and enables the use of the Redux DevTools.

Since we have some middleware applied by default if we want to apply more than that we have to define all of them explicitly. The default one's will no longer apply. What we can do in this case is to use the <span class="highlight-in-text">getDefaultMiddleware</span> like so.

```jsx

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), our middleware]
})


```

##createAction

In regular Redux we create an action creator that returns an action type we declared somewhere else and a payload.
<span class="highlight-in-text">createAction</span> is a helper function that simplifies the whole process.

Regular Redux

```jsx
import { ADD_SONG } from "./types" // somewhere else

export const addSong = song => {
	return {
		type: ADD_SONG,
		payload: song,
	}
}
```

with createAction

```jsx
export const addSong = createAction("ADD_SONG")
```

##createReduce

In regular Redux the norm is looping our action types in a switch statement and returning the specified function that updates our state. <span class="highlight-in-text">createReducer</span> simplifies the process yet again. It takes two arguments. The first is an initial state and the second is an object with all of our action. It also uses by default the [Immer library](https://github.com/immerjs/immer) that allows us to write immutable code with mutable like syntax.(Seems like you are mutating the state but you are not).

Regular Redux

```jsx
export default function(state = initialState, action) {
	switch (action.type) {
		case ADD_SONG:
			return {
				songs: [action.payload, ...state.songs],
			}
		default:
			return state
	}
}
```

With createReducer

```jsx
export default createReducer(initialState, {
    [addSong]: (state, action) => {
        return {
            songs: [action.payload, ...state.songs]
        };
    },
}
```

##createSlice

If we want to take things to the next level we can use <span class="highlight-in-text">createSlice</span> that somewhat combines <span class="highlight-in-text">createActions</span> and
<span class="highlight-in-text">createReducer</span>. It's basically a function that accepts an initial state, a reducer object(with functions) and a 'slice' name. Actions are being created for us automaftically.

So let do the rewrite and see how do we apply the above.
First we are going to do this with <span class="highlight-in-text">createAction</span> and <span class="highlight-in-text">createReducer</span> and then with <span class="highlight-in-text">createSlice</span>.

We are going to move all of our actions in the <span class="highlight-in-text">songReducers</span> file to keep things tidy. You can play around with the folder structure to find what fits you best.

```jsx
import { createAction } from "@reduxjs/toolkit"

// Actions
export const addSong = createAction("ADD_SONG")

export const removeSong = createAction("DELETE_SONG")

export const editSong = createAction("EDIT_SONG")

export const updateSong = createAction("UPDATE_SONG", function prepare(
	title,
	index
) {
	return {
		payload: {
			title,
			index,
		},
	}
})

export const cancelEdit = createAction("CANCEL_EDIT")
```

Two things to note here.

1. We don't have to import any action types.
2. We don't need to type the payload since is returned implicitly.

You will notice that <span class="highlight-in-text">updateSong</span> has some additional stuff going on.

Many times you will find yourself wanting to pass more than one parameter or add additional logic to your actions. You can do just that with the <span class="highlight-in-text">prepare</span> function. In our case we want to have two parameters. A title and index.

Now lets rewrite our reducer.

We import our <span class="highlight-in-text">createReducer</span>. We pass it our initial state and a object with all of our actions like so. No switch statements. Just the name of our action will do.

```jsx
const initialState = {
	songs: [
		{ title: "I love redux", editing: false },
		{ title: "The redux song", editing: false },
		{ title: "Run to the redux hill", editing: false },
	],
}

// Reducer
export default createReducer(initialState, {
	[addSong]: (state, action) => {
		return {
			songs: [action.payload, ...state.songs],
		}
	},
	[removeSong]: (state, action) => {
		return {
			songs: state.songs.filter((s, i) => i !== action.payload),
		}
	},
	[editSong]: (state, action) => {
		return {
			songs: state.songs.map((song, i) =>
				i === action.payload
					? { ...song, editing: true }
					: { ...song, editing: false }
			),
		}
	},
	[updateSong]: (state, action) => {
		const { index, title } = action.payload
		return {
			songs: state.songs.map((song, i) =>
				i === index ? { ...song, title, editing: false } : song
			),
		}
	},
	[cancelEdit]: (state, action) => {
		return {
			songs: state.songs.map((song, i) =>
				i === action.payload ? { ...song, editing: false } : song
			),
		}
	},
})
```

Now we can do this with <span class="highlight-in-text">createSlice</span> which will make things even more tidy and compact.

<span class="highlight-in-text">createSlice</span> will take an initial state, an object of reducers and a slice name. It will generate the actions automatically with the same name as the reducer.

Again you can play around with the folder structure and the naming conventions.
You can check out the [ducks](https://github.com/erikras/ducks-modular-redux) way for bundling your reducers and actions.
Here I've created a folder named features and a file named <span class="highlight-in-text">songSlice</span>. Don't forget to import it in your <span class="highlight-in-text">index</span> file in the reducer folder.

It will look something like this.

Note that it seems like I'm mutating the state directly, but I'm not.

```jsx
import { createSlice } from "@reduxjs/toolkit"

const songSlice = createSlice({
	name: "songs",
	initialState: {
		songs: [
			{ title: "I love redux", editing: false },
			{ title: "The redux song", editing: false },
			{ title: "Run to the redux hill", editing: false },
		],
	},
	reducers: {
		addSong: (state, action) => {
			return {
				songs: [action.payload, ...state.songs],
			}
		},
		removeSong: (state, action) => {
			return {
				songs: state.songs.filter((s, i) => i !== action.payload),
			}
		},
		editSong: (state, action) => {
			const song = state.songs[action.payload]
			song.editing = true
		},
		updateSong: {
			reducer(state, action) {
				const { title, index } = action.payload
				const song = state.songs[index]
				song.title = title
				song.editing = false
			},
			prepare(title, index) {
				return { payload: { title, index } }
			},
		},
		cancelEdit: (state, action) => {
			const song = state.songs[action.payload]
			song.editing = false
		},
	},
})

export const {
	addSong,
	removeSong,
	editSong,
	updateSong,
	cancelEdit,
} = songSlice.actions

export default songSlice.reducer
```

That's was it. Hope you liked it.

I think RTK is a great step for Redux and I'm curious to see how it's going to evolve in the future.
