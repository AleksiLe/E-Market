@echo off

:: Run Products tests -> tests\results\products\
robot --outputdir tests\results\products tests\products_tests.robot

:: Run User tests -> tests\results\users\
robot --outputdir tests\results\users tests\user_tests.robot