---
title: Publish a React Component to NPM
date: 2020-08-18
description: The simplest Rollup boilerplate.
template: post
thumb: ../../assets/rollup-logo2.png
updated: 2020-08-21
---

In this article I'm going to walk you through the process of creating the simplest boilerplate environment there is, so you can publish your own React components to NPM. We will use [Rollup](https://rollupjs.org/guide/en/) to achieve this.

## What is Rollup(quickly)

Rollup is a module bundler for JavaScript which compiles your code into a single bundle. It can also do more complex and sophisticated things such as creating libraries or applications.

## Source

If you just want the basic Rollup boilerplate source.

- [basic-rollup-boilerplate](https://github.com/raptisj/basic-rollup-boilerplate)

If want to see an example check this repository where I build a highly useless custom Hook for adding and looping a set of emojis in the title of you app.

- [random-title-emoji](https://github.com/raptisj/random-title-emoji)

<hr />

First we create a folder and init a <span class="highlight-in-text">package.json</span> file.

```
mkdir awesome-rollup
cd awesome-rollup
npm init -y
```

Then we have to install a couple of dependencies.

- <span class="highlight-in-text">@babel/code</span>: compiles new JavaScript syntax to older versions for browser compatibility

- <span class="highlight-in-text">@babel/preset-env</span>: presets for configuring babel environment

- <span class="highlight-in-text">@babel/preset-react</span>: tells babel-transpiler we are using react

- <span class="highlight-in-text">react</span>

- <span class="highlight-in-text">rollup</span>

- <span class="highlight-in-text">rollup-plugin-babel</span>: In order to use babel wit Rollup

- <span class="highlight-in-text">rollup-plugin-commonjs</span>: Converts CommonJS modules to ES2015 before Rollup can process them.

- <span class="highlight-in-text">rollup-plugin-node-resolve</span>: finds external modules.

```
npm install @babel/core @babel/preset-env @babel/preset-react react rollup rollup-plugin-babel rollup-plugin-node-resolve rollup-plugin-commonjs --save-dev
```

After installing all of our dependencies we create a <span class="highlight-in-text">rollup.config.js</span> in our root directory.

```javascript
import resolve from "rollup-plugin-node-resolve"
import babel from "rollup-plugin-babel"
import commonjs from "rollup-plugin-commonjs"
import pkg from "./package.json"

export default {
  input: "package/index.js",
  output: {
    file: pkg.main,
    format: "cjs",
  },
  external: ["react"],
  plugins: [
    babel({
      exclude: "node_modules/**",
    }),
    resolve(),
    commonjs(),
  ],
}
```

- **input**: Here we specify the path for our entry point. In our case is <span class="highlight-in-text">package/index.js</span> where everything starts.
- **output**: It's an object that we specify the format of our output and the path we want our bundle to be placed. In our case we import the path from our <span class="highlight-in-text">package.json</span> _main_ field which is specified as <span class="highlight-in-text">dist/index.js</span>. Rollup will create a <span class="highlight-in-text">dist</span> folder and place the bundle inside.
- **external**: It's an array that we can specify any external dependencies that we want to keep as external to the bundle. Here we set <span class="highlight-in-text">react</span> as external.
- **plugins**: An array the we place all of our plugins. Notice that we use the <span class="highlight-in-text">rollup-plugon-babel</span> to exclude <span class="highlight-in-text">node_modules</span> thus avoiding compiling unwanted libraries.

Remember we are aiming for the simplest boilerplate there is. There are a lot of options you can add depending your packages size and complexity. Check the [Rollup official documentation](https://rollupjs.org/guide/en/#configuration-files) for the full list and how to configure them.

Then we have to set some Babel presets. Babel presets are configuration details placed in a <span class="highlight-in-text">.babelrc</span> file where we are setting the environment we want our code to be transpiled to. We want React so our file looks like this.

```
{
   "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

In our <span class="highlight-in-text">package</span> folder with the <span class="highlight-in-text">index.js</span> as our export point we include all of our code.

```javascript
import React from "react"

const NPMComponent = () => {
  return <div>Hello, Rollup</div>
}

export { NPMComponent }
```

**Note**: Exporting in brackets without default, in our application the import will look something like this.

```javascript
import { NPMComponent } from "basic-rollup-boilerplate"
```

You do this if you have a collection of components that you what to use throughout an application.

But if you set the export as default . . .

```javascript
. . .
export default NPMComponent
```

import will look like this

```javascript
import NPMComponent from "basic-rollup-boilerplate"
```

If we choose this way we have to set our exports as <span class="highlight-in-text">auto</span> in our output object.

```javascript
. . .
  output: {
    file: pkg.main,
    format: 'cjs',
    exports: 'auto'
  },
. . .
```

Lastly before testing our package in our <span class="highlight-in-text">package.json</span> we set our build command that will compile and minify our code into a single bundle.

```
. . .
"scripts": {
    "build": "rollup -c"
 },
. . .
```

Now if we run <span class="highlight-in-text">npm run build</span> in our terminal we get the bundle in our <span class="highlight-in-text">dist</span> folder.
Pretty cool uh?

### Test and Publish

We can test our package locally before we publish it to NPM.
By running <span class="highlight-in-text">npm link</span> you create a symlink in your global node_modules folder that links to your package. Then you head to another project and type <span class="highlight-in-text">npm link -package name-</span>.

After checking that all is good we are ready to publish our package.

Make sure that your package name is available in [npmjs.com](http://npmjs.com)

Assuming you already have an account you can <span class="highlight-in-text">npm login</span> to connect to <span class="highlight-in-text">npmjs.com</span>

Then run <span class="highlight-in-text">npm publish</span> and you are of to the races.

If you want to make updates to you packages you can run <span class="highlight-in-text">npm version -type-</span> where type could either be:

- **patch**: small patches (1.0.-_patch_-)
- **minor**: minor releases(1.-_minor_-.0)
- **major**: major releases(-_major_-.0.0)

**Note**: NPM won't let you publish again with the same version.

That was it.

I think this is a good starter setup to get the gist of it all.

Now off you go and make things.
