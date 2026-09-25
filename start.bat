@echo off
chcp 65001 > nul
title myhome 로컬 웹 서버
echo ========================================================
echo  myhome 웹 서버를 시작합니다...
echo ========================================================
node server.js
pause
