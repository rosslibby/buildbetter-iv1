# We're Building BuildBetter!

## About this Project:

This is a small, isolated example of the kind of frontend work we do on a daily basis here at BuildBetter. You'll be working through this project with an engineer from BuildBetter.

### Step 1

To start, get the environment running:

```
yarn install && yarn dev
```

### Step 2

We've got some mocks of what we're working on today over in [this Figma document](https://www.figma.com/file/qGzvjaIyVmrlpovOvxW9Uc/Frontend-Moments-Interview?node-id=0%3A1).

### Step 3

Familiarize yourself with the repo:

- [components](./src/components/) - Contains some pre-built components you can use
- [MomentCard](./src/moments/components/MomentCard.tsx) - The component you'll be working on
- [App](./src/App.tsx) - The main component where you'll be rendering MomentCards from
- [GlobalStyles](./src/GlobalStyles.tsx) - Has all the color tokens you might want to use while building this. They map directly to the ones in Figma.

Some things to note:

- The Figma doc has a color palette set up, so you can use that if you're inclined to define css vars once or something like that.
- The Icons included are just react components, and they'll inherit their color and font-size from the css hierarchy, so you don't need to mess with svg stuff.
- The card text should be editable, but it doesn't need to be persisted (see extra credit below)
- The data model maps relatively directly to the layout. A "Moment" in our lingo is a captured timestamp with some optional notes, as well as a type descriptor.

### Step 4

Here are the development stages we'll be going through for this project:

1. Following the Figma designs, implement the basic card layout and styles as closely as you're able.
2. Implement stateful styling--the card itself, the play button, and the icon buttons in the footer of the card should all be focusable via keyboard tabbing (ie. they should have a tab index and relevant styling for focus states), and should have hover + focus states where specified by the designs.
3. Implement a multi-card layout using the alternate moments in the moments/data directory, and ensure that different moment types (with their respective highlight colors) work as expected.
