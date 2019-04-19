docker images
docker build -t <your username>/node-web-app

docker run -p 8080:8080 -d <your username>/node-web-app

docker ps

docker logs <container id> 

docker exec -it <container id> /bin/bash