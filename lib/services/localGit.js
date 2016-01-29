var spawnSync = require('child_process').spawnSync || require('spawn-sync'),
    status = spawnSync('git', ['config', '--get', 'remote.origin.url']),
    branch = spawnSync('git', ['rev-parse', '--abbrev-ref', 'HEAD']),
    sha    = spawnSync('git', ['rev-parse', '--verify', 'HEAD']),
    tag    = spawnSync('git', ['describe']),
    commitAuthor = spawnSync('git', ['log', '-1', '--format=%an']),
    commitMsg    = spawnSync('git', ['log', '-1', '--format=%s']),
    commitDate   = spawnSync('git', ['log', '-1', '--format=%ci']);

function clean(str) {
  return String(str).replace(/\n/,'');
}

module.exports = {

  detect: function(env) {
    return (status.status === 0) ? true : false;
  },

  configuration: function(env) {
    if (!env) {
      env = process.env;
    }

    var UNKNOWN_MSG = "(unknown)";

    var shaStdout    = clean(sha.stdout);
    var branchStdout = clean(branch.stdout);
    var tagStdout    = clean(tag.stdout);
    var authorStdout = clean(commitAuthor.stdout);
    var msgStdout    = clean(commitMsg.stdout);
    var dateStdout   = clean(commitDate.stdout);

    return {
      sha: (sha.status === 0) ? shaStdout : UNKNOWN_MSG,
      tag: (tag.status === 0) ? tagStdout : UNKNOWN_MSG,
      branch: (branch.status === 0) ? branchStdout : UNKNOWN_MSG,
      msg: (commitMsg.status === 0) ? msgStdout : UNKNOWN_MSG,
      author: (commitAuthor.status === 0) ? authorStdout : UNKNOWN_MSG,
      date: (commitDate.status === 0) ? dateStdout : UNKNOWN_MSG
    };
  }

};
