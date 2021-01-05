#!/bin/bash -l
echo "version: '3.7'
services:
  mediawiki:
    user: '$1:$2'" > /home/runner/work/mediawiki/mediawiki/docker-compose.override.yml