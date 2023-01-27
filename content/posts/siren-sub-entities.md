---
title: "Siren Sub Entities"
description: "Building an API with Siren (sub entities)"
date: 2018-04-19T16:01:53-04:00
categories: 
    - "Siren"
    - "Hypermedia"
    - "Node"
    - "JavaScript"
---

One of the guiding principles of [HATEOAS](https://en.wikipedia.org/wiki/HATEOAS) is that every entity has a single route to access it. If I need to get a specific tweet I will hit the api route `/tweets/1` and that will contain the data about that tweet for as long as that tweet exists. This may sound obvious for anyone who has done REST APIs but it becomes a little less obvious when discussing things like search, sort, and filter. If I go to the search box and type 'hello', the common pattern is to return an array of tweets that contain 'hello'. Unfortunately, that could cause issues with HATEOAS since we would have a second way of getting the same tweets information.

## Sub-entities

In Siren, a search will return a siren entity just like any other siren route. If we were to use [siren-writer](https://github.com/dominicbarnes/node-siren-writer) to display that entity it would like this:

```
const searchEntity = siren({
    class: ['search-entity', 'tweet'],
    properties: {
        count: 3,
        page: 1,
        total: 1
    },
    entities: [{
        class: ['tweet'],
        rel: 'rels/tweet',
        href: 'tweets/0'
    }, {
        class: ['tweet'],
        rel: 'rels/tweet',
        href: 'tweets/3'
    }, {
        class: ['tweet'],
        rel: 'rels/tweet',
        href: 'tweets/10'
    }]
    ...
})
```

As you can see, each sub-entity only contains a link to other entities. To get the details of those entities, we would fetch each one individually. This creates a single point of truth for each entity. Of course, this looks like a lot of calls to the server and I'll be curious to see how it performs in the real world but the implications are that you could could cache everything you see and the more you use the site, the less calls you would have to make to the server. Technically with HTTP/2, we'll only be making one http request and just flooding the pipe. Since each item is cached by a URL, a POST, PUT, or DELETE on the URL would bust the cache and refetch and you could push invalidation events down to the clients using the URL as the key. 

Next post we'll look at how we would consume this with Polymer.