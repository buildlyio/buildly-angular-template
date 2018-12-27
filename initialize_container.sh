#!/bin/bash

export GIT_FETCH_HEAD=`cat .git/FETCH_HEAD`

RESULT='export default {'
while read line; do
  RESULT+='"'`echo $line | sed --expression='s/=/\":\"/g'`'"',
done < <(printenv)
RESULT+='"production":"true"}'

PATH=`ls dist/`
OUTPUTPATH="dist/${PATH}/assets/environment.js"

echo $RESULT > $OUTPUTPATH
