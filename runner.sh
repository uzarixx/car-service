#!/bin/bash
case $1 in
'all')
  docker compose -f "./deploy/docker-compose.yml" --env-file "./deploy/.env" -p dev up -d --build --force-recreate;;
'stop')
  docker compose -p dev down;;
*)
  echo "please run with not empty attributes (all, stop)";;
esac

# sh runner.sh all