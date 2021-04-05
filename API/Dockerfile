# File allows us to communicate with Docker. Docker will look for this file to build an image: docker build -t pythonapp .

# A container is a running version of our image.

# An image is a root only template that contains a set of instructions to create a container.
# FROM baseImage

# Python needs to be installed in the environment we're spinning up. If it's not already there, it will istall python 3 from docker hub.
FROM python:3

# Install Node
# FROM node:10

# Create a working directory. Instead of an image, this will create a directory called app. Puts you and anything you're building straight into this directory.
WORKDIR /app

# Creating environment variables:
ENV FLASK_APP=api.py
# Specifying the flask state. Leave empty for prod, else dev.
ENV FLASK_ENV=development

# Copying files from this directory to the container's WORKDIR directory
COPY ./requirements.txt .

# Installing requirements
RUN pip install -r requirements.txt
RUN pip install Flask-SQLAlchemy
RUN pip install tweepy
RUN pip install selenium
RUN pip install insta-scrape
RUN pip install requests
RUN pip install jsonify
RUN pip install XlsxWriter

# Copy everything into the WORKDIR
COPY . .

# Run the python application
# CMD ["python", "api.py"]

# Specify a port we are exposing for container entry. Need to do this to connect the port on the local machine to the port in the container.
EXPOSE 5000

# To delete a container: docker rmi pythonapp
# To run a command in the docker container created: docker run -it pythonapp bash (gets you to the directories within the container.)

# To run the application from the host machine, do a docker run pythonapp

# to run it with specific ports opened and closed: docker run -p 80:5000 -v $(pwd):/app pythonapp
# -v maps current WORKDIR to the container WORKDIR
# -p specifies the port donnections.

# docker ps -aq deletes all dontainers.

# To create a react-app:
# npx create-react-ap my-app && cd my-app && npm start