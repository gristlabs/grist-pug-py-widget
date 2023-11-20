# Grist Pug / Python Widget

Grist widget to directly develop custom widgets within Grist’s UI.

# Making changes

Dependencies:

- [Transcrypt](https://www.transcrypt.org/)
- [pug-cli](https://github.com/pugjs/pug-cli)

Building the Dockerfile within docker/ (`docker build -t pug_py docker`)
will make development environment ready: `docker run -it -v $PWD:/src pug_py`.

Once changes are made to `index.pug` and `api.py`, run `./build.sh`.


# License

All material in `lib` is third-party, under respective licenses.
