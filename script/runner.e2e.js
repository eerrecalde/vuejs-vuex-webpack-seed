const spawn = require('cross-spawn');
const SauceTunnel = require('sauce-tunnel');

// If no E2E_ENV environment variable launch server
if (!process.env.E2E_ENV) {
  /* eslint global-require: 0 */
  require('../server/index.js');
}

// If SAUCE_USER and SAUCE_KEY envioment variables exist launch with saucelabs
// else launch nightwatch in standard instance
if (process.env.SAUCE_USER && process.env.SAUCE_KEY) {
  spawnSauceTunnel();
} else {
  spawnNightwatch();
}

/**
 * Spawn SauceTunnel and Nightwatch.js tests
 * @returns {Void} Does not return value
 */
function spawnSauceTunnel() {
  // Instantiate a new SauceTunnel with configuration details
  const tunnel = new SauceTunnel(
    process.env.SAUCE_USER,
    process.env.SAUCE_KEY,
    process.env.SAUCE_IDENTIFIER || 'SAUCE_TUNNEL'
  );

  // Start sauce tunnel
  tunnel.start(status => {
    // If no status then throw error
    if (status === false) {
      throw new Error('Something went wrong with the sauce labs tunnel');
    }
    // If correctly started spawn Nightwatch.js tests
    spawnNightwatch(tunnel);
  });
}

/**
 * Spawn Nightwatch.js tests
 * @param {sauceTunnel} [tunnel] SauceTunnel instance
 * @returns {Void} Does not return value
 */
function spawnNightwatch(tunnel) {
  // Get nightwatch config variables
  let options = process.argv.slice(2);
  options = options.concat(['--config', './config/nightwatch.e2e.js']);
  // spawn nightwatch with options
  const runner = spawn('./node_modules/.bin/nightwatch', options, { stdio: 'inherit' });

  // On exit close down tunnel and self if exists
  runner.on('exit', code => {
    if (!tunnel) {
      process.exit(code);
    }
    tunnel.stop(() => {
      process.exit(code);
    });
  });

  // On error close down tunnel if exists
  runner.on('error', error => {
    if (!tunnel) {
      throw error;
    }
    tunnel.stop(() => {
      throw error;
    });
  });
}
