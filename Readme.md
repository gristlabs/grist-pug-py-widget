# Grist Pug / Python Widget

Grist widget to directly develop custom widgets within Grist’s UI.

# Usage

Within a Grist document, create a custom widget with url pointing to
`index.html`. For example:
https://jperon.github.io/grist/grist-pug-py-widget2/

Then edit the `cfg` and other parts.

Then click on `Preview`, then `Install`. Once installed, the code
may be edited again by clicking on `Open configuration` in the widget's
top-right menu.

# Making a new "standalone" widget

This repository may be used as a template to create a new Grist custom widget.
After defining it as explained above, you might save the result within files
(for example below `/widget`), adapt `config.toml`, run `./build.sh`
and push it to a new repository.

# Credits

@berhalak for his [fiddle widget](https://github.com/berhalak/my-widgets/tree/main/fiddle), that was the basis of this one.

@jperon for adaptation to pug and python.

# License

cf. [LICENSE](./LICENSE)

All material in `lib` is third-party, under respective licenses.
