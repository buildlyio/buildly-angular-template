#!/bin/bash

#Export the current commitID, branch and remote that the build was made from
export GIT_FETCH_HEAD=`cat .git/FETCH_HEAD`

#Read all environment variables as output by printenv and put them into an object stored in window.environment
RESULT='window.environment = {'
while read line; do
  if [ $line = "API_URL" ] | [ $line = "OAUTH_CLIENT_ID" ] | [ $line = "OAUTH_TOKEN_URL" ] ; then
    #Note that multi-line environment variable values will break this
    RESULT+='"'`echo $line | sed --expression='s/=/\":\"/g'`'"',
  fi
done < <(printenv)
#Add production flag which is typically found in environment.prod.ts
RESULT+='"production":"true"}'

PATH=`ls dist/`
OUTPUTPATH="dist/${PATH}/assets/environment.js"

echo $RESULT > $OUTPUTPATH
