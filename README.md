# Ithaca Sakai Skin

Inspired by:

* [Duke Sakai Skins](https://github.com/DukeLearningInnovation/duke-sakai-skins)
* [Sakai Morpheus](https://github.com/sakaiproject/sakai/tree/master/library)

## Work in progress

### Known issues

* [x] Icons not working
* [ ] Spacing on breadcrumbs
* [ ] IE stylesheet build (anything else from maven build?)
* [x] Colors / consistency
* [ ] Design review
* [x] Script to package up theme files

### How to use

**To get started,** install [Yarn](https://yarnpkg.com/en/) and run

```bash
yarn install
```

**To run local browser-sync for local development:**


```bash
yarn browsersync
```

**To run Chrome for development using the test instance:**

```bash
yarn devtools
```

then, in Chrome, go to [the test site](https://ithaca-test.longsight.com), open developer tools,
and in the Sources tab, set up the devtools directory as an override workspace. 
[More on Local Overrides](https://developers.google.com/web/updates/2018/01/devtools#overrides).

**To generate theme for distribution:**

```bash
yarn dist
```

Files will be placed into the `dist` directory.
