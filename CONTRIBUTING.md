# Contribution Guide

We welcome and encourage community contributions to help improving ReactPage!

Please familiarize yourself with the Contribution Guidelines and Project Roadmap before contributing.

There are many ways to help ReactPage besides contributing code:

 - Use it! 
 - Fix bugs or file issues
 - Improve the documentation
 - Participate in [Discussions](https://github.com/react-page/react-page/discussions)
 - Spread the word about ReactPage!

## Contributing Code

We want to keep the barrier to contribute as low as possible, but we still recommend to follow some rules:

- Feel free to open Pull Requests that fix open issues!
- File an issue before opening a Pull Request about a new feature, so that discussion about the feature can take place. 
- Try to keep your commits clean and rebase them before merging.
-  All contributions are made via pull request. Note that **all patches from all contributors get reviewed**. After a pull
request is made other contributors will offer feedback, and if the patch passes review a maintainer will accept it with
a comment. When pull requests fail testing, authors are expected to update their pull requests to address the failures
until the tests pass and the pull request merges successfully.
At least one review from a maintainer is required for all patches (even patches from maintainers).
Reviewers should leave a "LGTM" comment once they are satisfied with the patch. If the patch was submitted by a maintainer
with write access, the pull request should be merged by the submitter after review.
- Commit messages have to be [semantic and following this convention](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines):

#### Features

`feat(scope): describe the new feature`

e.g. 

`feat(ui): added button to duplicate content`

(scope is optional).

`feat:` will bump the minor version

#### Bugfixes

`fix(scope): the issue that was fixed`

e.g.

`fix(ie11): on ie11 an error is thrown`

(scope again is optional)

`fix:` will bump the patch version

#### BREAKING CHANGES


if your feature or fix contain a breaking change, its important to format the commit message as this:

```
feat(layout): its possible to customize rows

BREAKING CHANGE: the classNames xxx-yyyyy have been replace with zzzzz

```

(mind the newline between the first line and third line)

`BREAKING CHANGE:` will bump the major version (once we are at ^1.0.0)



## How to run, develop, and contribute

Do you want to run, develop or contribute to ReactPage? For that you need [Node](https://nodejs.org) installed on
your system. Use git to check out this repository as followed.

```bash
$ git clone https://github.com/react-page/react-page.git
$ cd react-page
```

### Install dependencies

ReactPage is a [monorepo](https://github.com/babel/babel/blob/master/doc/design/monorepo.md) that you initialize with:

```bash
$ yarn
$ yarn bootstrap
```

we use [yarn](https://yarnpkg.com/lang/en/), but npm should work as well.

### Run the example(s)

Here are some [examples](examples/) that are a good starting point if you want to familiarize yourself with the editor.
To run the examples, use one of the following commands:

```
$ yarn start
```

### Run the toolchain

The tool chain contains tests and tslint. It is highly recommended to run this while developing.

```bash
# run the tests in watch mode
$ yarn run test:watch

# run tslint in watch mode
$ yarn run lint:watch
```

### Run the documentation

To run the guide in watch mode, do:

```bash
$ yarn run docs:guide
```

To generate API docs, run:

```bash
$ yarn run docs:api
```

### Recommended tools

Feel free to use whatever works for you, these works for us. Especially care about using "prettier" when writing code as it will avoid merge conflicts on code style.

IDE: vscode
Vscode extensions: prettier, tslint, code spell checker, beautify css/sass/scss/less

## Known issues

### Types resolution error

In case you change a lot of files, especially in core or UI, you might end up seeing old versions of these files when working on plugins. To fix this, run

```
$ yarn run build:lib
```

Which builds the library code. If this doesn't help (and you're in vscode), make sure to reload window (CTRL+SHIFT+P -> Reload Window). That forces vscode to reinitialize typescript declaration files.

### Other issues

Known issues are tracked in the [issues tab](https://github.com/react-page/react-page/issues?q=is%3Aissue+is%3Aopen+label%3Abug).
