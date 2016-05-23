// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

/**
 * scrollTo
 * Copyright (c) 2007-2012 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.3.1
 */
(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,e,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

/**
 * jQuery.LocalScroll - Animated scrolling navigation, using anchors.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 3/11/2009
 * @author Ariel Flesler
 * @version 1.2.7
 **/
(function($){var l=location.href.replace(/#.*/,'');var g=$.localScroll=function(a){$('body').localScroll(a)};g.defaults={duration:1e3,axis:'y',event:'click',stop:true,target:window,reset:true};g.hash=function(a){if(location.hash){a=$.extend({},g.defaults,a);a.hash=false;if(a.reset){var e=a.duration;delete a.duration;$(a.target).scrollTo(0,a);a.duration=e}i(0,location,a)}};$.fn.localScroll=function(b){b=$.extend({},g.defaults,b);return b.lazy?this.bind(b.event,function(a){var e=$([a.target,a.target.parentNode]).filter(d)[0];if(e)i(a,e,b)}):this.find('a,area').filter(d).bind(b.event,function(a){i(a,this,b)}).end().end();function d(){return!!this.href&&!!this.hash&&this.href.replace(this.hash,'')==l&&(!b.filter||$(this).is(b.filter))}};function i(a,e,b){var d=e.hash.slice(1),f=document.getElementById(d)||document.getElementsByName(d)[0];if(!f)return;if(a)a.preventDefault();var h=$(b.target);if(b.lock&&h.is(':animated')||b.onBefore&&b.onBefore.call(b,a,f,h)===false)return;if(b.stop)h.stop(true);if(b.hash){var j=f.id==d?'id':'name',k=$('<a> </a>').attr(j,d).css({position:'absolute',top:$(window).scrollTop(),left:$(window).scrollLeft()});f[j]='';$('body').prepend(k);location=e.hash;k.remove();f[j]=d}h.scrollTo(f,b).trigger('notify.serialScroll',[f])}})(jQuery);


/* Parsley dist/parsley.min.js build version 1.1.14 http://parsleyjs.org */
!function(d){var h=function(a){this.messages={defaultMessage:"This value seems to be invalid.",type:{email:"This value should be a valid email.",url:"This value should be a valid url.",urlstrict:"This value should be a valid url.",number:"This value should be a valid number.",digits:"This value should be digits.",dateIso:"This value should be a valid date (YYYY-MM-DD).",alphanum:"This value should be alphanumeric."},notnull:"This value should not be null.",notblank:"This value should not be blank.",
required:"This value is required.",regexp:"This value seems to be invalid.",min:"This value should be greater than %s.",max:"This value should be lower than %s.",range:"This value should be between %s and %s.",minlength:"This value is too short. It should have %s characters or more.",maxlength:"This value is too long. It should have %s characters or less.",rangelength:"This value length is invalid. It should be between %s and %s characters long.",mincheck:"You must select at least %s choices.",maxcheck:"You must select %s choices or less.",
rangecheck:"You must select between %s and %s choices.",equalto:"This value should be the same."};this.init(a)};h.prototype={constructor:h,validators:{notnull:function(a){return 0<a.length},notblank:function(a){return null!==a&&""!==a.replace(/^\s+/g,"").replace(/\s+$/g,"")},required:function(a){if("object"===typeof a){for(var b in a)if(this.required(a[b]))return!0;return!1}return this.notnull(a)&&this.notblank(a)},type:function(a,b){var c;switch(b){case "number":c=/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;
break;case "digits":c=/^\d+$/;break;case "alphanum":c=/^\w+$/;break;case "email":c=/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
break;case "url":a=/(https?|s?ftp|git)/i.test(a)?a:"http://"+a;case "urlstrict":c=/^(https?|s?ftp|git):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
break;case "dateIso":c=/^(\d{4})\D?(0[1-9]|1[0-2])\D?([12]\d|0[1-9]|3[01])$/;break;default:return!1}return""!==a?c.test(a):!1},regexp:function(a,b){return RegExp(b,"i").test(a)},minlength:function(a,b){return a.length>=b},maxlength:function(a,b){return a.length<=b},rangelength:function(a,b){return this.minlength(a,b[0])&&this.maxlength(a,b[1])},min:function(a,b){return Number(a)>=b},max:function(a,b){return Number(a)<=b},range:function(a,b){return a>=b[0]&&a<=b[1]},equalto:function(a,b,c){c.options.validateIfUnchanged=
!0;return a===d(b).val()},remote:function(a,b,c){var f={},g={};f[c.$element.attr("name")]=a;"undefined"!==typeof c.options.remoteDatatype&&(g={dataType:c.options.remoteDatatype});var l=function(a,b){c.removeError("remote");c.updtConstraint({name:"remote",isValid:a},b);c.manageValidationResult()},n=function(a){if("object"===typeof a)return a;try{a=d.parseJSON(a)}catch(b){}return a},e=function(a){return"object"===typeof a&&null!==a?"undefined"!==typeof a.error?a.error:"undefined"!==typeof a.message?
a.message:null:null};d.ajax(d.extend({},{url:b,data:f,async:c.async,type:c.options.remoteMethod||"GET",success:function(a){a=n(a);l(1===a||!0===a||"object"===typeof a&&null!==a&&"undefined"!==typeof a.success,e(a))},error:function(a){a=n(a);l(!1,e(a))}},g));c.async&&l(null);return null},mincheck:function(a,b){return this.minlength(a,b)},maxcheck:function(a,b){return this.maxlength(a,b)},rangecheck:function(a,b){return this.rangelength(a,b)}},init:function(a){var b=a.validators;a=a.messages;for(var c in b)this.addValidator(c,
b[c]);for(c in a)this.addMessage(c,a[c])},formatMesssage:function(a,b){if("object"===typeof b){for(var c in b)a=this.formatMesssage(a,b[c]);return a}return"string"===typeof a?a.replace(/%s/i,b):""},addValidator:function(a,b){this.validators[a]=b},addMessage:function(a,b,c){if("undefined"!==typeof c&&!0===c)this.messages.type[a]=b;else if("type"===a)for(var d in b)this.messages.type[d]=b[d];else this.messages[a]=b}};var j=function(a,b,c){this.options=b;this.Validator=new h(b);if("ParsleyFieldMultiple"===
c)return this;this.init(a,c||"ParsleyField")};j.prototype={constructor:j,init:function(a,b){this.type=b;this.isValid=!0;this.element=a;this.validatedOnce=!1;this.$element=d(a);this.val=this.$element.val();this.isRequired=!1;this.constraints=[];"undefined"===typeof this.isRadioOrCheckbox&&(this.isRadioOrCheckbox=!1,this.hash=this.generateHash(),this.errorClassHandler=this.options.errors.classHandler(a,this.isRadioOrCheckbox)||this.$element);this.ulErrorManagement();this.bindHtml5Constraints();this.addConstraints();
this.constraints.length&&this.bindValidationEvents()},setParent:function(a){this.$parent=d(a)},getParent:function(){return this.$parent},bindHtml5Constraints:function(){if(this.$element.hasClass("required")||this.$element.attr("required"))this.options.required=!0;"undefined"!==typeof this.$element.attr("type")&&RegExp(this.$element.attr("type"),"i").test("email url number range")&&(this.options.type=this.$element.attr("type"),RegExp(this.options.type,"i").test("number range")&&(this.options.type=
"number","undefined"!==typeof this.$element.attr("min")&&this.$element.attr("min").length&&(this.options.min=this.$element.attr("min")),"undefined"!==typeof this.$element.attr("max")&&this.$element.attr("max").length&&(this.options.max=this.$element.attr("max"))));"string"===typeof this.$element.attr("pattern")&&this.$element.attr("pattern").length&&(this.options.regexp=this.$element.attr("pattern"))},addConstraints:function(){for(var a in this.options){var b={};b[a]=this.options[a];this.addConstraint(b,
!0)}},addConstraint:function(a,b){for(var c in a)c=c.toLowerCase(),"function"===typeof this.Validator.validators[c]&&(this.constraints.push({name:c,requirements:a[c],isValid:null}),"required"===c&&(this.isRequired=!0),this.addCustomConstraintMessage(c));"undefined"===typeof b&&this.bindValidationEvents()},updateConstraint:function(a,b){for(var c in a)this.updtConstraint({name:c,requirements:a[c],isValid:null},b)},updtConstraint:function(a,b){for(var c in this.constraints)this.constraints[c].name===
a.name&&(this.constraints[c]=d.extend(!0,this.constraints[c],a),"string"===typeof b&&(this.Validator.messages[this.constraints[c].name]=b));this.bindValidationEvents()},removeConstraint:function(a){a=a.toLowerCase();var b=[],c;for(c in this.constraints)this.constraints[c].name!==a&&b.push(this.constraints[c]);"required"===a&&(this.isRequired=!1);this.constraints=b;0===b.length?"ParsleyForm"===typeof this.getParent()?this.getParent().removeItem(this.$element):this.destroy():this.bindValidationEvents()},
addCustomConstraintMessage:function(a){var b=a+("type"===a&&"undefined"!==typeof this.options[a]?this.options[a].charAt(0).toUpperCase()+this.options[a].substr(1):"")+"Message";"undefined"!==typeof this.options[b]&&this.Validator.addMessage("type"===a?this.options[a]:a,this.options[b],"type"===a)},bindValidationEvents:function(){this.isValid=null;this.$element.addClass("parsley-validated");this.$element.off("."+this.type);this.options.remote&&!/change/i.test(this.options.trigger)&&(this.options.trigger=
!this.options.trigger?"change":" change");var a=(!this.options.trigger?"":this.options.trigger)+(/key/i.test(this.options.trigger)?"":" keyup");this.$element.is("select")&&(a+=/change/i.test(a)?"":" change");a=a.replace(/^\s+/g,"").replace(/\s+$/g,"");this.$element.on((a+" ").split(" ").join("."+this.type+" "),!1,d.proxy(this.eventValidation,this))},generateHash:function(){return"parsley-"+(Math.random()+"").substring(2)},getHash:function(){return this.hash},getVal:function(){return this.$element.val()},
eventValidation:function(a){var b=this.getVal();if("keyup"===a.type&&!/keyup/i.test(this.options.trigger)&&!this.validatedOnce||"change"===a.type&&!/change/i.test(this.options.trigger)&&!this.validatedOnce||!this.isRadioOrCheckbox&&b.length<this.options.validationMinlength&&!this.validatedOnce)return!0;this.validate(!0,!1)},isFieldValid:function(){return this.validate(!1,!1)},validate:function(a,b){var c=this.getVal(),d=null;if(0===this.constraints.length)return null;if(this.options.listeners.onFieldValidate(this.element,
this)||""===c&&!this.isRequired)return this.reset(),null;if(!this.needsValidation(c))return this.isValid;this.errorBubbling="undefined"!==typeof a?a:!0;this.async="undefined"!==typeof b?b:!0;d=this.applyValidators();this.errorBubbling&&this.manageValidationResult();return d},needsValidation:function(a){if(!this.options.validateIfUnchanged&&null!==this.isValid&&this.val===a&&this.validatedOnce)return!1;this.val=a;return this.validatedOnce=!0},applyValidators:function(){for(var a=null,b=0;b<this.constraints.length;b++){var c=
this.Validator.validators[this.constraints[b].name](this.val,this.constraints[b].requirements,this);!1===c?(a=!1,this.constraints[b].isValid=a):!0===c&&(this.constraints[b].isValid=!0,a=!1!==a)}return a},manageValidationResult:function(){for(var a=null,b=0;b<this.constraints.length;b++)!1===this.constraints[b].isValid?(this.manageError(this.constraints[b]),a=!1):!0===this.constraints[b].isValid&&(this.removeError(this.constraints[b].name),a=!1!==a);this.isValid=a;return!0===this.isValid?(this.removeErrors(),
this.errorClassHandler.removeClass(this.options.errorClass).addClass(this.options.successClass),this.options.listeners.onFieldSuccess(this.element,this.constraints,this),!0):!1===this.isValid?(this.errorClassHandler.removeClass(this.options.successClass).addClass(this.options.errorClass),this.options.listeners.onFieldError(this.element,this.constraints,this),!1):a},ulErrorManagement:function(){this.ulError="#"+this.hash;this.ulTemplate=d(this.options.errors.errorsWrapper).attr("id",this.hash).addClass("parsley-error-list")},
removeError:function(a){a=this.ulError+" ."+a;this.options.animate?d(a).fadeOut(this.options.animateDuration,function(){d(this).remove()}):d(a).remove();this.ulError&&0===d(this.ulError).children().length&&this.removeErrors()},addError:function(a){for(var b in a){var c=d(this.options.errors.errorElem).addClass(b);d(this.ulError).append(this.options.animate?d(c).text(a[b]).hide().fadeIn(this.options.animateDuration):d(c).text(a[b]))}},removeErrors:function(){this.options.animate?d(this.ulError).fadeOut(this.options.animateDuration,
function(){d(this).remove()}):d(this.ulError).remove()},reset:function(){this.isValid=null;this.removeErrors();this.validatedOnce=!1;this.errorClassHandler.removeClass(this.options.successClass).removeClass(this.options.errorClass);return this},manageError:function(a){d(this.ulError).length||this.manageErrorContainer();var b=a.name,c=!1!==this.options.errorMessage?"custom-error-message":b,f={};a=!1!==this.options.errorMessage?this.options.errorMessage:"type"===a.name?this.Validator.messages[b][a.requirements]:
"undefined"===typeof this.Validator.messages[b]?this.Validator.messages.defaultMessage:this.Validator.formatMesssage(this.Validator.messages[b],a.requirements);d(this.ulError+" ."+c).length||(f[c]=a,this.addError(f))},manageErrorContainer:function(){var a=this.options.errorContainer||this.options.errors.container(this.element,this.isRadioOrCheckbox),b=this.options.animate?this.ulTemplate.show():this.ulTemplate;"undefined"!==typeof a?d(a).append(b):!this.isRadioOrCheckbox?this.$element.after(b):this.$element.parent().after(b)},
addListener:function(a){for(var b in a)this.options.listeners[b]=a[b]},destroy:function(){this.$element.removeClass("parsley-validated");this.reset().$element.off("."+this.type).removeData(this.type)}};var m=function(a,b,c){this.initMultiple(a,b);this.inherit(a,b);this.Validator=new h(b);this.init(a,c||"ParsleyFieldMultiple")};m.prototype={constructor:m,initMultiple:function(a,b){this.element=a;this.$element=d(a);this.group=b.group||!1;this.hash=this.getName();this.siblings=this.group?'[data-group="'+
this.group+'"]':'input[name="'+this.$element.attr("name")+'"]';this.isRadioOrCheckbox=!0;this.isRadio=this.$element.is("input[type=radio]");this.isCheckbox=this.$element.is("input[type=checkbox]");this.errorClassHandler=b.errors.classHandler(a,this.isRadioOrCheckbox)||this.$element.parent()},inherit:function(a,b){var c=new j(a,b,"ParsleyFieldMultiple"),d;for(d in c)"undefined"===typeof this[d]&&(this[d]=c[d])},getName:function(){if(this.group)return"parsley-"+this.group;if("undefined"===typeof this.$element.attr("name"))throw"A radio / checkbox input must have a data-group attribute or a name to be Parsley validated !";
return"parsley-"+this.$element.attr("name").replace(/(:|\.|\[|\])/g,"")},getVal:function(){if(this.isRadio)return d(this.siblings+":checked").val()||"";if(this.isCheckbox){var a=[];d(this.siblings+":checked").each(function(){a.push(d(this).val())});return a}},bindValidationEvents:function(){this.isValid=null;this.$element.addClass("parsley-validated");this.$element.off("."+this.type);var a=this,b=(!this.options.trigger?"":this.options.trigger)+(/change/i.test(this.options.trigger)?"":" change"),b=
b.replace(/^\s+/g,"").replace(/\s+$/g,"");d(this.siblings).each(function(){d(this).on(b.split(" ").join("."+a.type+" "),!1,d.proxy(a.eventValidation,a))})}};var k=function(a,b,c){this.init(a,b,c||"parsleyForm")};k.prototype={constructor:k,init:function(a,b,c){this.type=c;this.items=[];this.$element=d(a);this.options=b;var f=this;this.$element.find(b.inputs).each(function(){f.addItem(this)});this.$element.on("submit."+this.type,!1,d.proxy(this.validate,this))},addListener:function(a){for(var b in a)if(/Field/.test(b))for(var c=
0;c<this.items.length;c++)this.items[c].addListener(a);else this.options.listeners[b]=a[b]},addItem:function(a){if(d(a).is(this.options.excluded))return!1;a=d(a).parsley(this.options);a.setParent(this);this.items.push(a)},removeItem:function(a){a=d(a).parsley();for(var b=0;b<this.items.length;b++)if(this.items[b].hash===a.hash)return this.items[b].destroy(),this.items.splice(b,1),!0;return!1},validate:function(a){var b=!0;this.focusedField=!1;for(var c=0;c<this.items.length;c++)if("undefined"!==typeof this.items[c]&&
!1===this.items[c].validate()&&(b=!1,!this.focusedField&&"first"===this.options.focus||"last"===this.options.focus))this.focusedField=this.items[c].$element;this.focusedField&&!b&&this.focusedField.focus();this.options.listeners.onFormSubmit(b,a,this);return b},isValid:function(){for(var a=0;a<this.items.length;a++)if(!1===this.items[a].isFieldValid())return!1;return!0},removeErrors:function(){for(var a=0;a<this.items.length;a++)this.items[a].parsley("reset")},destroy:function(){for(var a=0;a<this.items.length;a++)this.items[a].destroy();
this.$element.off("."+this.type).removeData(this.type)},reset:function(){for(var a=0;a<this.items.length;a++)this.items[a].reset()}};d.fn.parsley=function(a,b){function c(c,g){var e=d(c).data(g);if(!e){switch(g){case "parsleyForm":e=new k(c,f,"parsleyForm");break;case "parsleyField":e=new j(c,f,"parsleyField");break;case "parsleyFieldMultiple":e=new m(c,f,"parsleyFieldMultiple");break;default:return}d(c).data(g,e)}return"string"===typeof a&&"function"===typeof e[a]?(e=e[a](b),"undefined"!==typeof e?
e:d(c)):e}var f=d.extend(!0,{},d.fn.parsley.defaults,"undefined"!==typeof window.ParsleyConfig?window.ParsleyConfig:{},a,this.data()),g=null;d(this).is("form")?g=c(d(this),"parsleyForm"):d(this).is(f.inputs)&&!d(this).is(f.excluded)&&(g=c(d(this),!d(this).is("input[type=radio], input[type=checkbox]")?"parsleyField":"parsleyFieldMultiple"));return"function"===typeof b?b():g};d.fn.parsley.Constructor=k;d.fn.parsley.defaults={inputs:"input, textarea, select",excluded:"input[type=hidden], :disabled",
trigger:!1,animate:!0,animateDuration:300,focus:"first",validationMinlength:3,successClass:"parsley-success",errorClass:"parsley-error",errorMessage:!1,validators:{},messages:{},validateIfUnchanged:!1,errors:{classHandler:function(){},container:function(){},errorsWrapper:"<ul></ul>",errorElem:"<li></li>"},listeners:{onFieldValidate:function(){return!1},onFormSubmit:function(){},onFieldError:function(){},onFieldSuccess:function(){}}};d(window).on("load",function(){d('[data-validate="parsley"]').each(function(){d(this).parsley()})})}(window.jQuery||
window.Zepto);

/*

Tooltipster 2.1 | 2/12/13
A rockin' custom tooltip jQuery plugin

Developed by: Caleb Jacob - calebjacob.com
Copyright (C) 2013 Caleb Jacob

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/
(function(d,f,g,b){var e="tooltipster",c={animation:"fade",arrow:true,arrowColor:"",content:"",delay:200,fixedWidth:0,maxWidth:0,functionBefore:function(l,m){m()},functionReady:function(l,m){},functionAfter:function(l){},icon:"(?)",iconDesktop:false,iconTouch:false,iconTheme:".tooltipster-icon",interactive:false,interactiveTolerance:350,offsetX:0,offsetY:0,onlyOne:true,position:"top",speed:350,timer:0,theme:".tooltipster-default",touchDevices:true,trigger:"hover",updateAnimation:true};function h(m,l){this.element=m;this.options=d.extend({},c,l);this._defaults=c;this._name=e;this.init()}function j(){return !!("ontouchstart" in f)}function a(){var l=g.body||g.documentElement;var n=l.style;var o="transition";if(typeof n[o]=="string"){return true}v=["Moz","Webkit","Khtml","O","ms"],o=o.charAt(0).toUpperCase()+o.substr(1);for(var m=0;m<v.length;m++){if(typeof n[v[m]+o]=="string"){return true}}return false}var k=true;if(!a()){k=false}h.prototype={init:function(){var r=d(this.element);var n=this;var q=true;if((n.options.touchDevices==false)&&(j())){q=false}if(g.all&&!g.querySelector){q=false}if(q==true){if((this.options.iconDesktop==true)&&(!j())||((this.options.iconTouch==true)&&(j()))){var m=r.attr("title");r.removeAttr("title");var p=n.options.iconTheme;var o=d('<span class="'+p.replace(".","")+'" title="'+m+'">'+this.options.icon+"</span>");o.insertAfter(r);r.data("tooltipsterIcon",o);r=o}var l=d.trim(n.options.content).length>0?n.options.content:r.attr("title");r.data("tooltipsterContent",l);r.removeAttr("title");if((this.options.touchDevices==true)&&(j())){r.bind("touchstart",function(t,s){n.showTooltip()})}else{if(this.options.trigger=="hover"){r.on("mouseenter.tooltipster",function(){n.showTooltip()});if(this.options.interactive==true){r.on("mouseleave.tooltipster",function(){var t=r.data("tooltipster");var u=false;if((t!==b)&&(t!=="")){t.mouseenter(function(){u=true});t.mouseleave(function(){u=false});var s=setTimeout(function(){if(u==true){t.mouseleave(function(){n.hideTooltip()})}else{n.hideTooltip()}},n.options.interactiveTolerance)}else{n.hideTooltip()}})}else{r.on("mouseleave.tooltipster",function(){n.hideTooltip()})}}if(this.options.trigger=="click"){r.on("click.tooltipster",function(){if((r.data("tooltipster")=="")||(r.data("tooltipster")==b)){n.showTooltip()}else{n.hideTooltip()}})}}}},showTooltip:function(m){var n=d(this.element);var l=this;if(n.data("tooltipsterIcon")!==b){n=n.data("tooltipsterIcon")}if(!n.hasClass("tooltipster-disable")){if((d(".tooltipster-base").not(".tooltipster-dying").length>0)&&(l.options.onlyOne==true)){d(".tooltipster-base").not(".tooltipster-dying").not(n.data("tooltipster")).each(function(){d(this).addClass("tooltipster-kill");var o=d(this).data("origin");o.data("plugin_tooltipster").hideTooltip()})}n.clearQueue().delay(l.options.delay).queue(function(){l.options.functionBefore(n,function(){if((n.data("tooltipster")!==b)&&(n.data("tooltipster")!=="")){var w=n.data("tooltipster");if(!w.hasClass("tooltipster-kill")){var s="tooltipster-"+l.options.animation;w.removeClass("tooltipster-dying");if(k==true){w.clearQueue().addClass(s+"-show")}if(l.options.timer>0){var q=w.data("tooltipsterTimer");clearTimeout(q);q=setTimeout(function(){w.data("tooltipsterTimer",b);l.hideTooltip()},l.options.timer);w.data("tooltipsterTimer",q)}if((l.options.touchDevices==true)&&(j())){d("body").bind("touchstart",function(B){if(l.options.interactive==true){var D=d(B.target);var C=true;D.parents().each(function(){if(d(this).hasClass("tooltipster-base")){C=false}});if(C==true){l.hideTooltip();d("body").unbind("touchstart")}}else{l.hideTooltip();d("body").unbind("touchstart")}})}}}else{d("body").css("overflow-x","hidden");var x=n.data("tooltipsterContent");var u=l.options.theme;var y=u.replace(".","");var s="tooltipster-"+l.options.animation;var r="-webkit-transition-duration: "+l.options.speed+"ms; -webkit-animation-duration: "+l.options.speed+"ms; -moz-transition-duration: "+l.options.speed+"ms; -moz-animation-duration: "+l.options.speed+"ms; -o-transition-duration: "+l.options.speed+"ms; -o-animation-duration: "+l.options.speed+"ms; -ms-transition-duration: "+l.options.speed+"ms; -ms-animation-duration: "+l.options.speed+"ms; transition-duration: "+l.options.speed+"ms; animation-duration: "+l.options.speed+"ms;";var o=l.options.fixedWidth>0?"width:"+l.options.fixedWidth+"px;":"";var z=l.options.maxWidth>0?"max-width:"+l.options.maxWidth+"px;":"";var t=l.options.interactive==true?"pointer-events: auto;":"";var w=d('<div class="tooltipster-base '+y+" "+s+'" style="'+o+" "+z+" "+t+" "+r+'"><div class="tooltipster-content">'+x+"</div></div>");w.appendTo("body");n.data("tooltipster",w);w.data("origin",n);l.positionTooltip();l.options.functionReady(n,w);if(k==true){w.addClass(s+"-show")}else{w.css("display","none").removeClass(s).fadeIn(l.options.speed)}var A=x;var p=setInterval(function(){var B=n.data("tooltipsterContent");if(d("body").find(n).length==0){w.addClass("tooltipster-dying");l.hideTooltip()}else{if((A!==B)&&(B!=="")){A=B;w.find(".tooltipster-content").html(B);if(l.options.updateAnimation==true){if(a()){w.css({width:"","-webkit-transition":"all "+l.options.speed+"ms, width 0ms, height 0ms, left 0ms, top 0ms","-moz-transition":"all "+l.options.speed+"ms, width 0ms, height 0ms, left 0ms, top 0ms","-o-transition":"all "+l.options.speed+"ms, width 0ms, height 0ms, left 0ms, top 0ms","-ms-transition":"all "+l.options.speed+"ms, width 0ms, height 0ms, left 0ms, top 0ms",transition:"all "+l.options.speed+"ms, width 0ms, height 0ms, left 0ms, top 0ms"}).addClass("tooltipster-content-changing");setTimeout(function(){w.removeClass("tooltipster-content-changing");setTimeout(function(){w.css({"-webkit-transition":l.options.speed+"ms","-moz-transition":l.options.speed+"ms","-o-transition":l.options.speed+"ms","-ms-transition":l.options.speed+"ms",transition:l.options.speed+"ms"})},l.options.speed)},l.options.speed)}else{w.fadeTo(l.options.speed,0.5,function(){w.fadeTo(l.options.speed,1)})}}l.positionTooltip()}}if((d("body").find(w).length==0)||(d("body").find(n).length==0)){clearInterval(p)}},200);if(l.options.timer>0){var q=setTimeout(function(){w.data("tooltipsterTimer",b);l.hideTooltip()},l.options.timer+l.options.speed);w.data("tooltipsterTimer",q)}if((l.options.touchDevices==true)&&(j())){d("body").bind("touchstart",function(B){if(l.options.interactive==true){var D=d(B.target);var C=true;D.parents().each(function(){if(d(this).hasClass("tooltipster-base")){C=false}});if(C==true){l.hideTooltip();d("body").unbind("touchstart")}}else{l.hideTooltip();d("body").unbind("touchstart")}})}w.mouseleave(function(){l.hideTooltip()})}});n.dequeue()})}},hideTooltip:function(m){var p=d(this.element);var l=this;if(p.data("tooltipsterIcon")!==b){p=p.data("tooltipsterIcon")}var o=p.data("tooltipster");if(o==b){o=d(".tooltipster-dying")}p.clearQueue();if((o!==b)&&(o!=="")){var q=o.data("tooltipsterTimer");if(q!==b){clearTimeout(q)}var n="tooltipster-"+l.options.animation;if(k==true){o.clearQueue().removeClass(n+"-show").addClass("tooltipster-dying").delay(l.options.speed).queue(function(){o.remove();p.data("tooltipster","");d("body").css("verflow-x","");l.options.functionAfter(p)})}else{o.clearQueue().addClass("tooltipster-dying").fadeOut(l.options.speed,function(){o.remove();p.data("tooltipster","");d("body").css("verflow-x","");l.options.functionAfter(p)})}}},positionTooltip:function(O){var A=d(this.element);var ab=this;if(A.data("tooltipsterIcon")!==b){A=A.data("tooltipsterIcon")}if((A.data("tooltipster")!==b)&&(A.data("tooltipster")!=="")){var ah=A.data("tooltipster");ah.css("width","");var ai=d(f).width();var B=A.outerWidth(false);var ag=A.outerHeight(false);var al=ah.outerWidth(false);var m=ah.innerWidth()+1;var M=ah.outerHeight(false);var aa=A.offset();var Z=aa.top;var u=aa.left;var y=b;if(A.is("area")){var T=A.attr("shape");var af=A.parent().attr("name");var P=d('img[usemap="#'+af+'"]');var n=P.offset().left;var L=P.offset().top;var W=A.attr("coords")!==b?A.attr("coords").split(","):b;if(T=="circle"){var N=parseInt(W[0]);var r=parseInt(W[1]);var D=parseInt(W[2]);ag=D*2;B=D*2;Z=L+r-D;u=n+N-D}else{if(T=="rect"){var N=parseInt(W[0]);var r=parseInt(W[1]);var q=parseInt(W[2]);var J=parseInt(W[3]);ag=J-r;B=q-N;Z=L+r;u=n+N}else{if(T=="poly"){var x=[];var ae=[];var H=0,G=0,ad=0,ac=0;var aj="even";for(i=0;i<W.length;i++){var F=parseInt(W[i]);if(aj=="even"){if(F>ad){ad=F;if(i==0){H=ad}}if(F<H){H=F}aj="odd"}else{if(F>ac){ac=F;if(i==1){G=ac}}if(F<G){G=F}aj="even"}}ag=ac-G;B=ad-H;Z=L+G;u=n+H}else{ag=P.outerHeight(false);B=P.outerWidth(false);Z=L;u=n}}}}if(ab.options.fixedWidth==0){ah.css({width:m+"px","padding-left":"0px","padding-right":"0px"})}var s=0,V=0;var X=parseInt(ab.options.offsetY);var Y=parseInt(ab.options.offsetX);var p="";function w(){var an=d(f).scrollLeft();if((s-an)<0){var am=s-an;s=an;ah.data("arrow-reposition",am)}if(((s+al)-an)>ai){var am=s-((ai+an)-al);s=(ai+an)-al;ah.data("arrow-reposition",am)}}function t(an,am){if(((Z-d(f).scrollTop()-M-X-12)<0)&&(am.indexOf("top")>-1)){ab.options.position=an;y=am}if(((Z+ag+M+12+X)>(d(f).scrollTop()+d(f).height()))&&(am.indexOf("bottom")>-1)){ab.options.position=an;y=am;V=(Z-M)-X-12}}if(ab.options.position=="top"){var Q=(u+al)-(u+B);s=(u+Y)-(Q/2);V=(Z-M)-X-12;w();t("bottom","top")}if(ab.options.position=="top-left"){s=u+Y;V=(Z-M)-X-12;w();t("bottom-left","top-left")}if(ab.options.position=="top-right"){s=(u+B+Y)-al;V=(Z-M)-X-12;w();t("bottom-right","top-right")}if(ab.options.position=="bottom"){var Q=(u+al)-(u+B);s=u-(Q/2)+Y;V=(Z+ag)+X+12;w();t("top","bottom")}if(ab.options.position=="bottom-left"){s=u+Y;V=(Z+ag)+X+12;w();t("top-left","bottom-left")}if(ab.options.position=="bottom-right"){s=(u+B+Y)-al;V=(Z+ag)+X+12;w();t("top-right","bottom-right")}if(ab.options.position=="left"){s=u-Y-al-12;myLeftMirror=u+Y+B+12;var K=(Z+M)-(Z+A.outerHeight(false));V=Z-(K/2)-X;if((s<0)&&((myLeftMirror+al)>ai)){var o=parseFloat(ah.css("border-width"))*2;var l=(al+s)-o;ah.css("width",l+"px");M=ah.outerHeight(false);s=u-Y-l-12-o;K=(Z+M)-(Z+A.outerHeight(false));V=Z-(K/2)-X}else{if(s<0){s=u+Y+B+12;ah.data("arrow-reposition","left")}}}if(ab.options.position=="right"){s=u+Y+B+12;myLeftMirror=u-Y-al-12;var K=(Z+M)-(Z+A.outerHeight(false));V=Z-(K/2)-X;if(((s+al)>ai)&&(myLeftMirror<0)){var o=parseFloat(ah.css("border-width"))*2;var l=(ai-s)-o;ah.css("width",l+"px");M=ah.outerHeight(false);K=(Z+M)-(Z+A.outerHeight(false));V=Z-(K/2)-X}else{if((s+al)>ai){s=u-Y-al-12;ah.data("arrow-reposition","right")}}}if(ab.options.arrow==true){var I="tooltipster-arrow-"+ab.options.position;if(ab.options.arrowColor.length<1){var R=ah.css("background-color")}else{var R=ab.options.arrowColor}var ak=ah.data("arrow-reposition");if(!ak){ak=""}else{if(ak=="left"){I="tooltipster-arrow-right";ak=""}else{if(ak=="right"){I="tooltipster-arrow-left";ak=""}else{ak="left:"+ak+"px;"}}}if((ab.options.position=="top")||(ab.options.position=="top-left")||(ab.options.position=="top-right")){var U=parseFloat(ah.css("border-bottom-width"));var z=ah.css("border-bottom-color")}else{if((ab.options.position=="bottom")||(ab.options.position=="bottom-left")||(ab.options.position=="bottom-right")){var U=parseFloat(ah.css("border-top-width"));var z=ah.css("border-top-color")}else{if(ab.options.position=="left"){var U=parseFloat(ah.css("border-right-width"));var z=ah.css("border-right-color")}else{if(ab.options.position=="right"){var U=parseFloat(ah.css("border-left-width"));var z=ah.css("border-left-color")}else{var U=parseFloat(ah.css("border-bottom-width"));var z=ah.css("border-bottom-color")}}}}if(U>1){U++}var E="";if(U!==0){var C="";var S="border-color: "+z+";";if(I.indexOf("bottom")!==-1){C="margin-top: -"+U+"px;"}else{if(I.indexOf("top")!==-1){C="margin-bottom: -"+U+"px;"}else{if(I.indexOf("left")!==-1){C="margin-right: -"+U+"px;"}else{if(I.indexOf("right")!==-1){C="margin-left: -"+U+"px;"}}}}E='<span class="tooltipster-arrow-border" style="'+C+" "+S+';"></span>'}ah.find(".tooltipster-arrow").remove();p='<div class="'+I+' tooltipster-arrow" style="'+ak+'">'+E+'<span style="border-color:'+R+';"></span></div>';ah.append(p)}ah.css({top:V+"px",left:s+"px"});if(y!==b){ab.options.position=y}}}};d.fn[e]=function(m){if(typeof m==="string"){var o=this;var l=arguments[1];if(o.data("plugin_tooltipster")==b){var n=o.find("*");o=d();n.each(function(){if(d(this).data("plugin_tooltipster")!==b){o.push(d(this))}})}o.each(function(){switch(m.toLowerCase()){case"show":d(this).data("plugin_tooltipster").showTooltip();break;case"hide":d(this).data("plugin_tooltipster").hideTooltip();break;case"disable":d(this).addClass("tooltipster-disable");break;case"enable":d(this).removeClass("tooltipster-disable");break;case"destroy":d(this).data("plugin_tooltipster").hideTooltip();d(this).data("plugin_tooltipster","").attr("title",o.data("tooltipsterContent")).data("tooltipsterContent","").data("plugin_tooltipster","").off("mouseenter.tooltipster mouseleave.tooltipster click.tooltipster");break;case"update":d(this).data("tooltipsterContent",l);break;case"reposition":d(this).data("plugin_tooltipster").positionTooltip();break}});return this}return this.each(function(){if(!d.data(this,"plugin_"+e)){d.data(this,"plugin_"+e,new h(this,m))}var p=d(this).data("plugin_tooltipster").options;if((p.iconDesktop==true)&&(!j())||((p.iconTouch==true)&&(j()))){var q=d(this).data("plugin_tooltipster");d(this).next().data("plugin_tooltipster",q)}})};if(j()){f.addEventListener("orientationchange",function(){if(d(".tooltipster-base").length>0){d(".tooltipster-base").each(function(){var l=d(this).data("origin");l.data("plugin_tooltipster").hideTooltip()})}},false)}d(f).on("resize.tooltipster",function(){var l=d(".tooltipster-base").data("origin");if((l!==null)&&(l!==b)){l.tooltipster("reposition")}})})(jQuery,window,document);



/**
 * author Remy Sharp
 * url http://remysharp.com/2009/01/26/element-in-view-event-plugin/
 */
(function ($) {
    function getViewportHeight() {
        var height = window.innerHeight; // Safari, Opera
        var mode = document.compatMode;

        if ( (mode || !$.support.boxModel) ) { // IE, Gecko
            height = (mode == 'CSS1Compat') ?
            document.documentElement.clientHeight : // Standards
            document.body.clientHeight; // Quirks
        }

        return height;
    }

    $(window).scroll(function () {
        var vpH = getViewportHeight(),
            scrolltop = (document.documentElement.scrollTop ?
                document.documentElement.scrollTop :
                document.body.scrollTop),
            elems = [];
        
        // naughty, but this is how it knows which elements to check for
        $.each($.cache, function () {
            if (this.events && this.events.inview) {
                elems.push(this.handle.elem);
            }
        });

        if (elems.length) {
            $(elems).each(function () {
                var $el = $(this),
                    top = $el.offset().top,
                    height = $el.height(),
                    inview = $el.data('inview') || false;

                if (scrolltop > (top + height) || scrolltop + vpH < top) {
                    if (inview) {
                        $el.data('inview', false);
                        $el.trigger('inview', [ false ]);                        
                    }
                } else if (scrolltop < (top + height)) {
                    if (!inview) {
                        $el.data('inview', true);
                        $el.trigger('inview', [ true ]);
                    }
                }
            });
        }
    });
    
    // kick the event to pick up any elements already in view.
    // note however, this only works if the plugin is included after the elements are bound to 'inview'
    $(function () {
        $(window).scroll();
    });
})(jQuery);


/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Â© 2001 Robert Penner
 * All rights reserved.
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Â© 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/
jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});


/* Credits: http://james.padolsey.com/javascript/special-scroll-events-for-jquery/ */
(function ($) {

    var special = $.event.special,
        uid1 = 'D' + (+new Date()),
        uid2 = 'D' + (+new Date() + 1);

    special.scrollstart = {
        setup: function() {

            var timer,
                handler =  function(evt) {

                    var _self = this,
                        _args = arguments;

                    if (timer) {
                        clearTimeout(timer);
                    } else {
                        evt.type = 'scrollstart';
                        $.event.handle.apply(_self, _args);
                    }

                    timer = setTimeout( function(){
                        timer = null;
                    }, special.scrollstop.latency);

                };

            $(this).bind('scroll', handler).data(uid1, handler);

        },
        teardown: function(){
            $(this).unbind( 'scroll', $(this).data(uid1) );
        }
    };

    special.scrollstop = {
        latency: 300,
        setup: function() {

            var timer,
                    handler = function(evt) {

                    var _self = this,
                        _args = arguments;

                    if (timer) {
                        clearTimeout(timer);
                    }

                    timer = setTimeout( function(){

                        timer = null;
                        evt.type = 'scrollstop';
                        $.event.dispatch.call(_self, evt);

                    }, special.scrollstop.latency);

                };

            $(this).bind('scroll', handler).data(uid2, handler);

        },
        teardown: function() {
            $(this).unbind( 'scroll', $(this).data(uid2) );
        }
    }

})( jQuery );
