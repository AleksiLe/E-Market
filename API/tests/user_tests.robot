*** Settings ***
Library  RequestsLibrary

*** Variables ***
${BASE_URL}  http://localhost:3000/api

*** Test Cases ***
Register User With Weak Credentials
    [Documentation]  Verify that the API returns an error when trying to register a user with weak credentials
    Create Session  api_session  ${BASE_URL}
    &{data}=  Create Dictionary  email=TestiRobot@gmail.com  password=weak  username=Testaaja
    ${response}=  POST On Session  api_session  /user/register  json=${data}  expected_status=any
    Should Be Equal As Numbers  ${response.status_code}  400

Register New User Successfully
    [Documentation]  Verify that the API can register a new user
    Create Session  api_session  ${BASE_URL}
    &{data}=  Create Dictionary  email=TestiRobot@gmail.com  password=Testisalasana1!  username=Testaaja
    ${response}=  POST On Session  api_session  /user/register  json=${data}
    Should Be Equal As Numbers  ${response.status_code}  201

Register Duplicate User
    [Documentation]  Verify that the API returns an error when trying to register a user with an existing email
    Create Session  api_session  ${BASE_URL}
    &{data}=  Create Dictionary  email=TestiRobot@gmail.com  password=Testisalasana1!  username=Testaaja
    ${response}=  POST On Session  api_session  /user/register  json=${data}  expected_status=any
    Should Be Equal As Numbers  ${response.status_code}  409