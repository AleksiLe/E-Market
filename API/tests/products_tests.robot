*** Settings ***
Library  RequestsLibrary

*** Variables ***
${BASE_URL}  http://localhost:3000/api

*** Test Cases ***
Get All Products
    [Documentation]  Verify that the API returns a list of products
    Create Session  api_session  ${BASE_URL}
    ${response}=  GET On Session  api_session  /products
    Should Be Equal As Numbers  ${response.status_code}  200
    Log  ${response.json()}
