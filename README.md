# styled-webcomponents
styled-components like library for web components

## Example

<!-- prettier-ignore -->
```JS

import { styled, define } from 'styled-webcomponents';

// Create a <Title> component which is
// centered, palevioletred and sized at 1.5em
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

// Create a <Wrapper> component with
// some padding and a papayawhip background
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

// Register the components
define({ tag: "project-title" }, Title);
define({ tag: "project-wrapper"}, Wrapper);
```

```html
<!-- Use them like any other dom element – except they're styled! -->
<project-title>
  <project-wrapper>Hello World, this is my first styled webcomponent!</project-wrapper>
</project-title>
```
