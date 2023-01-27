---
title: "Monkey Patching"
description: ""
date: 2017-12-16T13:20:36-05:00
categories: 
    - "Monkey Patching"
    - "Anti-Pattern"
    - "Legacy"
    - "Refactoring"
---

A rather unfortunate bug occurred at work this week that perplexed a 
few of us. We had a button that, when clicked, opened a dialog. Our 
product is fairly old and so it has gone through several partial 
refactorings. We have new pages (MVC) and legacy pages. We also have client 
side feature flags to turn on / disable certain features. 

| New UI Flag | Legacy | MVC |
| :---------: | :----: | :-: |
| On | Works! | Works! |
| Off | Broken | Works! |

It's strange because on the same page, when the new UI (which is mostly 
just CSS changes) is enabled, things work. When disabled, it doesn't. That's
when we discovered the CSS was different on the page. 

This is what it looked like in 3 out of the 4 cases:
```css
.dialog-0.dialog-open {}
```

This is what the broken pages had:
```css
.dialog-0..dialog-0-open {}
```

After combing through ~80k loc, we discovered that 15 or so years ago, someone
monkey patched the `String.prototype.replace`. `replace` is suppose to replace the
first instance found and not the rest. For example, `'aaa'.replace('a', '.') === '.aa'`.

Not only that, but the Monkey Patching was only included in Legacy pages. It also had 
been updated to have a check that would switch back to normal replace if the new UI 
flag was enabled and that the search text was prefixed with a few unique things (which 
the dialog had). Let's see what it looked like:

```javascript
String.prototype.oldReplace = String.prototype.replace

String.prototype.replace = function(search, replaceWith) {
    if( IsNewUI() && search.startsWith('prefix') ) {
        return this.oldReplace(search, replaceWith)
    }

    return this.split(search).join(replaceWith)
}
```

So how do we go about fixing this? We can't simply search for `.replace`. The codebase is huge 
and spread out across many repos. Even so, how do we know which ones are expecting it to 
behave incorrectly? What if we're using `.replace` to search for profanity or any number of things 
that would be extremely difficult to manually test for but would be less than ideal if caught in 
production?

Telemetry.

Telemetry lets us refactor slowly and safely. We can add a check before our return to see if the 
result is different between the real way and the incorrect way. We can post a log message that 
shows the URL, search, replaceWith and any other information we need to track down how it happened. 
Then we can collect that information and use it to slowly refactor our code until it's no longer 
an issue. Then we can safely remove `.replace` and use the original version.

In the interim we removed the `IsNewUI()` check since it held very little risk. If we 
deemed it more risky, we would have just thrown a feature flag around it. I wrote [a few tests](https://gitlab.com/jbydeley/StringRefactorTests) 
just for kicks.