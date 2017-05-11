# SexyGeoHatters
### To Push Anything
Due to the build limit (100 builds) for codeship, make sure that you use `git commit -m "My message --ci-skip" `
whenever you push. 
whenever you push.

### To CLONE from a specific branch
Use `git clone -b <branch> <remote_repo>` to pull from a specific branch. 
Eg. `git clone -b dev https://github.com/lawchihon/SexyGeoHatters.git`, if you want to pull from branch `dev` 

### To RUN the project
1. Git clone the project 
2. Run `npm install` inside the project folder 
3. Run `npm start` to host the server 
4. Go to the browser and type in `localhost:3000`

### To RUN the test on this project
1. Run `npm test` inside the project folder  

### If codeship fails to build becuase of the error permission denied
1. Update the API key for you branch in settings -> deployment -> your branch -> Edit deployment

### If codeship fails to build becuase push to remote heroku was rejected
1. on your terminal pull from the heroku server your branch is deploying to by doing
	
        a.) type in heroku apps in terminal and ensure that the first app name that displays is
	    the name of the server you should be deploying to i.e. for backend it should be
	    sexygeohatters-testing and master should be sexygeohatters. If its not the 
	    correct server name for your branch then type in
	        i.)  git remote rm heroku
		ii.) then type in heroku git:remote -a "name of server corresponding to your branch"

	b.) git pull heroku master

2. resolve conflits and then git add, git commit, git push origin branchname. This should build on
   codeship and then deploy to heroku.
