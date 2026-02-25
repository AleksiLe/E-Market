*** Settings ***
Library  RequestsLibrary
Library  JSONLibrary

*** Variables ***
${BASE_URL}      http://localhost:5000/api
${email}         testuserrobot@example.com
${password}      Test1234!
${product_id}    673f29ea28c684e6b200f6ca
${token}         None

*** Test Cases ***

Login and Get JWT Token
    [Documentation]  Log in a user and store JWT token for subsequent tests
    Create Session  api_session  ${BASE_URL}
    &{data}=  Create Dictionary  email=${email}  password=${password}
    ${response}=  POST On Session  api_session  /user/login  json=${data}
    Should Be Equal As Numbers    ${response.status_code}    200
    ${token}=  Get Value From Json  ${response.json()}  $.token
    Set Suite Variable  ${token}

Get Cart Items - Success
    [Documentation]  Verify getting cart items with valid token
    Create Session  api_session  ${BASE_URL}  headers={"Authorization": "Bearer ${token}[0]"}
    ${response}=  GET On Session  api_session  /cart/getCartItems
    Should Be Equal As Numbers  ${response.status_code}  200

Get Cart Items - Unauthorized
    [Documentation]  Verify getting cart items with invalid token
    Create Session  api_session  ${BASE_URL}  headers={"Authorization": "Bearer invalid_token"}
    ${response}=  GET On Session  api_session  /cart/getCartItems  expected_status=any
    Should Be Equal As Numbers  ${response.status_code}  401

Update Cart - Add Item
    [Documentation]  Add a product to the cart
    Create Session  api_session  ${BASE_URL}  headers={"Authorization": "Bearer ${token}[0]"}
    ${quantity}     Evaluate    2
    &{data}=    Create Dictionary    ${product_id}=${quantity}
    ${response}=  POST On Session  api_session  /cart/updateCart  json=${data}
    Should Be Equal As Numbers  ${response.status_code}  200
    ${cart}=      Get Value From Json    ${response.json()}    $.cart
    Should Be Equal  ${cart}[0]  ${data}

Update Cart - Remove Item
    [Documentation]  Remove a product from the cart by setting quantity to 0 and expect cart deletion
    Create Session  api_session  ${BASE_URL}  headers={"Authorization": "Bearer ${token}[0]"}
    ${quantity}     Evaluate    0
    &{data}=  Create Dictionary  ${product_id}=${quantity}
    ${response}=  POST On Session  api_session  /cart/updateCart  json=${data}
    Should Be Equal As Numbers  ${response.status_code}  200
    ${message}=  Get Value From Json  ${response.json()}  $.message
    Should Be Equal As Strings  ${message}  ['Empty cart deleted']

Update Cart - Add Item After Remove Item
    [Documentation]  Add a product to the cart again
    Create Session  api_session  ${BASE_URL}  headers={"Authorization": "Bearer ${token}[0]"}
    ${quantity}     Evaluate    5
    &{data}=  Create Dictionary  ${product_id}=${quantity}
    ${response}=  POST On Session  api_session  /cart/updateCart  json=${data}
    Should Be Equal As Numbers  ${response.status_code}  200
    ${cart}=  Get Value From Json  ${response.json()}  $..cart
    Should Be Equal  ${cart}[0]  ${data}

Delete Cart - Cart is empty
    [Documentation]  Remove the cart from user
    Create Session  api_session  ${BASE_URL}  headers={"Authorization": "Bearer ${token}[0]"}
    ${response}=  DELETE On Session  api_session  /cart/deleteCart 
    ${message}=  Get Value From Json  ${response.json()}  $..message
    Should Be Equal As Strings  ${message}  ['Cart deleted']

Delete Cart - Cart Not Found
    [Documentation]  Remove the cart from user
    Create Session  api_session  ${BASE_URL}  headers={"Authorization": "Bearer ${token}[0]"}
    ${response}=  DELETE On Session  api_session  /cart/deleteCart  
    ${message}=  Get Value From Json  ${response.json()}  $..message
    Should Be Equal As Strings  ${message}  ['There was no cart on user']

Delete Cart - No User Token
    [Documentation]  Handle the missing token
    Create Session    api_session    ${BASE_URL}
    ${response}=      DELETE On Session    api_session    /cart/deleteCart    expected_status=401
    Should Be Equal As Numbers    ${response.status_code}    401
