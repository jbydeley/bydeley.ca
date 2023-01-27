---
title: "The New Stack"
description: "Polymer components powered by a Hypermedia API"
date: 2018-03-31T15:09:00-04:00
categories: 
    - "Polymer"
    - "Hypermedia"
    - "Siren"
    - "Web Components"
---

This is going to be a multi-part series about the new stack at D2L. We've decide to move in the direction of Hypermedia API (Siren) powering Polymer web components. Unfortunately, documentation for Siren is pretty sparse. Side note, if anyone knows a good tutorial or guide on getting started, feel free to send it my way. This series is going to start off talking about the benefits of the stack and exploring whether those benefits pan out. Full disclosure, I wasn't involved in the decision to pick this stack and have only a passing knowledge of them. As a personal goal, I've decide to research and write as much documentation around it as I can. If my understanding is incorrect, feel free to let me know so I can correct it.

# Part 1 - Siren
[Siren](https://github.com/kevinswiber/siren) is a way of describing the data that's sent back from your API. It includes far more than a regular rest API which makes it look noisy. The goal is actually quite lofty though. Let's take a look at a sample. 

```
{
  "class": [ "order" ],
  "properties": { 
      "orderNumber": 42, 
      "itemCount": 3,
      "status": "pending"
  },
  "entities": [
    { 
      "class": [ "items", "collection" ], 
      "rel": [ "http://x.io/rels/order-items" ], 
      "href": "http://api.x.io/orders/42/items"
    },
    {
      "class": [ "info", "customer" ],
      "rel": [ "http://x.io/rels/customer" ], 
      "properties": { 
        "customerId": "pj123",
        "name": "Peter Joseph"
      },
      "links": [
        { "rel": [ "self" ], "href": "http://api.x.io/customers/pj123" }
      ]
    }
  ],
  "actions": [
    {
      "name": "add-item",
      "title": "Add Item",
      "method": "POST",
      "href": "http://api.x.io/orders/42/items",
      "type": "application/x-www-form-urlencoded",
      "fields": [
        { "name": "orderNumber", "type": "hidden", "value": "42" },
        { "name": "productCode", "type": "text" },
        { "name": "quantity", "type": "number" }
      ]
    }
  ],
  "links": [
    { "rel": [ "self" ], "href": "http://api.x.io/orders/42" },
    { "rel": [ "previous" ], "href": "http://api.x.io/orders/41" },
    { "rel": [ "next" ], "href": "http://api.x.io/orders/43" }
  ]
}
```

That's a lot so we'll break it down into a few smaller sections. Just understand that the total document looks something like that.

```
"properties": {
    "orderNumber": 42,
    ...
}
```

First we have the class which ends up being the name of the object you are getting back. Next is the actual properties of that object. This is for concrete properties and very simple arrays. 

```
"entities": [
    { 
      "class": [ "items", "collection" ], 
      "rel": [ "http://x.io/rels/order-items" ], 
      "href": "http://api.x.io/orders/42/items"
    },
]
```
Up next we have `entities` which is an array containing all of your related sub entities. If you are looking closely you'll see that we have a collection of items listed but it contains no actual data, just a link to the data. This is where the first piece of the magic comes in. Instead of actually displaying the data, you just link to it and require the client to go to that location and get it. Why the heck would we want to use an API that requires every sub entity and collection to hammer the server with more API calls? [HATEOAS](https://en.wikipedia.org/wiki/HATEOAS). HATEOAS let's us use the browsers cache as our application state. It simplifies the need for state management. If there is only one way to get a piece of data, that way can be cached and every page on your site will use the same URL to get the same data and if you've got it once, you've got it everywhere. 

This single point of entry for each piece of data also means that if you update it via HTTP methods (POST, PUT, PATCH), the browser will naturally uncache that route. Built in cache invalidation for your own commits. You could implement SSE's to send a message to all clients to invalidate a route and be sure that nothing is cached that should be invalidated. You could also implement a service worker that listens for those events and then just calls the route so that the user never has to notice loading a previously loaded route. 

```
"actions": [
    {
      "name": "add-item",
      "title": "Add Item",
      "method": "POST",
      "href": "http://api.x.io/orders/42/items",
      "type": "application/x-www-form-urlencoded",
      "fields": [
        { "name": "orderNumber", "type": "hidden", "value": "42" },
        { "name": "productCode", "type": "text" },
        { "name": "quantity", "type": "number" }
      ]
    }
  ],
```

Let's move on to `actions` which are our next piece of magic. Actions let us tell the client what they can do with the object they just requested. Along with our bearer token, we'll have different actions based on what we have access to. Perhaps a user has access to edit _their_ data but not another users data. An Admin can edit _everyone's_ data. The user will only get the actions they have access to. This will be something we'll cover more of with Polymer in a later chapter.

```
  "links": [
    { "rel": [ "self" ], "href": "http://api.x.io/orders/42" },
    { "rel": [ "previous" ], "href": "http://api.x.io/orders/41" },
    { "rel": [ "next" ], "href": "http://api.x.io/orders/43" }
  ]
```

Links are a way of navigating the data structure. Again, these are based on permissions and actual structure of your data. For collections, it can handle your next and previous paging. If you don't have a next link, you are at the end of the list. You should be able to _navigate_ up from where you are. Say you are looking at a user, if you have permission to look at all users you should have that link returned. Your UI is dictated by the API results.

Well that was long winded. If you are still with me, I'm sorry. The next post will be a bit more meat and we'll make a very small Siren API.