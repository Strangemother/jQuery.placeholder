/**
 * 
 * @Author: Jay Jagpal
 * @Version: 0.2.1
 * 
 * Update: Fix over type bug - When a user types the same 
 * value as the placeholder text.
 * 
 * Update: Automatic form handling - clearing text if the 
 * element is within a form without a change.
 * 
 */

page = this;

(function( $ ){

  $.fn.placeholder = function() {
      var __version__ = 'v0.2'
      var _overridden = false;
      var _defaultValue = 'Type Here'
      var placeholderValue = null;
      var suggestedPlaceholder = null;
      var overridePlaceholder = false;
      
      var color = '#CFCFCF'
      
      var self = this;
      /*
       * Applied in .2 to allow form handling and checking.
       */
      var hasForm = false
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
        
        /**
         * Try to find any forms on the 
         * page.
         */
        var forms = $('form')
        
        /*
         * Read eaxh form and determine if this
         * element is within any of the forms collected
         * on the page.
         */
        for( var i=0; i < forms.length; i++)
        {
          var form = forms[i]
          var formElement = $(form).has(this)
          
          /**
           * If any forms have this element,
           * bind a submittion handler to the form to
           * capture the event before the data is sent.
           */
          if(formElement.length > 0)
          {
            for(var j=0; j < formElement.length; j++)
            {
              
              self.hasForm = true
              
              /*
               * If the form is sumbitted, clear the
               * text to ensure placeholder text is
               * not sent with the form submittion.
               */
              $(formElement[i]).submit(function(){
                self.removePlaceholderText()
              });
              
            }
          } 
        }
      }
      
      
         /*
         * set the arguments passed to the corresponding 
         * variables. This allows the user to send the
         * a specific order. 
         */
      this.parseArguments = function(args) {
        
        switch(args.length)
        {
          case 0:
            self.setPlaceHolder(_defaultValue)
            break;
          case 3:
            color = args[2]
          case 2:
            if(typeof(args[1]) == 'string')
            {
              self.setPlaceHolder(args[1])
            }
            else if(typeof(args[1]) == 'boolean')
            {
              overridePlaceholder = args[1]
            } 
            
          case 1:
            if(typeof(args[0]) == 'string')
            {
              self.setPlaceHolder(args[0])
            }
            else if(typeof(args[0]) == 'boolean')
            {
              overridePlaceholder = args[0]
            } 
            
            break;
        }
 
      }
      
      /*
       * 0.2.1 - helps in fixing the overtype bug. not many users
       * will type this combination of characters.
       */
      this.setPlaceHolder = function(){
        suggestedPlaceholder = String(arguments[0]).replace(' ', String.fromCharCode(160)) + String.fromCharCode(160) + "" + String.fromCharCode(160) + " ";
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
      
      this.hasCSSStyle = function() {
       
        
        var rule = '.placeholder'
        if(arguments[0])
          rule = arguments[0]
          
        var sheets = document.styleSheets
        
        /*
         * Walk through each sheet
         */
        for(var i=0; i < sheets.length; i++)
        {
          /*
           * Walk through each rule of this stylesheet
           */
          for(var j=0; j < sheets[i].cssRules.length; j++)
          {
            
            var cssRule = sheets[i].cssRules[j].selectorText;
            if (rule.indexOf(cssRule) != -1)
            {
              console.log(cssRule)
            }
          }
        }
      }
      
      /**
       * initiate the intial (construct)
       */
      this.init(arguments)
      //this.hasCSSStyle()

  };
})( jQuery );
