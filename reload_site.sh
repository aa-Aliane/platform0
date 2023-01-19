#! /bin/bash

echo "loading site ..."
supervisorctl restart nlpchallenge2 platform0
echo "done (1/2)"
echo "loading service"
service nginx stop
service nginx start
echo "done (2/2)"
