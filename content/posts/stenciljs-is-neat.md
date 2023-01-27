---
title: "Stenciljs Is Neat"
description: "Let's make a web component"
date: 2018-04-21T16:01:53-04:00
draft: true
categories: 
    - "TypeScript"
    - "Web Components"
    - "StencilJS"
    - "Ionic"
---

I've decided to take a one post break from Siren / Hypermedia and talk about something unrelated to my work at D2L. I guess it's loosely related since it's still a web component (similar to Polymer) but onwords we go!

## Ionic's StencilJS
So what is StencilJS and why should you care? Well to understand that we first need to understand what a web component is. [Web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) are best described by MDN but if you aren't interested in reading that, the gist of it is that it's a way for you to create native components using the [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM). The Shadow DOM lets you have encapsulation from the parent site. You can have custom styling within a web component and it doesn't _leak_ out to the rest of the page. Imagine you are using a jQuery widget that has styling built in. If your parent page has styling that is more specific, you could end up 