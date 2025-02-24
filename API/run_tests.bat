@echo off

:: Run the Robot Framework tests and direct the output files to the test-output directory
robot --outputdir tests\products-test-output tests\products_tests.robot

robot --outputdir tests\user-test-output tests\user_tests.robot