(function(){
  var custom_images, get_image_paths, get_profilepic_paths, get_speechsynth_paths, out$ = typeof exports != 'undefined' && exports || this;
  custom_images = {};
  out$.get_image_paths = get_image_paths = function(callback){
    if (custom_images.image_paths != null) {
      callback(custom_images.image_paths);
      return;
    }
    return $.get('/image_paths.yaml', function(yamltxt){
      var data;
      data = jsyaml.safeLoad(yamltxt);
      custom_images.image_paths = data;
      return callback(data);
    });
  };
  out$.get_profilepic_paths = get_profilepic_paths = function(callback){
    if (custom_images.profilepic_paths != null) {
      callback(custom_images.profilepic_paths);
      return;
    }
    return $.get('/profilepic_paths.yaml', function(yamltxt){
      var data;
      data = jsyaml.safeLoad(yamltxt);
      custom_images.profilepic_paths = data;
      return callback(data);
    });
  };
  out$.get_speechsynth_paths = get_speechsynth_paths = function(callback){
    if (custom_images.speechsynth_paths != null) {
      callback(custom_images.speechsynth_paths);
      return;
    }
    return $.get('/speechsynth_en_paths.yaml', function(yamltxt){
      var data;
      data = jsyaml.safeLoad(yamltxt);
      custom_images.speechsynth_paths = data;
      return callback(data);
    });
  };
}).call(this);
