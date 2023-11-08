#!/usr/bin/env bash

REPOSITORY=/home/ec2-user/EliceStudy2nd_FE

echo "> 배포 시작"

echo "> 프로젝트 폴더로 이동"

cd ${REPOSITORY}

echo "> git pull"

git pull origin dev

echo "> npm 업데이트"

npm install

echo "> 빌드 시작"

npm run build

echo "> nginx reload"

sudo service nginx reload

exit 0
