---
title: Using Redux with Classes and Hooks 
date: 2019-10-15
description: The state managment tool that people love to hate
template: post
---

In this article we are going to see the how to use Redux. The state management tool people love to hate.
I personally like it.

##Prerequisites

- Basic knowledge of React.
- Have worked with Hooks.

Source code and demo down below
- [view source](https://github.com/john2220/redux-tutorial) (example with class components is in a different branch named class_example)
- [view demo](https://wizardly-jones-cdf077.netlify.com/)

##Why Redux(Quickly)?

Redux is as state management tool that helps you control and update your applications state more efficiently
Redux itself is a standalone library which means it's framework agnostic. You can use it with any framework but it's usually used with React. 
Why should you use it? Passing props up and down can get nasty if you are dealing with larger applicatons. With Redux all your state lives in a single place, which encourage good React architecture.

##Core Concepts

- **store:**  A central place that our state lives. It's created by calling a function.  
- **reducer:** Serves our state to the store and updates the state based on actions. 
- **actions:** Functions that are being dispatched(called) and tell the reducer what to do. They do that by sending action types.
- **provider** By wrapping our entire app with the Provider API we can access our store from anywhere in our app.

So the basic flow is: 

Actions are being dispatched to the reducer. The reducer listens for the action type within a switch statement. If it doesn't find any match it will return the default(our state). The end result will be passed in a function named createStore to create our store.

Let's start and things will get clearer as we go.

Create your react app and install all of our dependencies.

```
create-react-app redux-tutorial
```
```
npm install redux react-redux
```

##With Classes

We create a components folder with a component called <span class="highlight-in-text">SongList.js</span>.
An actions folders and a reducers folder as well. In the actions folder we will add two additional files. One <span class="highlight-in-text">songActions.js</span> which will handle all our actions and a <span class="highlight-in-text">types.js</span> the we store our actions type names as constants.
In the reducers folder we will add a <span class="highlight-in-text">songReducers.js</span> file that will handle all our reducers and an index file that will bring all our reducers together and combine them in one. In our case we have just one but we could have many.

Our file structure will look something like this.


```
src
  |
  actions
    |_ songActions.js
    |_ types.js
  components
    |_ SongList.js
  reducers
    |_ index.js
    |_ songReducers.js
```

Also add this css in <span class="highlight-in-text">index.css</span>. Just to make things look a bit better.

<div class="filename">index.css</div>

```css
ul {    
	list-style: none;    
	max-width: 400px;    
	margin: 0 auto;    
	background: #ddd;    
	padding: 20px;    
	border-radius: 10px;
}

ul li {    
	padding: 5px;    
	margin-bottom: 10px;    
	background: #fff;    
	display: flex;    
	justify-content: space-between;
}

ul li button {    
	border: 2px solid #ddd;    
	background: #ddd;    
	cursor: pointer;   
	margin-left: 4px;
}

ul > form {    
	margin-top: 50px;
}

ul > form input[type="text"] {    
	height: 24px;    
	padding: 4px;    
	border: none;    
	font-size: .9rem;
}

ul > form input[type="submit"] {   
	padding: 8px;    
	border: none;    
	background: #333;    
	color: #ddd;    
	font-size: .8rem;
}

```


First in our <span class="highlight-in-text">App.js</span> we import our <span class="highlight-in-text">Provider</span> which will wrap our entire app,the <span class="highlight-in-text">createStore</span> function that creates our store and <span class="highlight-in-text">allReducers</span> that is the collection of one or many reducers.

After importing our <span class="highlight-in-text">SongList.js</span> component we store our apps entire state in a store variable.

<div class="filename">App.js</div>

```jsx
import React from 'react'
import './App.css'

// Redux
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import allReducers from './reducers'

// Components
import SongList from './components/SongList'

// Set my store
let store = createStore(allReducers);
```

Then we wrap everything.

```jsx
. . .
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Songs(with the help of Redux)</h1>
        <SongList />
      </div>
    </Provider>
  );
}
. . .
```

In our <span class="highlight-in-text">songReducers.js</span> file we set our initial state and pass it in our reducer function. In the switch statement we are going to listen for an action. If none is provided or called we are going to set it to return the state by default.

<div class="filename">songReducers.js</div>

```jsx
const initialState = {
    songs: [
        {title: 'I love redux'},
        {title: 'The redux song'},
        {title: 'Run to the redux hill'}
    ]
}

export default function(state = initialState, action) {
    switch(action.type) {
        default:
            return state;
    }
}
```

In our <span class="highlight-in-text">reducers/index.js</span> we import all our applications reducers (in our case just one) and pass them to a function named <span class="highlight-in-text">combineReducer</span>. And it does what the name implies. Combines all of our reducers in one and that is what is passed in the <span class="highlight-in-text">createStore</span> function in <span class="highlight-in-text">App.js</span>

<div class="filename">reducers/index.js</div>

```jsx
import { combineReducers } from 'redux';
import songReducers from './songReducers'
         
const allReducers = combineReducers({
    songs: songReducers
});


export default allReducers;
```

Now the fun part. Let's bring and consume our state in the <span class="highlight-in-text">SongList.js</span> component. There are a lot to cover here so bear with me.

We import the <span class="highlight-in-text">connect</span> function that will wrap our <span class="highlight-in-text">SongList.js</span> component. With <span class="highlight-in-text">connect</span> we will actually be able to access our state as props.
<span class="highlight-in-text">connect</span> takes four optional parameters, but in our case we will use the first two.
<span class="highlight-in-text">mapStateToProps</span> and <span class="highlight-in-text">mapDispatchToProps</span>. If we use only one of two the one we don't use should be passed as null.

> **mapStateToProps** provide us with the store. Every time the state changes this function will be called

It takes two parameters. state and ownProps.
With state the function is called when the state changes.
With state and ownProps the function is called both when the state changes and when the current component receives props. In our case we just pass state and set songs with the state.songs that was created by our store.

<div class="filename">SongList.js</div>

```jsx
. . .
const mapStateToProps = (state) => ({
  songs: state.songs
});
. . .
```

> **mapDispatchToProps** will provide us with the actions we need to use in our component so we can dispatch them and change our state.

It may be a function or an object. In our case it will be an object of the actions we imported from the <span class="highlight-in-text">songActions.js</span>.

It will look something like this.

<div class="filename">SongList.js</div>

```jsx
import React from 'react
import { connect } from "react-redux"
import { actionOne, actionTwo } from '../actions/songActions'

. . .

const mapDispatchToProps = {
    actionOne,
    actionTwo,
}

export default connect(mapStateToProps, mapDispatchToProps)(SongList);
```

Or we can destructure.

```jsx
export default connect(mapStateToProps, { actionOne, actionTwo })(SongList);
```

Since we don't have any actions yet we pass null.
Later on we will pass all the actions we need.

```jsx
const mapStateToProps = state => ({
  songs: state.songs
});

export default connect(mapStateToProps, null)(SongList);
```

Now we can access the songs we defined in <span class="highlight-in-text">mapStateToProps</span> as props in our component.
We destructure it in our render function. 

<div class="filename">SongList.js</div>

```jsx
import React from 'react'
import { connect } from "react-redux"

class SongList extends React.Component {

    render() {
        const { songs } = this.props.songs;
        return (
            <ul>
            {songs.map((song, i) => {
                return (
                    <li key={song.title}>
                    {song.title}
                    </li>
                )
            })}
            </ul>
        );
    }
}

const mapStateToProps = state => ({
  songs: state.songs
});

export default connect(mapStateToProps, null)(SongList);
```

Now let's see how can we add new songs, delete songs and update songs as well.

In the code below we add a form. when input changes we call the <span class="highlight-in-text">onChange</span> function, that sets our local state. On the <span class="highlight-in-text">onSubmit</span> function we dispatch an action with our newSong as a parameter.

**Note:** that we start to populate our <span class="highlight-in-text">connect</span> function with the actions we are using.

<div class="filename">SongList.js</div>

```jsx
. . .
import { addSong } from '../actions/songActions'

. . .

constructor(props) {
    super(props);
    this.state = {
      newSong: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.remove = this.remove.bind(this);
  }

    onSubmit(e) {
        e.preventDefault();

        const addedSong = {
            title: this.state.newSong
        }

        this.props.addSong(addedSong);
        this.setState({ newSong: '' });
    }    

    onChange(e) {
       this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { songs } = this.props.songs;
        return (
            <ul>
            {songs.map((song , i) => {
                return (
                    <li key={song.title}>
                    {song.title}
                    </li>
                )
            })}
            <form onSubmit={this.onSubmit}>
                <input type="text" name="newSong" onChange={this.onChange} />
                <input type="submit" value="Add Song" />
            </form>
            </ul>
        );
    }
}

const mapStateToProps = state => ({
  songs: state.songs
});

export default connect(mapStateToProps, { addSong })(SongList);
 ```

In <span class="highlight-in-text">songActions.js</span> we create the <span class="highlight-in-text">addSong</span> function and pass the newSong as payload. Payload is data we pass with the action, second parameter in the switch statement in <span class="highlight-in-text">songReducers.js</span>. We access it as action.payload.

<div class="filename">songActions.js</div>

```jsx
import { ADD_SONG } from './types'

export const addSong = (song) => {
    return {
        type: ADD_SONG,
        payload: song
    }
}
```

**Note:** It is considered best practice to store the action types as constants in a file named <span class="highlight-in-text">types.js</span> in the actions folder.

<div class="filename">types.js</div>

```jsx
export const ADD_SONG = 'ADD_SONG';
```

Do this with every additional action typey you add.

Now the <span class="highlight-in-text">songReducers.js</span> will look like this. The action.payload is the song parameter we passed in our <span class="highlight-in-text">addSong</span> function.

<div class="filename">songReducers.js</div>

```jsx
. . .
export default function(state = initialState, action) {
  switch(action.type) {
    case ADD_SONG:
      return {
        songs: [action.payload, ...state.songs]    
      }
    default:
      return state;
    }
}
. . .
```

To remove a song we follow the same process.

We create a button. When clicking we call the <span class="highlight-in-text">remove</span> function with the index of the song as a parameter. Again we dispatch the <span class="highlight-in-text">removeSong</span> action.

<div class="filename">SongList.js</div>

```jsx
. . .
import { addSong, removeSong } from '../actions/songActions'

. . .

  remove(i) {
        this.props.removeSong(i);
    }

    render() {
        const { songs } = this.props.songs;
        return (
            <ul>
            {songs.map((song , i) => {
                return (
                    <li key={song.title}>
                    {song.title}
                    <button onClick={() => this.remove(i)}>Delete</button>
                    </li>
                )
            })}
            <form onSubmit={this.onSubmit}>
                <input type="text" name="newSong" onChange={this.onChange} />
                <input type="submit" value="Add Song" />
            </form>
            </ul>
        );
    }
}

const mapStateToProps = state => ({
  songs: state.songs
});

export default connect(mapStateToProps, { addSong, removeSong })(SongList);
```

Lastly to update a song we must change a few things. First we will modify our <span class="highlight-in-text">initialState</span> by adding <span class="highlight-in-text">editing: false</span> in each of our song object. This will control which song is being edited.

<div class="filename">songReducers.js</div>

```jsx
. . .
const initialState = {
    songs: [
        {title: 'I love redux', editing: false},
        {title: 'The redux song', editing: false},
        {title: 'Run to the redux hill', editing: false}
    ]
}
. . .
```

In our <span class="highlight-in-text">songList.js</span> component depending if a songs editing state is true or false, we will render a different li.

<div class="filename">SongList.js</div>

```jsx
. . .

render() {
        const { songs } = this.props.songs;
        return (
            <ul>
            {songs.map((song , i) => {
                return (
                    <Fragment key={song.title}>
                    {(!song.editing) ? (
                    <li>
                    {song.title}
                        <span>
                          <button onClick={() => this.remove(i)}>Delete</button>
                          <button onClick={() => this.edit(i, song.title)}>Edit</button>
                        </span>
                    </li>
                        ) : (
                    <li>
                         <form>
                            <input
                            type="text"
                            name="currentVal"
                            value={this.state.currentVal}
                            onChange={this.updatedVal}
                            />
                        </form>
                         <span>
                             <button onClick={() => this.cancel(i)}>Cancel</button>
                             <button onClick={() => this.update(i)}>Update</button>
                        </span>
                    </li>
                        )}
                    </Fragment>
                )
            })}
            <form onSubmit={this.onSubmit}>
                <input
                type="text"
                name="newSong"
                onChange={this.onChange}
                />
                <input type="submit" value="Add Song" />
            </form>
            </ul>
        );
    }

 . . .
 ```

 With our new adjustments the whole thing looks like this.

<div class="filename">SongList.js</div>

```jsx
import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import {
    addSong,
    removeSong,
    editSong,
    updateSong,
    cancelEdit
} from '../actions/songActions'


class SongList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      newSong: '',
      currentVal: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.remove = this.remove.bind(this);
    this.edit = this.edit.bind(this);
    this.update = this.update.bind(this);
    this.cancel = this.cancel.bind(this);
    this.updatedVal = this.updatedVal.bind(this);
  }

    onSubmit(e) {
        e.preventDefault();

        const addedSong = {
            title: this.state.newSong
        }

        this.props.addSong(addedSong);
        this.setState({ newSong: '' });
    }    

    onChange(e) {
    	this.setState({ [e.target.name]: e.target.value });
  	}

    updatedVal(e) {
    	this.setState({ [e.target.name]: e.target.value });
  	}

  	remove(i) {
        this.props.removeSong(i);
    }

    edit(i, title) {
        this.props.editSong(i);
        this.setState({ currentVal: title })
    }

  	update(i) {
        this.props.updateSong(this.state.currentVal, i);
        this.setState({ currentVal: '' })
    }

     cancel(i) {
        this.props.cancelEdit(i);
    }

    render() {
        const { songs } = this.props.songs;
        return (
            <ul>
            {songs.map((song , i) => {
                return (
                    <Fragment key={song.title}>
                    {(!song.editing) ? (
                    <li>
                    {song.title}
                        <span>
                            <button onClick={() => this.remove(i)}>Delete</button>
                            <button onClick={() => this.edit(i, song.title)}>Edit</button>
                        </span>
                    </li>
                        ) : (
                    <li>
                         <form>
                            <input
                            type="text"
                            name="currentVal"
                            value={this.state.currentVal}
                            onChange={this.updatedVal}
                            />
                        </form>
                         <span>
                             <button onClick={() => this.cancel(i)}>Cancel</button>
                             <button onClick={() => this.update(i)}>Update</button>
                        </span>
                    </li>
                        )}
                    </Fragment>
                )
            })}
            <form onSubmit={this.onSubmit}>
                <input
                type="text"
                name="newSong"
                onChange={this.onChange}
                />
                <input type="submit" value="Add Song" />
            </form>
            </ul>
        );
    }
}

const mapStateToProps = state => ({
  songs: state.songs
});

export default connect(mapStateToProps, {
    addSong,
    removeSong,
    editSong,
    updateSong,
    cancelEdit
})(SongList);
```

<div class="filename">songActions.js</div>

```jsx
import {
    ADD_SONG,
    DELETE_SONG,
    EDIT_SONG,
    UPDATE_SONG,
    CANCEL_EDIT
} from './types'

export const addSong = (song) => {
    return {
        type: ADD_SONG,
        payload: song
    }
}

export const removeSong = (index) => {
    return {
        type: DELETE_SONG,
        payload: index
    }
}

export const editSong = (index) => {
    return {
        type: EDIT_SONG,
        payload: index
    }
}

export const updateSong = (title, index) => {
    return {
        type: UPDATE_SONG,
        title,
        index
    }
}

export const cancelEdit = (index) => {
    return {
        type: CANCEL_EDIT,
        index
    }
}
```

<div class="filename">songReducers.js</div>

```jsx
import {
    ADD_SONG,
    DELETE_SONG,
    EDIT_SONG,
    UPDATE_SONG,
    CANCEL_EDIT
} from '../actions/types'

const initialState = {
    songs: [
        {title: 'I love redux', editing: false},
        {title: 'The redux song', editing: false},
        {title: 'Run to the redux hill', editing: false}
    ]
}

export default function(state = initialState, action) {
    switch(action.type) {
        case ADD_SONG:
            return {
                songs: [action.payload, ...state.songs]    
            }
        case DELETE_SONG:
            return {
                songs: state.songs.filter((s, i) => i !== action.payload)
            }
        case EDIT_SONG:
            return {
                songs: state.songs.filter((song, i) => {
                    if(i === action.payload) {
                         song.editing = true
                    } else {
                        song.editing = false
                    }
                    return song
                })
            }
        case UPDATE_SONG:
            return {
                songs: state.songs.filter((song, i) => {
                    if(i === action.index) {
                         song.title = action.title
                        song.editing = false
                    }
                    return song
                })
            }
        case CANCEL_EDIT:
            return {
                songs: state.songs.map((song, i) => {
                    if(i === action.index) {
                        song.editing = false
                    }
                    return song
                })
            }
        default:
            return state;
    }
}
```

##With Hooks

Using Redux with Hooks is way better. It's has fewer boilerplate and I think is easier to work with.
Although it adds a layer of abstraction, if you know the Class way of doing it first, things will stay pretty lean and self-explanatory.

Our <span class="highlight-in-text">songActions.js</span> and <span class="highlight-in-text">songReducers.js</span> will look exactly the same. The only difference is in our <span class="highlight-in-text">SongList.js</span> component.

Instead of <span class="highlight-in-text">connect</span> we are going to use the <span class="highlight-in-text">useSelector</span> hook to access parts of the state directly, and <span class="highlight-in-text">useDispatch</span> to dispatch actions.

<span class="highlight-in-text">useSelector</span> is somewhat equivalent to <span class="highlight-in-text">mapStateToProps</span> and <span class="highlight-in-text">useDispatch</span> is somewhat equivalent to <span class="highlight-in-text">mapDispatchToProps</span>. They have some differences though which you can check the documentation for details.

<div class="filename">SongList.js</div>

```jsx
import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import {
    addSong,
    removeSong,
    editSong,
    updateSong,
    cancelEdit
     } from '../actions/songActions'

const SongList = () => {
    const dispatch = useDispatch()
    const [newSong, setNewSong] = useState();
    const [currentVal, setCurrentVal] = useState();
    const { songs } = useSelector(state => state.songs)

    const addNewSong = (e) => {
        e.preventDefault();

        const addedSong = {
            title: newSong
        }

        if(addedSong.title) {
            dispatch(addSong(addedSong))
            setNewSong('')
        }
    }    

    const remove = (i) => {
        dispatch(removeSong(i))
    }

    const update = (i) => {
        dispatch(updateSong(currentVal, i))
        setCurrentVal('')
    }

    const edit = (i, title) => {
        dispatch(editSong(i))
        setCurrentVal(title)
    }

    const cancel = (i) => {
        dispatch(cancelEdit(i))
    }

    return (
        <ul>
        {songs.map((song , i) => {
            return (
                <Fragment key={song.title}>
                {(!song.editing) ? (
                <li>
                {song.title}
                    <span>
                        <button onClick={() => remove(i)}>Delete</button>
                        <button onClick={() => edit(i, song.title)}>Edit</button>
                    </span>
                </li>
                    ) : (
                <li>
                    <form>
                        <input type="text" value={currentVal} onChange={e => setCurrentVal(e.target.value)} />
                    </form>
                    <span>
                        <button onClick={() => cancel(i)}>Cancel</button>
                        <button onClick={() => update(i)}>Update</button>
                    </span>
                </li>
                    )}
                </Fragment>
            )
        })}
            <form onSubmit={addNewSong}>
                <input type="text" onChange={e => setNewSong(e.target.value)} />
                <input type="submit" value="Add Song" />
            </form>
        </ul>
    )
}

export default SongList
```

##Conclusion

That is pretty much it. Redux can get more complicated but the core concepts are the ones mentioned. 

