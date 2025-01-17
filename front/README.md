## Deployment

Docker image needs to be sent manually to docker hub:
https://hub.docker.com/repository/docker/aleksile/emarketfront/general

From there azure pulls it to container web app that is triggered with webhook.

Following commands are run to deploy it
```
docker build -t emarketfront .
docker run -d -p 8080:8080 --name emarketfront-container emarketfront
docker tag emarketfront aleksile/emarketfront:latest
docker push aleksile/emarketfront:latest
```