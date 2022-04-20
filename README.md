# Anolet
This is the frontend code for Anolet. It is built using Next.js, React, and material-ui.

## Running the development server
If you want to quickly test some changes, this is the best place to start.\
First, you need to install the dependencies by running `npm i(nstall)` or `yarn`.\

Then, running the dev server is as simple as running `npm run dev`/`yarn dev`.\
Note that the dev server also listens for file changes, so you don't need to worry about restarting after every change.

## Directory structure
The `components` directory will be where you put the components. Things like the sidebar, the header, the footer, etc. will be put here.\
The `pages` directory is pretty self-explanatory. Note that there aren't any things you should touch in `app.js`.\
In the `public` directory, other files can be put here. These are files that can be accessed normally by the end user. For example, if I were to put a file named `test.png` in the folder, the way to access it would be to go to `{address}/test.png`, or reference `/test.png` in code.\

The `styles` directory probably doesn't need to be touched much, but it's just regular CSS styles.