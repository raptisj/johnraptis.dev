---
title: Write better media queries with SASS/SCSS
date: 2019-09-10
description: Leverage the pover of mixins
template: post
thumb: ../../assets/sass-logo.png
tags: ["css"]
---

To be honest I used to not understand containers and breakpoints. I know it seems simple enough but I simply couldn't wrap my head around them. Let alone figuring out a decent workflow. So let's figure out a way, on how to use media queries more efficiently than the traditional way.

##Prerequisites:

- Know the basics of sass/scss.

- Have a sass/scss workflow rolling.

##Using @mixins

When I first learned about media queries I did what everyone was doing. I would have a stylesheet with all my styles and at the bottom of the page, set my media queries. But there is a catch. If you are dealing with a bigger project things can get messy, since you don't have a clear idea where you css is coming from and what overrides what. And often times is something like one property. Lots of needless scrolling.
We can approach our media queries in another fashion, by using scss <span class="highlight-in-text">@mixin</span>'s.

First we are going to set our breakpoints.

```
$lg: 1200px;   // 1200px and up
$md: 900px;    // 900px and up
$sm: 600px;    // 600px and up
```

Then we are going to store the media query functionality in a <span class="highlight-in-text">@mixin</span>.

```scss
@mixin small_breakpoint {
  @media (min-width: $sm) {
    @content;
  }
}

@mixin medium_breakpoint {
  @media (min-width: $md) {
    @content;
  }
}
```

After setting a <span class="highlight-in-text">@mixin</span> with a descriptive name we pass the breakpoint variable as our min-width. <span class="highlight-in-text">@content</span> is where our classes will live.

In our scss file we will have something like this.

```scss
.className {
          font-size: 16px;
       ....
     @include small_breakpoint {
              font-size: 20px;
       ....
    }
}
```

Since we are thinking mobile first, our className starts with <span class="highlight-in-text">font-size 16px</span>. (0px till the value of our <span class="highlight-in-text">$sm</span> variable). The <span class="highlight-in-text">small_breakpoint</span> takes place from our <span class="highlight-in-text">$sm</span> value(600px) till the \$md value.

I think this is a much better way to organize our scss.

##Multiple Breakpoints

If you are dealing with many breakpoints, where you might want certain parts to change in different breakpoints, the following might be a good use case.

```scss
@mixin breakpoint($point) {
  @if ($point == lg) {
    @media (min-width: $lg) {
      @content;
    }
  } @else if ($point == md) {
    @media (min-width: $md) {
      @content;
    }
  } @else if ($point == sm) {
    @media (min-width: $sm) {
      @content;
    }
  }
}
```

We create a mixin with the name of breakpoint which takes a parameter. The if statement checks that parameter and returns the corresponding media query.
The argument will be a name that we pass in our scss like so:

```scss
.className {
    ...
    @include breakpoint(md) {
       ....
    }
    ...
}
```

This way you have more control if you are dealing with many breakpoints.

One use case I found useful is if I have let's say only one part in a page that I want to apply a different breakpoint, I can do the following.

```html
<div class="container">
  <div class="content">
    . . .
  </div>
  <div class="gallery">
    . . .
  </div>
</div>
```

Declare the specified breakpoint.

```scss
@mixin breakpoint($point) {

        . . .
    @else if ($point == gallery) {
        @media (min-width: 680px) {
            @content
        }
    }
        . . .

}
```

Apply it in your scss.

```scss
.gallery {
    ...
    @include breakpoint(gallery) {
       ....
    }
    ...
}
```

When I learned about this I was stoked. My stylesheets became much more cleaner and organized.  
Hope this post was useful.
