#!/bin/bash

echo "Starting HippoTech 2.0 React front end"
output=$(mktemp "${TMPDIR:-/tmp/}$(basename 0).XXX")
#npm start
npm start  &> $output &
server_pid=$!
echo "Server pid: $server_pid"
echo "Output: $output"
echo "Wait:"
until grep -q -i 'compiled' $output
do
  if ! ps $server_pid > /dev/null
  then
    echo "The server died" >&2
    exit 1
  fi
  echo -n "."
  sleep 1
done
curl http://localhost:3000
echo
echo "HippoTech front-end is running."
