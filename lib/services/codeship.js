module.exports = {

  detect: function(env) {
    if (!env) {
      env = process.env;
    }

    return (env.CI_NAME && env.CI_NAME === 'codeship');
  },

  configuration: function(env) {
    if (!env) {
      env = process.env;
    }

    // see https://codeship.com/documentation/continuous-integration/set-environment-variables/#default-environment-variables
    return {
      buildId: env.CI_BUILD_NUMBER,
      commitId: env.CI_COMMIT_ID, // should match what git reports
      buildUrl: env.CI_BUILD_URL,
      branch: env.CI_BRANCH,
      pullRequest: env.CI_PULL_REQUEST,
      buildDateTime: new Date().toISOString()
    };
  }

};
