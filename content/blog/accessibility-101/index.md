---
title: Web Accessibility 101. A Gentle Introduction
date: 2021-09-14
description: An introduction on how to start making your website more accessible
template: post
# thumb: ../../assets/git.png
tags: ["tooling"]
---

A couple of weeks ago I knew close to nothing about accessibility. I had a rudimentary sense of what it means but past that nothing applicable. I'm still miles away from any kind of mastery but here is some cool stuff I learned that will give you an introduction and a way to start making your website more accessible. Being aware of accessibility will make each one of us a more thoughtful developer.

With the web invading every facet of our life, accessibility(also known as **a11y**) becomes even more important to be aware of. Although this is not a new concept, — Web Content Accessibility Guidelines(**WCAG**) were first published way back in 1999 — a lot of people are only now learning about it.

## So what is web accessibility?

> Web accessibility means that people with disabilities can use the Web

<br />

The above statement, simple as it may sound, advocates for a great vision and possible future, where literally _everyone_ will be able to benefit from what the Internet has to offer*.* If you don't suffer from some kind of disability you might take your ability to access the Web for granted. But for a substantial percentage of the population, this is not the case. Some ever-changing statistics further prove this point. It is estimated that around [3.8 million in the US alone have some kind of visual disability](https://www.statista.com/statistics/675655/visual-disability-prevalence-number-us-by-age/) and that is not counting other forms of disabilities. 217 million people worldwide have moderate to severe vision impairment and about 15% of the world’s population has some sort of disability, making accessibility an issue that affects literally millions of people. WebAIM conducted a [study](https://webaim.org/projects/million/) only to find that close to 98% of the top 1 million websites don't offer full accessibility. All the above and more contribute to the widening of the ["digital divide"](https://en.wikipedia.org/wiki/Digital_divide).

The good news is that the web is inherently accessible, giving us all the options and tools we need. The bad news though is that we as developers often lack the knowledge to apply them.

## Making your Code be Heard

People with a visual impairment will most likely use a [screen reader](https://en.wikipedia.org/wiki/Screen_reader) to navigate through the Web. Making our code available to interact with screen readers will make a world of difference, making users able to interact with a website. What screen readers actually do is pick up on the information we provided from the elements in our code.

Besides reading the _main_ content of a webpage, images are too part of the main content. The <span class="highlight-in-text">alt</span> text in an <span class="highlight-in-text">img</span> tag exists to provide some context of what one would see in the image even if they can't actually see it, and that is what screen readers read. If you have puppies, you could provide some descriptive alt text like "Cute little puppies play with each other under a tree in the grass". Saying just 'puppies' is not very helpful since it doesn't give any kind of context. Alternatively, if you want your screen reader to skip the <span class="highlight-in-text">alt</span> text to can just leave it as an empty string.

```jsx
// Screen reader will catch on this
<img src="..." alt="Cute little puppies play with each other under a tree in the grass" />

// Screen reader will skip this
<img src="..." alt="" />
```

Similarly you want to provide a <span class="highlight-in-text">label</span> tag to every <span class="highlight-in-text">input</span> element in a form. Every <span class="highlight-in-text">label</span> tag accepts a <span class="highlight-in-text">for</span> attribute that corresponds to an <span class="highlight-in-text">input</span>'s <span class="highlight-in-text">id</span>. Alternatively you can wrap the <span class="highlight-in-text">label</span> around the <span class="highlight-in-text">input</span> and omit the <span class="highlight-in-text">for</span> and <span class="highlight-in-text">id</span> relationship.

```jsx
<form>
  <label for="name">Name</label>
	<input type="text" id="name" />

	<label for="age">Age</label>
	<input type="number" id="age" />
</form>

// wrapped label
. . .
	<label>
		Name
		<input type="text" />
	</label>
. . .
```

In general, you want anything that is important in your website to be labeled even if the <span class="highlight-in-text">label</span> tag is set to hidden.

## Semantics

A common 'anti-pattern' is using <span class="highlight-in-text">div</span> elements for everything. And I say that in quotes because there are websites out there that use <span class="highlight-in-text">div</span> elements for everything yet the website is very accessible. They went on to do extra effort to mimic the accessibility functionality of other elements. We will see an example later on.

We often take this approach because these types of elements have no styling, where in fact we shouldn't have thought of markup being responsible for styling in the first place. Similar tags that have no accessibility functionality are the <span class="highlight-in-text">header</span>, <span class="highlight-in-text">footer</span>, and <span class="highlight-in-text">aside</span>. The <span class="highlight-in-text">button</span>, <span class="highlight-in-text">input</span>, and <span class="highlight-in-text">textarea</span> do have accessibility functionality out of the box sort of speak.

We might get in the habit — as many design systems and libraries do — to abandon native elements and fix their own from scratch using other elements to make them more customizable or due to design decisions. But what this does is lose some accessibility functionality that is provided from these native elements.

<span class="highlight-in-text">div</span>'s are not focusable so a screen reader can't read them. If you wanted, for whatever reason, to make a <span class="highlight-in-text">div</span> behave just like a <span class="highlight-in-text">button</span> and be detectable as well, then you would use the <span class="highlight-in-text">role</span> property. This will change the semantic meaning of the <span class="highlight-in-text">div</span> element to be of <span class="highlight-in-text">button</span>.

```jsx
<div role="button">I pretend to be a button</div>
```

In order to be selectable, we can add the <span class="highlight-in-text">tabindex</span> property. Adding <span class="highlight-in-text">tabindex</span> makes an element focusable.

```jsx
<div tabindex="0" role="button">
  I pretend to be a button
</div>
```

**Note:** <span class="highlight-in-text">tabindex</span> takes three kinds of values:

- **Negative(-1)** which means it should be focusable but not reachable via keyboard. (You might use JavaScript instead)
- **0** means it is reachable via keyboard depending on its order and where it is placed
- **Positive** means this element will be prioritized, no matter where the element is placed in the DOM. You can think of this, similarly to how z-index works

But we are not done yet. Unlike the <span class="highlight-in-text">button</span> or <span class="highlight-in-text">input</span> elements that can be used alongside the <span class="highlight-in-text">label</span> tag, a <span class="highlight-in-text">div</span> element can't. So here is where <span class="highlight-in-text">aria-label</span> comes to play. By adding it gets a label-like functionality like so.

```jsx
<div aria-label="I want to be a button" tabindex="0" role="button">
  I pretend to be a button
</div>
```

Since this is not really a <span class="highlight-in-text">button</span> you have to define your events to handle the <span class="highlight-in-text">enter</span> and <span class="highlight-in-text">space</span> key to mimic the <span class="highlight-in-text">button</span>'s behavior.

<span class="highlight-in-text">aria-label</span> add's a label to something. The <span class="highlight-in-text">aria-labelledby</span> does exactly the same thing but it can link by id. This is handier if you have a very long description and you don't want your label to be overblown.

```jsx
// short label
<a aria-label="Visit John's Twitter Profile" href="/twitter.com/john">
  My Twitter Profile
</a>
```

```jsx
// long label
<div class="visuallyhidden" id="aria-id">Visit John's Twitter Profile. It is extra good and juicy.</div>
<a
	arialabelledby="aria-id"
	href="/twitter.com/john">
		My Twitter Profile
</a>
```

**Note:** You will probably need to hide the div element so it makes sense to use some kind of generic class for that like <span class="highlight-in-text">visuallyhidden</span>. Anything you don't want to be visible you push it out of the screen.

You can read more on how to use [ARIA on MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques) which has thoroughly detailed documentation.

## Live Regions

Another important accessibility feature is [live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions). What this does is make screen readers read again parts of the page that have been updated. Either it is a notification or someone liked your post, a screen reader must be able to catch this kind of behavior. To do so you can use the <span class="highlight-in-text">aria-live</span>.

```jsx
<div aria-live="assertive">This might take a few minutes . . .</div>

// after a while
<div aria-live="assertive">Form submited successfully</div>
```

When the content inside the <span class="highlight-in-text">div</span> changes, the screen reader will read it again. Passing the value <span class="highlight-in-text">assertive</span> will make the screen reader stop everything it does and read it, while the <span class="highlight-in-text">polite</span> value will wait until the screen reader is finished and then it will read the now changed content.

## Skip Link

When you first visit a webpage often times you have the navigation on top that stays the same throughout the site. If you press the Tab key to navigate the page users might find it tedious to press the tab key 30 times — depending on your navigation items —, to find the main content of each page. The skip link is a technique that is often used to take you to the main content skipping the repetitive stuff. You can do so by appending an <span class="highlight-in-text">a</span> tag that is hidden at the top of your <span class="highlight-in-text">body</span> element that targets the main content through an id. Usually, you will see this being placed at the top left of the screen with the first Tab stroke when you land on the page.

## Tab Trapping

This is a useful way to limit the screens readers reach. For example, if we have some kind of modal with a form we wouldn't want the user to navigate outside the modal in another place in the website.

For further reading: [Designing for Keyboard Accessibility | Accessible Technology](https://www.washington.edu/accessibility/checklist/keyboard/#main_content)

## Visual Considerations

An accessible website is not only for people who can't see. The Internet is not being primarily used by people who have perfect vision or no vision, but instead, there is this huge range where a lot of people have some kind of visual impairment. Some might have a very limited field of vision due to a disability, so it would make sense to have anything that is relative to each other to be close to each other and not scattered across the screen(for instance, having a call to action on the left side of the screen and a possible error or warning on the right corner). That is one case. Some will see a text of color red on a black background blurry and so on.

Some people might be sensitive to motions and animation happening on the screen, like if they have a condition that causes seizures. Many of them will most likely have to configure their system to bypass those kinds of behaviors in their environment. You can detect that with the [<span class="highlight-in-text">prefers-reduced-motion</span>](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) CSS media feature and adjust your code accordingly and have this kind of functionality in the Web as well.

## Final Thoughts and Further Reading

All the above by no means cover everything, but some version of the [Pareto principle](https://en.wikipedia.org/wiki/Pareto_principle) holds true here as well. If you apply 20% (even less) of what is out there accessibility-wise your users will benefit greatly(more than 80%). Remember that a small ripple goes a long away, so go on and help someone today.

[Introduction to Web Accessibility | Web Accessibility Initiative (WAI) | W3C](https://www.w3.org/WAI/fundamentals/accessibility-intro/)

[A11y Coffee](https://a11y.coffee/)

[Microsoft Design](https://www.microsoft.com/design/inclusive/)
