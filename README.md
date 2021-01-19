<p align="center">
 <p>
  <a href="https://yamitec.com"><img src="static/icons/icon.png" width="256"></a>
</p>

<div align="center">
  <h1>Laiza</h1>

Laiza is an extensible and privacy-focused web browser with a totally different user experience, built on top of `Electron` and `React`. It aims to be fast, private, beautiful, extensible and functional.

on linux use snippet to build code
```bash
$ sysctl kernel.unprivileged_userns_clone=1
```
</div>

# Features

- **Laiza Shield** - Browse the web without any ads and don't let websites to track you. Thanks to the Laiza Shield powered by [Cliqz](https://github.com/cliqz-oss/adblocker), websites can load even 8 times faster!
- **Chromium without Google services and low resources usage** - Since Laiza uses Electron under the hood which is based on only several and the most important Chromium components, it's not bloated with redundant Google tracking services and others.
- **Beautiful and modern UI**
- **Fast and fluent UI** - The animations are really smooth and their timings are perfectly balanced.
- **Highly customizable new tab page** - Customize almost an every aspect of the new tab page!
- **Customizable browser UI** - Choose whether Laiza should have compact or normal UI.
- **Tab groups** - Easily group tabs, so it's hard to get lost.
- **Scrollable tabs**
- **Partial support for Chrome extensions** - Install some extensions directly from Chrome Web Store\

# Contributing

If you have found any bugs or just want to see some new features in Laiza, feel free to open an issue. We're open to any suggestions. Bug reports would be really helpful for us and appreciated very much. Laiza is in heavy development and some bugs may occur. Also, please don't hesitate to open a pull request. This is really important to us and for the further development of this project.

## Running

Before running Laiza, please ensure you have **latest** [`Node.js`](https://nodejs.org/en/) and [`Yarn`](https://classic.yarnpkg.com/en/docs/install/#windows-stable) installed on your machine.

When running on Windows, make sure you have build tools installed. You can install them by running this command as **administrator**:

```bash
$ npm i -g windows-build-tools
```

Firstly, run this command to install all needed dependencies. If you have encountered any problems, please report it.

```bash
$ yarn
```

After a successful installation, the native modules need to be rebuilt using Electron headers. To do this, run:

```bash
$ npm run rebuild
```

The given command below will run Laiza in the development mode.

```bash
$ npm run dev
```

# Documentation

Guides and the API reference are located in [`docs`](docs) directory.

# License

For commercial or proprietary purposes, please contact me on sentialx@gmail.com

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FLaiza%2FLaiza.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FLaiza%2FLaiza?ref=badge_large)
