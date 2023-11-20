FROM python:3.9-alpine

RUN pip install transcrypt && \
    apk update && apk add --no-cache yarn && \
    yarn global add pug-cli && \
    mkdir /src

WORKDIR /src

VOLUME /src

ENTRYPOINT sh
