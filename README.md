# Pizzabot Coding Challenge

## Getting Started

## Prerequisites

Requires [Node](https://nodejs.org/) 6+ to be installed on your computer.

## Setup

Install project dependencies by running the following command from the project root:

```bash
npm install
```


## Running the project

from the command line you can do one of the following 2 things:

1. pass pizzabot's data directly to the program as a cli argument
    - note: that it only takes 1 argument that must be surrounded by quotes, like in the example
```bash
./pizzabot "5x5 (2,3) (5,5)"
```

2. run the program without arguments and it will prompt you for the data
```bash
./pizzabot
```

**Results will always end in a newline**

Notice that you do not need to invoke `node` before the program to run it. The file is chmodded to be executable and includes a hash-bang which tells the terminal what program to run it with.


## Running the tests

Unit testing is handled by Mocha. To run automated tests just run the following command:

```bash
npm test
```
