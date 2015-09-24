# jquery.responsiveMove

Usage example:

```javascript
$(".element_to_be_moved").responsiveMove({
	target: ".where_it_will_be_placed",
	wrapper: null, // If you to wrap this element before move... E.g. wrapper: "<div class='foobar-wrapper'></div>"
	mode: 'append', // Options: prepend, append, after (must inform prevElement)
    prevElement: null, // Eg.: "li.my-list:eq(3)" so the element will be placed inside target, after this element.
	break: 768
}, function() {
	// Function to be executed after moving the element (break)
}, function() {
	// Function to be executed after returning the element back
});
```


Thanks for using it!

Luiz Gustavo Freire Gama.