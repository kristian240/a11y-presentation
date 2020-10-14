const markdown = `
<section>

# A11y - good practices
##### Author: Kristian Djaković

</section>

<section>

## Motivation

Accessibility on the web developer is often a last thought and that needs to be changed

> About **15% of the population** lives with disability.

\`\`\`
15% of the population
  = 0.15 * 7 816 461 760
  = 1 172 469 264
  = 1,17 billion
\`\`\`

</section>

<section>

## Screen reader

### Apple's VoiceOver

VO toggle 👉🏻 <kbd>Command</kbd> + <kbd>F5</kbd>

VO key 👉🏼 <kbd>Control</kbd> + <kbd>Alt</kbd>

Navigation (next/previous) 👉🏽 <kbd>VO key</kbd> + <kbd>Right/Left Arrow</kbd>

Navigation by headings 👉🏾 <kbd>VO key</kbd> + <kbd>Command</kbd> + <kbd>H</kbd>

Help 👉🏿 <kbd>VO key</kbd> + <kbd>H</kbd>

</section>

<section>

## Semantics

### Why to use it?

> 1. **Easier to develop with** — you get some functionality for free plus it is arguably easier to understand.
2. **Better on mobile** — semantic HTML is arguably lighter in file size than non-semantic spaghetti code, and easier to make responsive.
3. **Good for SEO** — search engines give more importance to keywords inside headings, links, etc. than keywords included in non-semantic divs, etc., so your documents will be more findable by customers.

### What do we mean with semantics?

![Div button](/images/div-button.png)

VS.

![Semantic button](/images/button-button.png)

### Semantic elements

* header
* main
* footer
* nav
* aside
* section
* article
* [...](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)

</section>

<section>

## Tab index

### What is tabindex?

> The \`tabindex\` global attribute indicates that its element can be focused,
and where it participates in sequential keyboard navigation (usually with the <kbd>Tab</kbd> key, hence the name).

![Tabindex example](/images/tabindex.png)

</section>

<section>

## Focus ring

### What is focus ring?

> Focus ring is a visible outline (a ring) around the element that is currently in focus.

![No outline](/images/focusring-remove.png)

### :focus-within

> The :focus-within CSS pseudo-class represents an element
that has received focus or contains an element that has received focus.
In other words, it represents an element that is itself matched by the :focus pseudo-class
or has a descendant that is matched by :focus.

*It has no Internet Explorer support* 😬 *but there are polyfills*

### Example

<iframe height="300" style="width: 100%;" scrolling="no" title="BazoNaa" src="https://codepen.io/kristian240/embed/BazoNaa?height=265&theme-id=light&default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/kristian240/pen/BazoNaa'>BazoNaa</a> by kristian
  (<a href='https://codepen.io/kristian240'>@kristian240</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

</section>

<section>

## ARIA properties/roles/states

### What is ARIA?

> Accessible Rich Internet Application

* aria-current (state)
* role (role)
* aria-checked (property)
* aria-label (property)
* ...

The difference between properties and states is that the value of the property is less likley to change
but the value of the states is expected to change. 

### No ARIA is better than bad ARIA

> Functionally, ARIA roles, states, and properties are analogous to a CSS for assistive technologies.
For screen reader users, ARIA controls the rendering of their non-visual experience.
Incorrect ARIA misrepresents visual experiences,
with potentially devastating effects on their corresponding non-visual experiences.

### aria-current VS aria-selected

**aria-current** usually accepts these values:
* page - usually used in navigation
* location - usually used in breadcrumbs
* date/time - usually used in date picker element
* step - usually used in step components
* boolean

**aria-selected** is a boolean only state

----

**Example 1** - Navigation

![Navigation](/images/nav.png)

----

**Example 2** - Date picker

![Datepicker](/images/datepicker.png)

</section>

<section>

## Labels

There are few ways to label an elemenet (usually some user interactive element like text input, button, ...)

* [Using label element](https://codepen.io/kristian240/pen/ZEObMvQ?editors=1000)

</section>

<section>

## Alerts

</section>

<section>

## Headings & landmarks

</section>

<section>

## Dialogs

</section>

<section>

## **Exmple** - toggle button

</section>

<section>

## References

* [A11ycasts with Rob Dodson Youtube series](https://www.youtube.com/playlist?list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)

* [MDN web docs](https://developer.mozilla.org/en-US/)

* [Cool code snippets](https://carbon.now.sh/)

* [Audis.io](https://www.aditus.io/aria/aria-current/)

</section>
`;
