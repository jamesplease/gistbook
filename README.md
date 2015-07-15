# Gistbook [![Travis build status](http://img.shields.io/travis/jmeas/gistbook.svg?style=flat)](https://travis-ci.org/jmeas/gistbook)

This is the development repository for Gistbook, a web application that is no longer hosted.

### Installation

Clone this repository.

```sh
git clone https://github.com/jmeas/gistbook.git
```

Navigate into the root directory of the project and install the dependencies.

```sh
cd gistbook && npm install
```

### Developing locally

If this is your first time setting up Gistbook locally, run `sudo npm run configure-hosts-local`.

Next, create a personal access token for your Github account. You can generate one from
your [Settings page](https://github.com/settings/applications). Make sure that it has `user` and `gist` access,
otherwise it won't work. Copy the token down and place it in a file `config/personal-access-token.json`. There's
an example file in the directory that shows you the format.

To build and start the development version of the app, run `grunt work -f`.

Once the app is built, you can access it at `http://gistbook.loc:3344`.

_**Note:** Logging in through Github will only work on port 3344._

### Deploying

Gistbook is deployed to AWS using Ansible. Install it via:

- All platforms: `pip install ansible` via [pip](http://pip.readthedocs.org/en/latest/installing.html)
- OSX: `brew install ansible` via [homebrew](http://brew.sh/)
- Linux: `apt-get/yum install ansible`

Next, run `npm run get-secrets` if you haven't already. You'll only need to do this once.

#### To Staging

Run the `npm run deploy-staging` command from the root directory of the project.

#### To Production

Execute the `npm run deploy` command from the root directory of the project. Tag a new release
on Github with the new version number.
