define(['share/jquery', "share/open_ajax"], function($, open_ajax){
  return {
    set: function(theme){
      // themes are defined by if they have a title, pre-loaded theme is the only one without alternate set in rel
      $('link[rel*="stylesheet"][title]').attr('disabled', true);
      $('link[rel*="stylesheet"][title="'+ theme +'"]').removeAttr('disabled');
      open_ajax.publish('core.theme.changed', theme);
      console.log('theme changed', theme);
    }
  };
});