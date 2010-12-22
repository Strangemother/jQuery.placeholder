/**
 * 
 * @Author: Jay Jagpal
 * @Version: 0.1.1
 * 
 */

page = this;

(function( $ ){

  $.fn.placeholder = function() {

      var _overridden = false;
      var _defaultValue = 'Type Here'
      var placeholderValue = null;
      var suggestedPlaceholder = null;
      var overridePlaceholder = false;
      
      var color = '#CFCFCF'
      
      var self = this;
      
      var _placeholderSupported = null;
      var _hasPlaceholder = null;
      
      /**
       * construct
       */
      this.init = function(args) {
        
        this.parseArguments(args)

        _placeholderSupported = this.placeHolderSupported()
        _hasPlaceholder = this.hasPlaceholder()
        
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
          //do nothing - browser will take charge
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
            suggestedPlaceholder = _defaultValue
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
           {
              returnValue = suggestedPlaceholder
           }
           else
           {
              returnValue = placeholderValue;
           }
         }
         else
         {
           returnValue = suggestedPlaceholder;
         }
         
         if(returnValue == null || returnValue == undefined)
         {
           returnValue = _defaultValue
         }
         
         return returnValue;
        
      }
      
      this.addPlaceholderText = function() {
        
        var el = self;
        
        if(arguments[0])
          el = arguments[0]
        
        var text = this.getPlaceholderValue()
        
        if($(el).val() == '' || $(el).val() == text)
        {
          
          
          if(arguments[0])
              text = arguments[0]
          
          this.css('color', color)
          this.val(text)
          this.addClass('placeholder')
          
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
          this.removeClass('placeholder')
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
