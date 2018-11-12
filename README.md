# Features:

## JavaScript:
* The main code revolves around 2 main objects: Hero and Enemy.
* SessionStorage was used to export values from one JS file to another. JSON was then used to stringify and parse the values I wished to store.

# Development:
When starting the project I had only 1 HTML and 1 JS file. In the HTML I would have 2 divs that completely covered the screen - I would use this to give the illussion of the screen changing. Later, I had a bug where animations would continue in the background after "switching screens". The easiest solution for this, I thought, was to split my documents up into seperate pages. this then led to me having to create seperate JS files as errors would be displayed when the browser was on a page that didn't have the DOM elements referenced in the main JS file. At first this caused some headaches but after learning to use JSON 