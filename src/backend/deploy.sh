#!/bin/bash

# Install project dependencies
#npm install --production

# Setup backend service on Debian SystemD
#sudo ln -s `realpath .` /opt/backend
sudo cp ./custombackend.service /etc/systemd/system/custombackend.service
sudo daemon-reload
sudo systemctl enable custombackend.service
sudo systemctl start custombackend.service
