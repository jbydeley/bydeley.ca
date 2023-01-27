---
title: "Polymer Tweet"
description: ""
date: 2018-04-23T10:13:52-04:00
categories: 
    - "Polymer"
    - "Siren"
    - "Hypermedia"
---

Today we consume our tweets with polymer. If you prefer to checkout the code, I've posted it [here](https://gitlab.com/jbydeley/blog-code/tree/master/polymer-tweet). I'll post what will be returned from the API so we know what we're working with:

## tweets/1
```javascript
const tweet = siren({
    class: ['tweet'],
    properties: {
        text: 'Here is my tweet',
        updatedAt: '10:16 AM - April 23, 2018'
    },
    entities: [{
        class: ['user'],
        rel: 'rels/user',
        href: 'users/1'
    }],
    links: [{
        rel: ['self'],
        href: `tweets/1`
    }],
    actions: []
})
```

## users/1
```javascript
const user = siren({
    class: ['user'],
    properties: {
        username: 'GoHugo.io',
        handle: '@GoHugoIO',
        avatar: '/assets/logo-small.jpg'
    },
    links: [{
        rel: ['self'],
        href: `users/1`
    }],
    actions: []
})
```

As you can see, we've split up the user data from the tweet so that we can cache each individually. We also get references to the user back when we request the tweet. So how do we go about using this in our application? First we create a component that accepts a tweet href.


```html
<dom-module id="polymer-tweet">
  <template>
    ...
      <polymer-tweet-header href="[[ userHref ]]"></polymer-tweet-header>
      <div class="content">
        [[ entity.properties.text ]]
      </div>
      ...
    </div>
  </template>

  <script>
    class PolymerTweet extends Polymer.Element {
        ...
        static get properties() {
            return {
                href: {
                    type: String
                },
                ...
            }
        }
    }
  </script>
</dom-module>
```

I've skipped out on a lot of the juicy bits so make sure to take a look at the repo to see the rest of it but we can summerize by saying that when we want to render a sub-entity, we pass it to a new component that knows how to draw it. In this case, we pass the user href to `polymer-tweet-header` that knows how to take a user entity and display a tweet header.

Some important pieces to remember is that sub-entities can contain different types. You need to make sure to look at the `rel` to find the types you care about. In the case above I did: `entity.entities.find(e => e.rel === 'rels/user')`. I also skipped out on actions for simplicities sake.