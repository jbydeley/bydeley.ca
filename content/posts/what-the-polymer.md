---
title: "What the Polymer?"
description: ""
date: 2018-05-11T09:08:03-04:00
categories: 
    - "Polymer"
    - "Web Components"
    - "Lit Element"
    - "Lit Html"
---

So I've just finished watching several of the Google IO 2018 talks and I was left a bit stunned. It appears Polymer 3 is somewhat dead on arrival since it'll be released and only ever receive maintenance updates after that. Let's start on what Polymer 3 gives us and discuss `lit-element` in the next post.

## Polymer 3.0
To paraphrase the Polymer blog: "Polymer 3.0 is about moving from HTML Imports to ES Modules and from Bower to npm". Unfortunately HTML Imports were introduced around the same time as ES Modules. ES Modules are those `import` statements we use in JavaScript (and now natively supported in the big four). Although HTML Imports were pretty sweet, they differed from ES Modules so they were ultimately rejected. Google _is_ looking at adding them back but with a focus on pairing nicely with ES Modules but that's for the future.

Let's see how ES Modules work with Polymer 3.

```JavaScript
import {PolymerElement} from '@polymer/polymer/polymer-element.js';

// Define the class for a new element called custom-element
class CustomElement extends PolymerElement {
  constructor() {
    super();
    this.textContent = 'I\'m a custom-element.';
  }
}
// Register the new element with the browser
customElements.define('custom-element', CustomElement);
```

As you can see, we're now just using the `import` statement to pull in the `PolymerElement` base class. Besides that it should like the same as Polymer 2. Polymer CLI has been updated as well to convert the import statement into a direct location for the file you are importing. In this case it would convert `@polymer/polymer/polymer-elements.js` to `/node_modules/polymer/polymer/polymer-elements.js` so that the file is served correctly.

This is great news as it finally opens everything up to all the components we're used to using in the JS world (like webpack!). 

You'll also notice that the import is resolving to `node_modules` instead of `bower_components`. The Polymer team is moving away from Bower and into NPM and that is great! We can install our dependencies with `yarn` or `npm` and have a single `package.json` with all of our dependencies in it.

Stay tuned. The next post will be about the future of Polymer's web component journey. We'll take a closer look at `lit-element`