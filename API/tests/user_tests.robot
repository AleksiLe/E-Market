*** Settings ***
Library  RequestsLibrary
Library  JSONLibrary

*** Variables ***
${BASE_URL}  http://localhost:3000/api
${token}  None

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

Login With Invalid Email
    [Documentation]  Verify that the API returns an error when trying to log in with an invalid email
    Create Session  api_session  ${BASE_URL}
    &{data}=  Create Dictionary  email=notEmail  password="Testisalasana1!"
    ${response}=  POST On Session  api_session  /user/login  json=${data}  expected_status=any
    Should Be Equal As Numbers  ${response.status_code}  404

Login With Incorrect Password
    [Documentation]  Verify that the API returns an error when trying to log in with an incorrect password
    Create Session  api_session  ${BASE_URL}
    &{data}=  Create Dictionary  email=TestiRobot@gmail.com  password=Testisalasana1
    ${response}=  POST On Session  api_session  /user/login  json=${data}  expected_status=any
    Should Be Equal As Numbers  ${response.status_code}  401

Login With Not Existing Credentials
    [Documentation]  Verify that the API returns an error when trying to log in with not existing credentials
    Create Session  api_session  ${BASE_URL}
    &{data}=  Create Dictionary  email=notThere@gmail.com  password="Testisalasana1!"
    ${response}=  POST On Session  api_session  /user/login  json=${data}  expected_status=any
    Should Be Equal As Numbers  ${response.status_code}  404

Login With Correct Credentials
    [Documentation]  Verify that the API can log in a user with correct credentials
    Create Session  api_session  ${BASE_URL}
    &{data}=  Create Dictionary  email=TestiRobot@gmail.com  password=Testisalasana1!
    ${response}=  POST On Session  api_session  /user/login  json=${data}
    Should Be Equal As Numbers    ${response.status_code}    200
    ${token}=  Get Value From Json  ${response.json()}  $..token
    Set Suite Variable  ${token}
Verify Token
    [Documentation]  Verify that the API can verify a token
    Log  ${token}
    Create Session  api_session  ${BASE_URL}  headers={"Authorization": "Bearer ${token}[0]"}
    ${response}=  POST On Session  api_session  /user/verify
    Should Be Equal As Numbers  ${response.status_code}  200
