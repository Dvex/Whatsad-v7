// Note, this is the old script,
// Using drupal behaviours is the right thing to do
// The new script is commented below
// TODO: make the newer script work (for some reason it doesnt for D7)
 
(function($) {
  
// Hide button and siblings
function hide_submit_button(obj, message) {
    $(obj).siblings('input:submit').hide(); 
    $(obj).hide(); 
    $(message).insertAfter(obj);
}

// Disable button and siblings
function disable_submit_button(obj) {
    $(obj).siblings('input:submit').attr("disabled", "disabled");
    $(obj).attr("disabled", "disabled");

    // Workaround for comment-form and node-form
    // inject missing "op" for preview or delete etc.
    $("#edit-hide-submit-fake-op").attr("name", "op");
    $("#edit-hide-submit-fake-op").attr("value", $(obj).attr("value"));            
    $(obj).parents("form").submit()
}

$(document).ready(function() {

    var settings = Drupal.settings.hide_submit;

    if (settings.dbg) {
        // For debugging, this addtion to the script will paint included and excluded buttons
        $('input:submit').css({border:'6px red solid'}); 
        $(settings.selector).css({border:'6px green solid'});
    }
    
    // Hide buttons and inject message
    if (settings.mode == 'hide') {

        if (settings.image) {
            jQuery("<img>").attr("src",settings.image);
        }
        
        $(settings.selector).click(function() {
            hide_submit_button(this, settings.message);
        })  

        // Submit when ENTER is pressed
        if (settings.keypress) {
            $(settings.selector).keypress(function() {
                $(this).parents("form").submit();
                hide_submit_button(this, settings.message);
            })  
        }
    } 
    else { // mode == 'disable' 
        $(settings.selector).click(function() {
            disable_submit_button(this);
        });
        
        // Submit when ENTER is pressed
        if (settings.keypress) {
            $(settings.selector).keypress(function() {
                disable_submit_button(this);
            });
        }
    }
})

}(jQuery));
  
  
/*
Drupal.behaviors.hide_submit = function(context) {

  // Hide button and siblings
  function hide_submit_button(obj, message, context) {
    $(obj, context).hide().siblings('input:submit').hide().end().after(message);
  }
  // Disable button and siblings
  function disable_submit_button(obj, context) {
    var $obj = $(obj, context);
    // Workaround for comment-form and node-form
    // inject missing "op" for preview or delete etc.
    $("#edit-hide-submit-fake-op", context)
      .attr("name", "op")
      .attr("value", $obj.attr("value"));
    $obj
      .attr("disabled", "disabled")
      .siblings('input:submit').attr("disabled", "disabled")
      .parents("form").submit();
  }
  var settings = Drupal.settings.hide_submit;
  if (settings.dbg) {
    // For debugging, this addtion to the script will paint included and excluded buttons
    $('input:submit', context).css({border:'6px red solid'});
    $(settings.selector, context).css({border:'6px green solid'});
  }
  // Hide buttons and inject message
  if (settings.mode == 'hide') {
        if (settings.image) {
            $("<img>").attr("src",settings.image);
        }
    $(settings.selector, context).click(function() {
      hide_submit_button(this, settings.message, context);
    })
    // Submit when ENTER is pressed
    if (settings.keypress) {
      $(settings.selector, context).keypress(function() {
        $(this).parents("form").submit();
        hide_submit_button(this, settings.message, context);
      })
    }
  }
  else { // mode == 'disable'
    $(settings.selector, context).click(function() {
      disable_submit_button(this, context);
    });
    // Submit when ENTER is pressed
    if (settings.keypress) {
      $(settings.selector, context).keypress(function() {
        disable_submit_button(this, context);
      });
    }
  }
}*/
