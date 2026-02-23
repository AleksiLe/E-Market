*** Settings ***
Library  RequestsLibrary
Library  JSONLibrary

*** Variables ***
${BASE_URL}      http://localhost:5000/api
${email}         testuser@example.com
${password}      Test1234!
${product_id}    673f29ea28c684e6b200f6ca

*** Test Cases ***

Login and Get JWT Token
    [Documentation]  Log in a user and store JWT token for subsequent tests
    Create Session  api_session  ${BASE_URL}
    &{data}=  Create Dictionary  email=${email}  password=${password}
    ${response}=  POST On Session  api_session  /user/login  json=${data}
    Should Be Equal As Numbers  ${response.status_code}  200
    ${token}=  Get Value From Json  ${response.json()}  $..token
    Log  JWT Token: ${token}[0]
    Set Suite Variable  ${token}

Get Cart Items - Success
    [Documentation]  Verify getting cart items with valid token
    Create Session  api_session  ${BASE_URL}  headers={"Authorization": "Bearer ${token}[0]"}
    ${response}=  GET On Session  api_session  /cart/getCartItems
    Should Be Equal As Numbers  ${response.status_code}  200
    ${success}=  Get Value From Json  ${response.json()}  $.success
    Should Be True  ${success}
    ${cartItems}=  Get Value From Json  ${response.json()}  $..cartItems
    Log  Current Cart Items: ${cartItems}

Get Cart Items - Unauthorized
    [Documentation]  Verify getting cart items with invalid token
    Create Session  api_session  ${BASE_URL}  headers={"Authorization": "Bearer invalid_token"}
    ${response}=  GET On Session  api_session  /cart/getCartItems  expected_status=any
    Should Be Equal As Numbers  ${response.status_code}  401

Update Cart - Add Item
    [Documentation]  Add a product to the cart
    Create Session  api_session  ${BASE_URL}  headers={"Authorization": "Bearer ${token}[0]"}
    ${quantity}=    Evaluate    2
    &{data}=    Create Dictionary    productId=${product_id}    quantity=${quantity}
    ${response}=  POST On Session  api_session  /cart/updateCart  json=${data}
    Should Be Equal As Numbers  ${response.status_code}  200

Update Cart - Update Item Quantity
    [Documentation]  Update quantity of an existing product
    Create Session  api_session  ${BASE_URL}  headers={"Authorization": "Bearer ${token}[0]"}
    ${quantity}=    Evaluate    5
    &{data}=  Create Dictionary  productId=${product_id}  quantity=${quantity}
    ${response}=  POST On Session  api_session  /cart/updateCart  json=${data}
    Should Be Equal As Numbers  ${response.status_code}  200

Update Cart - Remove Item
    [Documentation]  Remove a product from the cart by setting quantity to 0
    Create Session  api_session  ${BASE_URL}  headers={"Authorization": "Bearer ${token}[0]"}
    ${quantity}=    Evaluate    2
    &{data}=  Create Dictionary  productId=${product_id}  quantity=${quantity}
    ${response}=  POST On Session  api_session  /cart/updateCart  json=${data}
    Should Be Equal As Numbers  ${response.status_code}  200

Update Cart - Invalid Input
    [Documentation]  Try to update cart with invalid payload
    Create Session  api_session  ${BASE_URL}  headers={"Authorization": "Bearer ${token}[0]"}
    &{data}=  Create Dictionary  productId=  quantity=abc
    ${response}=  POST On Session  api_session  /cart/updateCart  json=${data}  expected_status=any
    Should Be Equal As Numbers  ${response.status_code}  400