# HOW TO BUILD DOCKER IMAGE FOR THIS PROJECT

1. cd into project root directory
2. run ' docker build --no-cache -t tdd/crypto-wise-api:1.0 . ' to create docker image of this project
3. run '  
   docker run --name crypto-wise-api -p 8000:8000 -e PORT=8000 -e DATABASE=mongodb://host.docker.internal:27017/crypto-wise -e DBNAME=crypto-wise -e JWT_SECRET=crypto-wise-secret-key-chip-11 -e JWT_EXPIRATION=10d tdd/crypto-wise-api:1.0
   ' to make docker container with env for this project
4. api endpoint can be access with localhost:8000
