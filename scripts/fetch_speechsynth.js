// Generated by LiveScript 1.4.0
(function(){
  var fs, request, querystring, async, ref$, exit_if_error, exit_with_error, log_success, lang, download_audio, main, slice$ = [].slice;
  fs = require('fs');
  request = require('request');
  querystring = require('querystring');
  async = require('async');
  ref$ = require('logutils'), exit_if_error = ref$.exit_if_error, exit_with_error = ref$.exit_with_error, log_success = ref$.log_success;
  lang = 'en';
  download_audio = function(query, callback){
    var url;
    url = 'http://speechsynth.herokuapp.com/speechsynth?' + querystring.stringify({
      word: query,
      lang: lang
    });
    return request({
      url: url,
      encoding: null
    }, function(err2, res2, data){
      var content_type, content_type_to_extension, extension, outfile;
      exit_if_error(err2);
      content_type = res2.headers['content-type'];
      content_type_to_extension = {
        'audio/mpeg': 'mp3'
      };
      extension = content_type_to_extension[content_type];
      if (extension == null) {
        exit_with_error({
          message: 'unexpected content type',
          'content-type': content_type,
          'url': url
        });
      }
      outfile = "www/speechsynth_en/" + query + "." + extension;
      fs.writeFileSync(outfile, data);
      log_success(outfile);
      return callback(null, outfile);
    });
  };
  main = function(){
    var queries;
    queries = slice$.call(process.argv, 2);
    if (queries.length === 0) {
      exit_with_error('please provide a term to synthesize as the argument');
    }
    if (!fs.existsSync("www/speechsynth_" + lang)) {
      exit_with_error('directory www/speechsynth_#{lang} does not exist, please run this script from the root of the edufeed directory');
    }
    return async.map(queries, download_audio, function(err, results){
      return process.exit();
    });
  };
  main();
}).call(this);
