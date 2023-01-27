---
title: "Composing Web Components"
description: "Composing web components into super components"
date: 2018-04-26T09:31:47-04:00
keywords: 'polymer, web components, composability'
categories: 
    - "Polymer"
    - "Web Components"
    - "Composability"
---

Last week I was attempting to build a searchable dropdown box using Polymer. I knew that composability was important and decided to pull in [iron-input]() and [iron-dropdown]() and started coding the two pieces together. I managed to [coble something together](https://github.com/jbydeley-d2l/selectize-combo) but it was pretty rough and required looking for all sorts of edge cases. I pulled in one of our other Polymer devs and found out about a few more components that we have published.

First up was [d2l-hierarchical-view](https://www.webcomponents.org/element/BrightspaceUI/hierarchical-view) which seemed completely unrelated to a searchable dropdown. That component is used by [d2l-menu](https://www.webcomponents.org/element/BrightspaceUI/menu) which again, seems a bit different from what I was making. That's when I discovered [d2l-dropdown](https://www.webcomponents.org/element/BrightspaceUI/dropdown) which makes use of menu (sometimes) and is very open to extension. Combine that with [d2l-text-input](https://www.webcomponents.org/element/BrightspaceUI/text-input) as the trigger for the dropdown and now we're looking great. 

In the end, we're using the hierarchical-view component  through all those other components and the dropdown menu fires events off to whomever uses the component to decide what to do. If you have the full list of options in the dropdown then you can just filter. If you want to support paging or server side searching, you can do that too.

When we end up publishing it, it'll be in [d2l-dropdown](https://www.webcomponents.org/element/BrightspaceUI/dropdown) and the component will be called `d2l-dropdown-input`. It won't be terribly exciting though. It's 2 lines of template and very few lines of JavaScript. All the work is being done by the other web components. Exciting times we live in.