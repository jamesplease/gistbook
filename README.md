# Gistbook [![Travis build status](http://img.shields.io/travis/jmeas/gistbook.svg?style=flat)](https://travis-ci.org/jmeas/gistbook)

This is the development repository for [Gistbook.io](https://gistbook.io/).

### Contributing

Right now it is not possible to run Gistbook locally unless you have its Github App secret. This is
[a known issue](https://github.com/jmeas/gistbook/issues/169) that I'm working on resolving.

### Installation

Clone this repository.

```sh
git clone https://github.com/jmeas/gistbook.git
```

Navigate into the root directory of the project and install the dependencies.

```sh
cd gistbook && bower install && npm install
```

### Deploying

#### To Staging

Run the `npm run deploy-staging` command from the root directory of the project.

#### To Production

Execute the `npm run deploy` command from the root directory of the project.
