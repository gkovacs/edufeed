(function(){
  var fs, async, yamlfile, couchdb_url, ref$, getLogAnalysisResultsAsString, getLogAnalysisResults, nano, main;
  fs = require('fs');
  async = require('async');
  yamlfile = require('yamlfile');
  couchdb_url = require('../couchdb_utils').couchdb_url;
  ref$ = require('../www/log-analysis'), getLogAnalysisResultsAsString = ref$.getLogAnalysisResultsAsString, getLogAnalysisResults = ref$.getLogAnalysisResults;
  nano = require('nano')(couchdb_url);
  main = function(){
    var username, allusers, allusers_set, all_classes, classname, classinfo, i$, ref$, len$;
    username = process.argv[2];
    if (!fs.existsSync('www')) {
      console.log('you need to run this script from the edufeed directory');
      return;
    }
    allusers = [];
    allusers_set = {};
    all_classes = yamlfile.readFileSync('www/classes.yaml');
    for (classname in all_classes) {
      classinfo = all_classes[classname];
      if (classinfo.users == null) {
        continue;
      }
      for (i$ = 0, len$ = (ref$ = classinfo.users).length; i$ < len$; ++i$) {
        username = ref$[i$];
        if (allusers_set[username] == null) {
          allusers_set[username] = true;
          allusers.push(username);
        }
      }
    }
    return async.mapSeries(allusers, function(username, callback){
      var logsdb;
      console.log("fetching logs for " + username);
      logsdb = nano.use("logs_" + username);
      return logsdb.list({
        include_docs: true
      }, function(err, results){
        var logs, res$, i$, ref$, len$, x;
        if (err != null) {
          callback(null, {
            username: username,
            logs: []
          });
          return;
        }
        res$ = [];
        for (i$ = 0, len$ = (ref$ = results.rows).length; i$ < len$; ++i$) {
          x = ref$[i$];
          res$.push(x.doc);
        }
        logs = res$;
        return callback(null, {
          username: username,
          logs: logs
        });
      });
    }, function(all_errors, all_results){
      var output, username_to_logs, i$, len$, ref$, username, logs, all_logs, classname, classinfo, class_logs, ref1$;
      output = {
        users: {},
        classes: {},
        aggregate: {}
      };
      username_to_logs = {};
      for (i$ = 0, len$ = all_results.length; i$ < len$; ++i$) {
        ref$ = all_results[i$], username = ref$.username, logs = ref$.logs;
        username_to_logs[username] = logs;
      }
      for (i$ = 0, len$ = all_results.length; i$ < len$; ++i$) {
        ref$ = all_results[i$], username = ref$.username, logs = ref$.logs;
        output.users[username] = getLogAnalysisResults(logs);
      }
      all_logs = [];
      for (i$ = 0, len$ = all_results.length; i$ < len$; ++i$) {
        logs = all_results[i$].logs;
        all_logs = all_logs.concat(logs);
      }
      output.aggregate = getLogAnalysisResults(all_logs);
      for (classname in ref$ = all_classes) {
        classinfo = ref$[classname];
        if (classinfo.users == null) {
          continue;
        }
        class_logs = [];
        for (i$ = 0, len$ = (ref1$ = classinfo.users).length; i$ < len$; ++i$) {
          username = ref1$[i$];
          class_logs = class_logs.concat(username_to_logs[username]);
        }
        output.classes[classname] = getLogAnalysisResults(class_logs);
      }
      return console.log(JSON.stringify(output, null, 2));
    });
  };
  main();
}).call(this);
