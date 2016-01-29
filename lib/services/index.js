var services = {
  'travis'    : require('./travis'),
  'circle'    : require('./circle'),
  'codeship'  : require('./codeship'),
  'drone'     : require('./drone'),
  'jenkins'   : require('./jenkins'),
  'semaphore' : require('./semaphore'),
  'git'       : require('./localGit'),
};

module.exports = function() {
  var config=null;
  for (var name in services) {
    if (services[name].detect()) {
      config = services[name].configuration();
      break;
    }
  }
  if (!config){
    throw new Error("unknown service.  could not get configuration");
  }
  var token = (process.env.codecov_token || process.env.CODECOV_TOKEN);
  if (token){
    config.token = token;
  }
  return config;
};

