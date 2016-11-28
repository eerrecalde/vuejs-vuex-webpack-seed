# Dependency Controls

The chosen ranging with npm is *Fixed versions*. To give you more control over dependencies, to ensure breaking changes are less likely to cause difficulties without awareness of dependency update. (This is due to semver not always being adhered).

For example the package JSON versions should look like `1.0.4`.

> Please also use `npm shrinkwrap --dev` to lock in dependencies.

You can use tools like `npm-check-updates` to help you check dependencies going out of date, this will encourage you to update often with control.


For further reference: https://medium.com/@kentcdodds/why-semver-ranges-are-literally-the-worst-817cdcb09277#.s1m1sif4a
