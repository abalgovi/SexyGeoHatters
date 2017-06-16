# web-app [ ![Codeship Status for abalgovi/SexyGeoHatters](https://app.codeship.com/projects/6814fa60-0c1f-0135-bd98-1e43dc52171f/status?branch=master)](https://app.codeship.com/projects/215236)
[![Code Climate](https://codeclimate.com/repos/591102e69023ac028a00027b/badges/af52f2dd79c80f8c7447/gpa.svg)](https://codeclimate.com/repos/591102e69023ac028a00027b/feed)
[![Test Coverage](https://codeclimate.com/repos/591102e69023ac028a00027b/badges/af52f2dd79c80f8c7447/coverage.svg)](https://codeclimate.com/repos/591102e69023ac028a00027b/coverage)

First Run
----------------------------
1. Setup Account with [mLab](https://mlab.com/)
2. Copy mongoDB access point into app.js:

        $ var mongoURI = process.env.MONGOLAB_URI || 'YOUR MONGODB CONNECTION ON mLAB';
        
2. Install [Node.js](http://nodejs.org/download/)
3. Navigate to the root directory
4. Install npm dependencies:

        $ npm install
        $ npm install --global gulp

6. Use ``gulp`` to run the application
7. Navigate your browser to [http://localhost:4000](http://localhost:4000/)


