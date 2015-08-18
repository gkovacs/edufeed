(function(){
  var fs, async, ref$, exec, which, is_couchdb_running, does_user_exist, couchdb_server, i$, len$, command;
  fs = require('fs');
  async = require('async');
  ref$ = require('shelljs'), exec = ref$.exec, which = ref$.which;
  ref$ = require('./couchdb_utils'), is_couchdb_running = ref$.is_couchdb_running, does_user_exist = ref$.does_user_exist, couchdb_server = ref$.couchdb_server;
  if (!fs.existsSync('config.json')) {
    fs.writeFileSync('config.json', JSON.stringify({
      couchdb: {
        database_dir: 'couchdata'
      },
      log: {
        file: 'couchdb_log.txt'
      }
    }));
  }
  for (i$ = 0, len$ = (ref$ = ['pouchdb-server', 'gulp', 'node-dev']).length; i$ < len$; ++i$) {
    command = ref$[i$];
    if (!which(command)) {
      console.log("missing " + command + " command");
      process.exit();
    }
  }
  exec('gulp', {
    async: true
  });
  is_couchdb_running(function(running){
    if (running) {
      console.log('using already-running couchdb instance at ' + couchdb_server);
    } else {
      exec('pouchdb-server', {
        async: true
      });
    }
    exec('node scripts/create_users');
    return exec('node-dev app.ls', {
      async: true
    });
  });
}).call(this);
