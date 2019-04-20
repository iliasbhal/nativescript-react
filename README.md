![NativeScript-React](https://raw.githubusercontent.com/iliasbhal/nativescript-react/master/head-img.png)

[![npm version](https://badge.fury.io/js/nativescript-react.svg)](https://badge.fury.io/js/nativescript-react)
[![Coverage Status](https://coveralls.io/repos/github/iliasbhal/nativescript-react/badge.svg)](https://coveralls.io/github/iliasbhal/nativescript-react)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://github.com/iliasbhal/nativescript-react/blob/master/LICENSE)

# :package: :sparkles: NativeScript-React

Build native application using React and Nativescript. 

## How to Install

```sh
npm i --save nativescript-react
# or
yard add nativescript-react
```

## How to use ?

```js
import React from 'react';
import AppRegistery from 'nativescript-react';
import App from './path/to/app';

AppRegistery.runApplication(<App />);
```

## React + NativeScript = :muscle:

✅ React declarative, composable API, and speed.<br/>
✅ React is skill that is available / the learning curve is very smooth<br/>
✅ There is a ton a very usefull React-packages available<br/>
✅ React is THE thing anyway <br/>

✅ Build 100% native cross-platform apps NativeScript, and the ability to implement platform-specific UIs.<br/>
✅ Share 100% of your code, or use platform-specific APIs, depending on the app you’re building.<br/>
✅ Use standards-based CSS syntax for styling.<br/>
✅ Use rich data binding and existing UI patterns to easily build complex user interfaces.<br/>
✅ Reuse any native library available in Objective-C or Java.<br/>
✅ Get day-0 access to the OS updates, thanks to the native javascript bindings.<br/>
✅ Reuse any JavaScript library that is not browser-dependent.<br/>
✅ Reuse the QA tools for accessibility automation to write tests.<br/>
✅ Use the latest native platform features to create an amazing native user experience.<br/>
✅ Code in any IDE of your choice to implement your applications’ code using the NativeScript framework's CLI.<br/>

NB: Take a look at the NativeScript CTO guide ( the advantages are better explained ): https://www.nativescript.org/ctos-guide 

## Roadmap / Contributing :nerd_face:

NB: Feature requests are very welcome. You just have to create an issue my friend ! 🍻🍻 

- [x] Render NativeScript components througt React.
- [x] Support Mutation, Adding/Removing/Insert Children
- [x] Pipe NativeScript typings and JSDoc to appear on React components and JSX / TSX components.
- [ ] Create a base template `tns create myapp --template <path-to-template>` ( thanks @NickIliev for requesting this feature :) )
- [ ] Add webpack config and/or create a create-react-app flavor.
- [x] Implement props.style & RN Stylesheet API.
- [ ] Implement CSS imports
- [ ] Make Styled-Components, React-Pose work out of the box
- [ ] Implement Animated API ( see react-native-web implementation)
- [ ] Implement the ReactNative components (View, Text, etc) to help people transition to NativeScript
- [ ] Implement DOM interface to get instant compatibility with Styled-Components, React-Router, React-Pose, etc ...
      ( use https://www.npmjs.com/package/nativescript-dom package )
- [ ] `feature requests are welcome`
 
