jQuery Placeholder
------------------

Please refer to the packaged example.html for use examples

The jQuery placeholder easily allows you to emulate the ``placeholder=''`` attribute on input fields for all browsers. 
This allows you to have a grey prompt within an input field until the user begins typing. As this feature is not
yet fully implemented on all browsers, this jQuery plugin will fill in the gaps.

Using graceful degradation - the plugin first determines if the browser has the ``placeholder=''`` attribute. If not, 
it will default to the javascript handling.

Fixes and Updates:
=================

0.2.0 - Feature - Automatic form handling has now been applied, ensuring form submissions do not include placeholder text

0.2.1 - Bug fix - for overtyping. User typed values will not be captured as placeholder text.

Browsers
========

Tested browsers are:
 

- Chrome 6
- Chrome 7
- Chrome 8

- Opera 10
- Opera 11.00

- Firefox 3.6.11
- Firefox 3.6.13

- Internet Explorer 6
- Internet Explorer 7
- Internet Explorer 8

- Safari 4 Mac
- Safari 4 PC
- Safari 5 PC
- Safari iOS (iPad, iPhone, iPod)


Use
===

Its very simple to get started::

1. First include the script within your page::
     
        <script type="text/javascript" src="js/jquery.placeholder.min.js"></script>
    
For any reason you do not wish to download the file, you may request it from this address::
     
       <script type="text/javascript" src="http://strangemother.com/public/js/jquery.placeholder.min.js"></script>


2. Use the plugin just like any other jQuery extension::

      $(document).ready(function(){
        /* Replace '#search' with the name of your element. */
        $('#search').placeholder();
      });


Your pretty much good to go! - read more for additional parameters.

Options
=======

You may pass three parameters into the plugin.

1. The placeholder text:
    
    In order to customise the value used as a placeholder you can pass a string with your placeholder text::
    
    $('#search').placeholder('Type your tags...');
    
2. Overriding default placeholder value.

    With the graceful degradation, if the placeholder attribute is valid for the browser and exists within the markup
    the plugin will not perform any actions and allow the browser to perform its standard task - however, you may
    override the placeholder value set within the markup - with the passed value to the plugin.
    
    You may send a boolean of ``true`` to the plugin to override this::
    
    $('#search').placeholder('Type your tags...', true);
    
    by default this is false. It doesn't matter which is the first passed value.

3. Overriding the default placeholder color.
    
    While the input element will get the ``.placeholder`` class which can be styled with CSS,
    the color of the placeholder text is set inside the plugin. You can configure the color
    with a third parameter:
    
    $('#search').placeholder('Type your tags...', true, '#ffcccc');
    
Degradation
===========

A light description of how the fallback will proceed.

---
 - Allowed placeholder
 - Has placeholder
 - Override not set

  Value will be that of the markup ``placeholder`` - applied as the ``placeholder`` attribute

---
 - Allowed placeholder
 - Has placeholder
 - Override is set

  Value will be that of the string passed to the plugin - applied as the ``placeholder`` attribute

---
 - Allowed placeholder
 - No placeholder

  Value will be that of the string passed to the plugin - applied as the ``placeholder`` attribute
  
---
 - Not Allowed placeholder

  Value will be that of the string passed to the plugin - handled by the javascript



