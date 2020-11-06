# @xaro/button

Button that invokes callback functions on click.
This package does not create nodes, it only hangs handlers on existing elements

## Install

```bash
$ npm install @xaro/button
```

## Warning

To import TypeScript from node_modules folder you need to set allowTsInNodeModules option to true in your webpack.config.js.

```js
module.exports = {
	// ...
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				options: {
					allowTsInNodeModules: true
				}
			},
			// ...
		]
	},
	//...
};
```
How to do it for other bundlers, see their documentation.

## Usage

*file.html*
```html
<button class="button">Button-1</button>
```
*file.ts*
```ts
import Button, { I_Button } from '@xaro/button';

const button = new Button({
	el: document.querySelector('.button') as HTMLElement,
	on: {
		click(button: I_Button) {
			button.lock();
			
			console.log('click');

			setTimeout(() => {
				button.unlock();
			}, 3000);
		}
	}
})
```
> Now, if we click on a button in the document, the "click" callback will be called.
The button is locked for 3 seconds and becomes available to the user again.
The library uses "@xaro/event-emitter", its documentation is on the library page. The "emitter" can be accessed through the button.emitter property.

@xaro/event-emitter - [npmjs](https://www.npmjs.com/package/@xaro/event-emitter) | [github](https://github.com/vladimir-xaro/event-emitter)

## Interfaces & Types

*types.d.ts*
```ts
import { I_EventEmitter } from '@xaro/event-emitter';

export interface I_Button {
  emitter:  I_EventEmitter;
  el:       HTMLElement;
  isLock:   boolean;

  lock():   void;
  unlock(): void;
}

export interface I_ButtonConstructorConfig {
  el: HTMLElement;
  on?: {
    beforeClick?:   I_ButtonMouseCallback | I_ButtonMouseCallback[];
    click?:         I_ButtonMouseCallback | I_ButtonMouseCallback[];
    afterClick?:    I_ButtonMouseCallback | I_ButtonMouseCallback[];

    mouseenter?:    I_ButtonMouseCallback | I_ButtonMouseCallback[];
    mouseover?:     I_ButtonMouseCallback | I_ButtonMouseCallback[];
    mouseout?:      I_ButtonMouseCallback | I_ButtonMouseCallback[];

    beforeLock?:    I_ButtonStateCallback | I_ButtonStateCallback[];
    afterLock?:     I_ButtonStateCallback | I_ButtonStateCallback[];

    beforeUnlock?:  I_ButtonStateCallback | I_ButtonStateCallback[];
    afterUnlock?:   I_ButtonStateCallback | I_ButtonStateCallback[];
  }
}

export type I_ButtonStateCallback = (button: I_Button) => void;
export type I_ButtonMouseCallback = (button: I_Button, originalEvent: MouseEvent) => void;
```

## License
[MIT](LICENSE)