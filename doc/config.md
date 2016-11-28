# Config

The `/config` folder has the build configurations. The naming convention is the `{build-tool}.{env}.js`, eg `webpack.unit.js`. The webpack configs merge with the `webpack.base.js` to reduce duplication.

## Environment Variables

Sometimes it is practical to have different config values according to the environment that the application is running in. You can edit these in the appropriate webpack config file.

### Usage

It is simple to use the environment variables to your code. See [how to target code to an environment](./targeting-code.md).
