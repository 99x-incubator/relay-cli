# relay-cli

CLI for Relay.js

## Install

```
npm install -g relay-cli
```

## Quick start

Quickest way to get started with relay-cli

```
$ relay init awesome-project
$ cd awesome-project
$ relay g component dashboard index
$ relay v -c
$ relay g container dashboard index
$ relay v -d
$ relay g route dashboard index
$ relay v -r
```

## Usage


# Usage

### relay init [name]
*alias: i*

#### name

Project name.

---------------------------------------

### relay generate component [module] [component]
*alias: g*

#### module

Module name where the react component should be placed within. (Subdirectory within components directory)

#### component

React component name.

---------------------------------------

### relay generate container [module] [component]
*alias: g*

#### module

Module name where the Relay container should be placed within. (Subdirectory within components directory)

#### container

Relay container name.

---------------------------------------

### relay generate route [module] [component]
*alias: g*

#### module

Module name where the Relay route should be placed within. (Subdirectory within components directory)

#### container

Relay container name.

---------------------------------------

### relay generate route [module] [component]
*alias: g*

#### module

Module name where the Relay route should be placed within. (Subdirectory within components directory)

#### container

Relay route name.

---------------------------------------

## Configuring existing projects

To use realy-cli in existing React project navigate to directory where React components are created.
Create realy-cli configuration file, `.relayclirc`. Add configuration in key value pairs.

```
{
	"client": "js" 
}
```

Example: This specifies that React components are placed in `js/components` directory.

## Contributor guidelines

- Fork the repository.
- Clone the forked repository.
- Create your own branch.
- Create tests and make sure tests pass on travis.
- Create a pull request with changes made.

## Features

- Generate Relay projects
- Generate customizable React components
- Create containers, routes
- Configurable for existing Relay projects

## License

MIT © [99XT](https://github.com/99xt)