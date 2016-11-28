import SauceTunnel from 'sauce-tunnel';
import spawn from 'cross-spawn';
import path from '../config/path';

let opts = process.argv.slice(2);
opts.unshift(path.nodeModules.nightwatch);
opts = opts.concat(['--config', './config/test/nightwatch.js']);

const tunnel = new SauceTunnel(
  process.env.SAUCE_USER,
  process.env.SAUCE_KEY,
  process.env.SAUCE_IDENTIFIER || 'SAUCE_TUNNEL'
);

tunnel.start(status => {
  if (status === false) {
    throw new Error('Something went wrong with the sauce labs tunnel');
  }
  const runner = spawn(path.nodeModules.babelNode, opts, { stdio: 'inherit', env: process.env });

  runner.on('exit', code => {
    tunnel.stop(() => {
      process.exit(code);
    });
  });

  runner.on('error', error => {
    tunnel.stop(() => {
      throw new Error(error);
    });
  });
});
