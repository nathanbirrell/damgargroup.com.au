Site built for damgargroup.com.au. Hosted on [Github Pages](https://pages.github.com/) and built with [gulpjs](https://gulpjs.com/).

**NOTE:** Don't merge to master on this build, it is handled in the `deploy` task.

## Usage

Run locally for dev:

1. `npm install`
1. `bundle install`
1. `brew install imagemagick@6 && brew link imagemagick@6 --force`
1. `gulp`

## Deploy

`gulp deploy`

## Troubleshooting

* `brew reinstall imagemagick@6`
* `brew unlink imagemagick@6 && brew link imagemagick@6 --force`
* `gem pristine rmagick`