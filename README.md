
# Tracker

A simple workout tracker to keep track of your progress over time.


## Features

- Manage workouts (exercises, sets, reps)
- Get weight suggestions based on previous workouts
- Show progression over time
- Mobile friendly design
- Light/dark mode support
- Option to export data


## Tech Stack

**Client:** React, React Router, TailwindCSS

<!-- **Server:** Java, Maven, Spring Boot -->


## Prerequisites

- [Node.js and npm](https://nodejs.org/) installed
- [Git](https://git-scm.com/) or [GitHub Desktop](https://desktop.github.com/) installed

## Run Locally

### Setup

Clone the project using GitHub Desktop or the command line

```bash
  git clone https://github.com/stijnapp/tracker.git
```

Go to the project directory

```bash
  cd tracker
```

Install dependencies

```bash
  npm install
```

### Run

Start the development server

```bash
  npm run dev
```


<!-- ## Running Tests

To run tests, run the following command

```bash
  npm run test
``` -->


## Deployment

The deployment is automated using GitHub Actions. The workflow file can be found at [`.github/workflows/deployment.yml`](.github/workflows/deployment.yml).


Any push or pull request to the `main` branch will trigger the deployment. The live version can be found at [stijnapp.github.io/tracker](https://stijnapp.github.io/tracker/).
