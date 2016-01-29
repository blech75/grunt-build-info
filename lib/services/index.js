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
  var config = {};

  for (var name in services) {
    // console.log('Detecting ' + name + '...');
    if (services[name].detect()) {
      config[name] = services[name].configuration();
    }
  }

  if (Object.keys(config).length < 1) {
    throw new Error("Could not detect any services.");
  }

  return config;
};
