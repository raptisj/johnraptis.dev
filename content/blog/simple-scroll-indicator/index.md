---
title: Simple Scroll Indicator
date: 2019-07-16T20:39:09.141Z
description: Let the scrolling begin... 
template: post
---

Today we are going to build a simple scroll indicator using CSS and Javascript. For you who don't know, a scroll indicator in the horizontal line on top of our page that fills based on where we are vertically on the page. Each page has different height so evidently we have some math to do. (not really).

###Prerequisites:

- Basic knowledge of HTML, CSS and Javascript.

 ###Goals: 

- We will have an understanding on how to calculate where we are vertically on the page.

Our markup will look something like this.


```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="style.css" />
	<title>Scroll side</title>
</head>
 
<body>
	<nav>
		<div class="load"></div>
	</nav>
    <section>
	    <h2>Post</h2>
	    <p>. . .</p>	
    </section>
</body>
</html>
```

We have a nav element and a div with a class of 'load' inside it. This will serve as our scroll indicator. We also have some content to scroll through. And some styling as well.


```css
body {
	margin: 0;
	font-family: sans-serif;
	background: #f8f8f8;
}

nav {
	height: 50px;
	background: #444444;
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
}

.load {
	background: #ffa500;
	position: absolute;
	left: 0;
	bottom: -3px;
	height: 3px;
	transition: .4s;
}


section {
	max-width: 900px;
	margin: 0 auto;
	padding: 40px 0;
}

section h2 {
	font-size: 2.5rem;
}

section p {
	font-size: .9rem;
	line-height: 1.71;
}
```

Some terms to understand before we go ahead with this. 

####scrollY

> Property of the window interface. Returns the number in pixels that the document is currently scrolled vertically. 
For IE support better use pageYOffset. But come on. Do you want to be that person?

####scrollHeight

> Measures the height of an element including what is not visible on the screen due to overflow.


####clientHeight

> Measures the inner height of an element in pixels. Includes padding if present.

So the formula is 

From the total height of the entire page (<span class="highlight-in-text">scrollHeight</span>) we will subtract the height of our current viewport (<span class="highlight-in-text">clientHeight</span>). Take the current scrollpoint(<span class="highlight-in-text">scrollY</span>) and divide it by the previous sum.

<p style="text-align: center;">scrollY / ( scrollHeight – clientHeight )</p>

This will return a decimal. We will round it and turn it into a percentage.

Now let’s fill up our javascript file.

First we declare our variable that grabs the element from the DOM. Then we pass a function to our window object.
Each time you scroll up or down the function will be triggered.

```javascript
const loadbar = document.querySelector('.load');
 
window.addEventListener('scroll', scrollMe);
 
function scrollMe() {
 
}
```
Since we want to make our calculations all the time, the logic we made before will be placed here

```javascript
const loadbar = document.querySelector('.load');
 
window.addEventListener('scroll', scrollMe);
 
function scrollMe() {
	let scrollTop = window.scrollY;
	let docHeight = document.documentElement.scrollHeight;
	let clientHeight = document.documentElement.clientHeight;
	let scrollPercent = (scrollTop) / (docHeight - clientHeight);
	let scrollPercentRounded = Math.round(scrollPercent * 100);
 
	loadbar.style.width = scrollPercentRounded + 'vw';
}
```

Note that previously we didn’t give a width to our div with a class of load.

We are going to do that here

In the first three lines we are setting our variables.
In the fourth we are doing the actual calculation and in the fifth we are rounding it.
Now <span class="highlight-in-text">scrollPercentRounded</span> will give us a number from 0 to 100 no matter what height we have on our page.
In the last line we will pass <span class="highlight-in-text">scrollPercentRounded</span> as width to our load div in our nav.
That’s it. Now you know how to control elements behavior with scroll. You can get crazy with this and experiment.

<a class="btn-link" href="https://codepen.io/john2220/pen/BbJYpz" target="_blank">View Demo</a>

Here are a couple more examples. One <a href="https://codepen.io/john2220/pen/mopXwJ" target="_black">with linear-gradient</a> and another <a href="https://codepen.io/john2220/pen/ywpveo" target="_blank">with box-shadow</a>