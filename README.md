# Buildly Angular Template
Buildly Angular Template is a [Angular](https://angularjs.org/) web application that implements the core features of the UI core, pre-configure to connect to [Buildly Core](https://github.com/buildlyio/buildly-core).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

The web application was tested and built with the following versions: 

- node
- npm
- gulp-cli

### Installing

First of all, you need to have a Buildly Core instance up and running locally.
Further detail about how to deploy Buildly Core locally, check its [documentation](https://buildly-core.readthedocs.io/en/latest/).

To install the application you need to download and install its dependencies, so you have to navigate to the project folder and run the following command:

```
$ npm install --save-dev
```

Now, initialize and build the project

```
$ npm run init
$ ng build
```

To run the web app:

```
$ ng serve
```

your Buildly Angular Template will be running locally and listening to the port 4200, so you can access it via your browser typing this address: 127.0.0.1:4200

## Running the tests

To **run unit tests** using [Karma](https://karma-runner.github.io/): 

```
$ ng test
```

To **run end-to-end tests** using [Protractor](http://www.protractortest.org/): 

```
$ ng e2e
```

## Deployment

To deploy Buildly Angular Template on live, you can either use our [Buildly Angular Template Docker image](https://hub.docker.com/r/buildly/buildly-angular-template) from Docker Hub or build your own image and host it somewhere, so it can be used with your deployment platform and/or tool.

### Build Docker image

First you need to have the web app dependencies installed and the app initialized locally.
And then you need to build it as a production application executing the following command:

```
$ npm run build-prod
```

Now, you just need to build a Docker image and host it somewhere. Further info about how to build images, check Docker's [documentation](https://docs.docker.com/).

### Configuration

The following table lists the configurable parameters of Buildly React Template and their default values.

|             Parameter               |            Description             |                    Default                |
|-------------------------------------|------------------------------------|-------------------------------------------|
| `API_URL`                           | Buildly Core URL                   | ``      |
| `OAUTH_CLIENT_ID`                   | The client identifier issued to the client during Buildly Core deployment  | `` |
| `OAUTH_TOKEN_URL`                   | Buildly Core URL used to authenticate users | `` |

Specify each parameter using `-e`, `--env`, and `--env-file` flags to set simple (non-array) environment variables to `docker run`. For example,

```bash
$ docker run -e MYVAR1 --env MYVAR2=foo \
    --env-file ./env.list \
    buildly/buildly-angular-template
```

## Built With

* [Travis CI](https://travis-ci.org/) - Recommended CI/CD

## Contributing

Please read [CONTRIBUTING.md](https://github.com/buildlyio/docs/blob/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/buildlyio/buildly-angular-template/tags). 

## Authors

* **Buildly** - *Initial work*

See also the list of [contributors](https://github.com/buildlyio/buildly-angular-template/graphs/contributors) who participated in this project.

## License

This project is licensed under the GPL v3 License - see the [LICENSE](LICENSE) file for details
