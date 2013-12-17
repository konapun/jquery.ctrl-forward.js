# jquery.ctrl-forward.js
Easy semantic form action changes for jQuery

## Motivation
I wanted a nice way to interact with wildcard controllers in order to provide prettier URLs than those
with GET params littering the string. To achieve this, I needed to be able to change form actions on the
fly based on some other tags within the form. Enter the jQuery forward controller.

## Usage
```html
<form method="get">
	<input id="textbox1" type="text" val="first" />
	<input id="textbox2" type="text" val="second" />
	
	<input type="submit" class="ctrl-forward" data-forward="/search/dual/[#textbox1]/[#textbox2]" />
</form>
```

```js
$('.ctrl-forward').ctrlForward({
	'fwd-attr': 'data-forward', // This is the default attribute
	'method': 'link' // "get", "post", "link", or undefined [default]. When undefined, the action defined in the form is taken.
});
```

Now, when the form's `submit` button is clicked, the form's action will automatically be set to
`/search/dual/first/second`, or whatever the value of `textbox1` and `textbox2` are at the time the
submit button is clicked.

### Advanced usage
Any text within the [ and ] tags in the data-forward attribute are executed within the context of jQuery.
To further scope this selection, the modifiers `^` and `>` are available which stand for the jQuery methods
`parents` and `siblings`, respectively which must be the first character within the [] tags.

## Options
**fwd-attr**: Specify the attribute the action will be defined in (default: `data-forward`)
  
**method**: [`get`|`post`|`link`|`undefined`] Specify the method used to submit the form. If undefined (default),
the method defined in the form will be used. If the type is `link`, the action will be submitted as a link and
the form's action will be cancelled.
