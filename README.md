# Express Google OAuth Login Example

This is an example application that demonstrates Google OAuth login using Express.js and Passport.js.

## Prerequisites

Before running this application, make sure you have the following:

- Node.js installed on your machine
- Google OAuth credentials (Client ID and Client Secret)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/your-repo.git
```
2.Install the dependencies:

```
cd your-repo
npm install
```

3.Create a .env file in the project root directory and add your session secret, Google Client ID, and Client Secret:
```
SESSIONSECRET=your-session-secret
ID=your-google-client-id
SECRET=your-google-client-secret
```

4.Start the application
```
nodemon index.js
```

#Usage
* Click on the "Login with Google" button to initiate the Google OAuth process.
* After successful authentication, you will be redirected to the dashboard page.
* If you are not logged in, you will be redirected to the login page.

#License
```
Make sure to replace `your-username` and `your-repo` with your GitHub username and repository name, respectively.
```
