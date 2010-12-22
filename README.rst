jQuery Placeholder
------------------

The jQuery placeholder easily allows you to emulate the ``placeholder=''`` attribute on input fields for all browsers. 
This allows you to have a grey prompt within an input field until the user begins typing. As this feature is not
yet fully implemented on all browsers, this jQuery plugin will fill in the gaps.

Using graceful degradation - the plugin first determines if the browser has the ``placeholder=''`` attribute. If not, 
it will default to the javascript handling.

Use
===

Its very simple to get started::

1. First include the script within your page.
      
       <script type="text/javascript" src="js/jquery.placeholder.js"></script>
    
if you do not wish to host it, or you are using it for debug purposes - or for any reason you
do not wish to download the file, you may request it from this address::
     
       <script type="text/javascript" src="http://strangemother.com/public/js/jquery.placeholder.js"></script>

2. Use the plugin just like any other jQuery extension::

      $(document).ready(function(){
        /*
         * '#search' is the enitity to apply the placeholder to. Replace this with the name of your element.
         */
        $('#search').placeholder();
      });


