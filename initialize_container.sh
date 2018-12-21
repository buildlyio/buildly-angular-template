#!/bin/bash
RESULT='export default {'
while read line; do
  RESULT+='"'`echo $line | sed --expression='s/=/\":\"/g'`'"',
done < <(printenv)
RESULT+='"production":"true"}'

PATH=`ls dist/`
OUTPUTPATH="dist/${PATH}/assets/environment.js"

echo $RESULT > $OUTPUTPATH

#Set up NGINX config
cp nginx.conf /etc/nginx/conf.d/default.conf