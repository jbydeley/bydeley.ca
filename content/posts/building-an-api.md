---
title: "Building an API"
description: ""
date: 2018-04-18T11:01:04-04:00
categories: 
    - "Hypermedia"
    - "Siren"
    - "Express"
    - "Node"
    - "JavaScript"
---

This is going to be a quick post about actions using [siren-writer](https://github.com/dominicbarnes/node-siren-writer). I'm in the process of building a twitter clone powered by Siren and Polymer and on the API front I make heavy use of siren-writer.

When returning an entity from the API we need to make sure that it has all the required information the client side will need to render properly. This includes sub-entity links, actions, etc. 

## Actions

Actions are dependent on your permissions. We'll use a tweet as an example.

Not logged in:
```
const tweet = siren({
    class: ['tweet'],
    properties: {
        text: 'Here is my tweet',
    },
    links: [{
        rel: ['self'],
        href: `tweets/${tweetId}`
    }],
    actions: []
})
```

Logged in as a different user:
```
const tweet = siren({
    ...
    actions: [{
        name: 'like',
        method: 'POST',
        href: `tweets/${tweetId}/like`
    }, {
        name: 'retweet',
        method: 'POST',
        href: `tweets/${tweetId}/retweet`
    }]
})
```

Logged in as the user:
```
const tweet = siren({
    ...
    actions: [{
        name: 'edit',
        method: 'PUT',
        href: `tweets/${tweetId}`
    }, {
        name: 'delete',
        method: 'DELETE',
        href: `tweets/${tweetId}`
    }]
})
```

Logged in as an administrator:
```
const tweet = siren({
    ...
    actions: [{
        name: 'like',
        method: 'POST',
        href: `tweets/${tweetId}/like`
    }, {
        name: 'retweet',
        method: 'POST',
        href: `tweets/${tweetId}/retweet`
    }, {
        name: 'edit',
        method: 'PUT',
        href: `tweets/${tweetId}`
    }, {
        name: 'delete',
        method: 'DELETE',
        href: `tweets/${tweetId}`
    }]
})
```

As you can see, the client side can scan the response object and draw the appropriate buttons / links. This moves the difficulty of permission checks into primitive controls and allows you to make user interfaces that change depending on who is viewing it.

My next post will cover sub-entities and how we should handle them.