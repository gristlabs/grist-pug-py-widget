# Grist Pug / Python Widget

Grist widget to directly develop custom widgets within Grist’s UI.

# Usage

Within a Grist document, create a custom widget with url pointing to
`index.html`. For example:
https://jperon.github.io/grist/Grist-pug-py-widget/

Then edit the `PUG` and the `PY` parts. The `render_pug` function is
available to `PY`, and will render the `PUG` part with the variables
passed as arguments in a key/value object, for example:

```py
from browser import window
grist, render_pug = window.grist, window.render_pug

def onRecord(rec, *args):
  render_pug({{"rec": rec}})

grist.onRecord(onRecord)
```

Then click on `Preview`, then `Install`. Once installed, the code
may be edited again by clicking on `Open configuration` in the widget's
top-right menu.

# Making changes

Dependencies:

- [Transcrypt](https://www.transcrypt.org/)
- [pug-cli](https://github.com/pugjs/pug-cli)

Building the Dockerfile within docker/ (`docker build -t pug_py docker`)
will make development environment ready: `docker run -it -v $PWD:/src pug_py`.

Once changes are made to `index.pug` and `api.py`, run `./build.sh`.


# License

All material in `lib` is third-party, under respective licenses.
