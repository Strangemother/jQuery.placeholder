/**
 * 
 * @Author: Jay Jagpal
 * @Version: 0.1
 * 
 */

page = this;

(function( $ ){

  $.fn.placeholder = function() {

      var _overridden = false;

      var placeholderValue = null;
      var suggestedPlaceholder = null;
      var overridePlaceholder = false;
      
      var color = '#CFCFCF'
      
      var self = this;
      
      /**
       * construct
       */
      this.init = function(args) {
        
        this.parseArguments(args)

        if(this.placeHolderSupported() && !this.hasPlaceholder())
        {
          overridePlaceholder = true
        }
        
        /**
         * first check to see if the override has been forced 
         * attempt to apply the attribute before checking to see if
         * the browser can use it.
         */
        if(overridePlaceholder)
        {
          this.attr('placeholder', suggestedPlaceholder);
          _overidden = true;
        }
        
        
        if(this.placeHolderSupported())
        {
            //s.say("Native placeholder has been applied. Overidden?(" + overridePlaceholder + ") - Value = "  + this.getPlaceholderValue())
        }
        else
        {
            self.addPlaceholderText()
            
            //get placeholder value
            //get color
            //add listener to click/tab into, focus
            
              /*
               * If value is PH.
               * Blank text, 
               * Default Color.
               */
            //add listener to blur
            this.blur(this.blurHandler)
            this.focus(this.focusHandler)
              /*
               * If the value is blank - PH
               *  Change Color
               *  Change Text
               * 
               */
        }
      }
      
      
         /*
         * set the arguments passed to the corresponding 
         * variables 
         */
      this.parseArguments = function(args) {
        
        switch(args.length)
        {
          case 0:
            suggestedPlaceholder = 'Search'
            break;
          case 3:
            color = args[2]
          case 2:
            if(typeof(args[1]) == 'string')
            {
              suggestedPlaceholder = args[1]
            }
            else if(typeof(args[1]) == 'boolean')
            {
              overridePlaceholder = args[1]
            } 
            
          case 1:
            if(typeof(args[0]) == 'string')
            {
              suggestedPlaceholder = args[0]
            }
            else if(typeof(args[0]) == 'boolean')
            {
              overridePlaceholder = args[0]
            } 
            
            break;
        }
 
      }
      
      /**
       * return a boolean value denoting if the browser supports 
       * the placeholder attribute. 
       */
      this.placeHolderSupported = function() {
          return 'placeholder' in document.createElement('input');
      }
      
      /**
       * Detmine if the element has a placeholder attribute applied.
       * This differs from detecting if the browser can support the
       * attribute. This will return a value if a placeholder attribute
       * is set but the browser cannot support it.
       */
      this.hasPlaceholder = function(){
        var val = this.attr('placeholder');
        
        if(val)
        {
          if(val.length > 0)
          {
            placeholderValue = val;
            return true
          }
        }
        
        return false;
      }
      
      this.getPlaceholderValue = function() {
        
         var returnValue = null;
         
         if(placeholderValue)
         {
           if(overridePlaceholder)
              returnValue = suggestedPlaceholder
              
           returnValue = placeholderValue;
         }
         else
         {
           returnValue = suggestedPlaceholder;
         }
         
         if(returnValue == null || returnValue == undefined)
         {
           returnValue = 'Search'
         }
         
         
         return returnValue;
        
      }
      
      this.addPlaceholderText = function() {
        
        var el = self;
        
        if(arguments[0])
          el = arguments[0]
        
        if($(el).val() == '')
        {
          var text = this.getPlaceholderValue()
          
          if(arguments[0])
              text = arguments[0]
          
          this.css('color', color)
          this.val(text)
        }
      }
      
      this.removePlaceholderText = function() {
        var el = self;
        
        if(arguments[0])
          el = arguments[0]
        
        if($(el).val() == self.getPlaceholderValue())
        {
          this.val('')
          this.css('color', '#000000')
        }
        
      }
      
      this.blurHandler = function(eventObject){
        self.addPlaceholderText()
      }
      
      this.focusHandler = function(eventObject) {
        self.removePlaceholderText()
      }
      
      /**
       * initiate the intial (construct)
       */
      this.init(arguments)

  };
})( jQuery );
