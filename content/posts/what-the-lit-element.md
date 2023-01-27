---
title: "What the Lit-Element"
description: "Let's build a netflix (ui) clone with Lit-Element"
date: 2018-06-01T13:37:14-04:00
categories: 
    - "Polymer"
    - "Lit-Element"
    - "Lit-Html"
    - "Web Components"
    - "Progressive Web App"
    - "PWA"
---

## Overview

[Lit-Element](https://github.com/Polymer/lit-element) is the next step in the Polymer journey. Gone are the days of 2 way data binding. The library size has gone down too. Everything seems to have been built around [lit-html](https://github.com/Polymer/lit-html). 

This post will be a bit of guide around using `Lit-Element` and we'll be making a clone of the Netflix UI. Unfortunately, Lit-Element hasn't hit a production ready release and the tools for starting a project are a bit lacking. We'll be starting with the [PWA Starter Kit](https://github.com/Polymer/pwa-starter-kit) which has far more than we need in it but the build / server system is setup and a lot of the boilerplate has already been added. 

After you've cloned the [PWA Starter Kit](https://github.com/Polymer/pwa-starter-kit), we'll add a new component for our avatar.

```javascript
// profile-avatar.js
import { LitElement, html } from '@polymer/lit-element';

class ProfileAvatar extends LitElement {
    _render(props) {
        return html`
        <style>
            :host {
                display: inline-block;
                overflow: hidden;
                 font-size: 24px;
                
                --profile-avatar-border: .3em solid rgba(0, 0, 0, .4);
                --profile-avatar-border-hover: .3em solid #e5e5e5;
            }
            a {
                display: flex;
                flex-direction: column;
                align-items: center;
                text-decoration: none;
                color: grey;
            }

            a:hover {
                color: #fff;
            }

            a:hover img {
                border: var(--profile-avatar-border-hover);
            }
            
            img {
                max-height: 192px;
                border: var(--profile-avatar-border);
                flex-basis: 192px;
            }
            
            span {
                margin: .8em 0;
            }

        </style>
        <a href="${props.href}">
            <img src="${props.image}" alt="${props.text}" />
            <span>${props.text}</span>
        </a>
        `
    }

    static get properties() {
        return {
            image: String,
            text: String,
            href: String
        }
    }
}

window.customElements.define('profile-avatar', ProfileAvatar);
```

## Who's watching?

With that we have a way of creating a profile with an image and text. We'll use this to create our "Who's Watching?" page. Since this is all web componenty, our CSS is scoped and the element is nicely reusable. Let's move on and create our 'Who's watching?" page.

```javascript
// choose-profile.js
import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';
import './profile-avatar';

class ChooseProfile extends PageViewElement {
  _render(props) {
    return html`
      <style>
        :host {
          color: #fff;
        }
        section {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
        }

        profile-avatar {
          padding: 0 25px 0;
          flex-shrink: 1;
          align-self: center;
        }

        .page {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding-top: 20vh;
        }

        h1 {
          font-size: 3.5vw;
        }
      </style>

      <div class="page">
        <h1>Who's watching?</h1>

        <section>

          <profile-avatar
            text="Ryan"
            image="images/avatar1.png"
            href="browse">
          </profile-avatar>
            
          <profile-avatar
            text="Jared"
            image="images/avatar2.png"
            href="browse">
            </profile-avatar>

            
          <profile-avatar
            text="Tiffany"
            image="images/avatar3.png"
            href="browse">
            </profile-avatar>

            
          <profile-avatar
            text="Mike"
            image="images/avatar6.png"
            href="browse">
          </profile-avatar>
        </section>
      </div>
    `;
  }
}

window.customElements.define('choose-profile', ChooseProfile);
```

## Closing Thoughts
And with that we have the entire choose your profile page completed. While building this out I've found that `lit-element` is a double edged sword. The file size is small (2.9kb) but with that size comes very little in terms of functionality. Writing individual components has been a breeze but wiring them up into the router and redux has additional complexity because it isn't really done for you. 

The lack of basic tools or documentation is a product of the fact that it's so new and isn't finished development yet. Something I hope they remedy quickly since that really slows every aspect of development down. 