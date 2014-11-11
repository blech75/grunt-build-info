var spawnSync = require('child_process').spawnSync || require('spawn-sync');
    spawn = require('child_process').spawn,
    status = spawnSync('git', ['config', '--get', 'remote.origin.url']),
    branch = spawnSync('git', ['rev-parse', '--abbrev-ref', 'HEAD']),
    commit = spawnSync('git', ['rev-parse', '--verify', 'HEAD']);
function clean(str){
  return String(str).replace(/\n/,'');


}
module.exports = {

  detect : function(env){
    return (status.status===0)?true:false;
  },

  configuration : function(env){
    if (!env) env = process.env;
    return {
      service : 'git',
      buildId :  (commit.status===0)?clean(commit.stdout):'unknown',
      commitId : (commit.status===0)?clean(commit.stdout):'unknown',
      build : (commit.status===0)?clean(commit.stdout):'unknown',
      branch : (branch.status===0)?clean(branch.stdout):'unknown'
    };
  }
};


