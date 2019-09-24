# **API : SCHOOLROUTER **

​	These are the list of API_calls/routes accessible over/within this router. All variable names must respect camelCase.

STATUSCODES : [CALL(2) :STATUS]

: Authentication : Authorization : Data.Manipulation (DB) : 

* SC100 : success :heart:
* SC101: failure :broken_heart:
* SC103: internal error :black_heart:

- [ ] ## **SIGNUP** <*/SERPS/schoolSignUp*> [POST]

    **PARAMS**:  ( Title [ Type: Description ] ) # comment

    - **name** [ String : Full Unique School Name]  # spaces allowed (first Last Middle[Names]), All to Lower Case
    - **schoolPrefix** [ String : short string/ abrevation used for schoolIDs ]  # case sensitive
    - **email** [ String : a valid email address ] # case sensitive, receives confirmation link
    - **password** [ String : valid password ] # 8+ alphabetic characters and numbers only, case sensitive
    - **motto** [ String : ]
    - **address** [] # valid Address /  google map location #(Just text string for now)
    - **logo** [ Image : ] # max Image size is  ?MB #(hashed image string)
    - **images** [ Image[] : ] # Array of Images, max Image size is  ?MB #(array of strings)

  **PAYLOAD:** ( Title [ Type: Description]) # comment

    - state [ String : determines the state of the transaction ("Success | Failure") ]
    - statusCode [ String/Integer : determines the state of the transaction ]
    - statusMessage [ String : describing the state of the transaction ]
    - Token [ Token : temporarily authenticates user (15mins) ] # refresh Token

- [ ] ## **LOGIN** <*/SERPS/School/activateAccount*>  ??? 

- [ ] ## **LOGIN** <*/SERPS/schoolLogin*>

  **PARAMS**:  ( Title [ Type: Description ] ) #comment

  - **detail** [ String : registered username / school Alias ]  | [ String : registered email address ] # case sensitive #(use email)

  - **password** [ String : registered-valid password ] # 8+ alphabetic characters and numbers only, case sensitive

    **PAYLOAD:** ( Title [ Type: Description]) # comment

    ```
    - state [ String : determines the state of the transaction ("Success | Failure") ]
    - statusCode [ String/Integer : determines the state of the transaction ]
    - statusMessage [ String : describing the state of the transaction ]
    - Token [ Token : temporarily authenticates user (15mins) ] # refresh Token
    ```

- [ ] ## GET SCHOOL PROFILE <*/SERPS/School*>

  **PARAMS**:  ( Title [ Type: Description ] ) #comment

  - bearerHeader [ 'x-access-token' |'authorization'] (Authorised JWT access Token)  

  **PAYLOAD:** ( Title [ Type: Description]) # comment

  ```
  - state [ String : determines the state of the transaction ("Success | Failure") ]
  - statusCode [ String/Integer : determines the state of the transaction ]
  - statusMessage [ String : describing the state of the transaction ]
  - Data [ School Profile information] # 
  ```

- [ ] ## GET SCHOOL CONTACT INFO<*/SERPS/School*>

  **PARAMS**:  ( Title [ Type: Description ] ) #comment

  - JWT + CRSF TOKEN in authorization header

  **PAYLOAD:** ( Title [ Type: Description]) # comment      

  - statusCode [ String/Integer : determines the state of the transaction ]
  - contactInfo [ JSON : school contactInfo from database  ] # email, address, 

- [ ] ## GET SCHOOL PROFILE <*/SERPS/School*>

- [ ] ## GET SCHOOL PROFILE <*/SERPS/School*>

- [ ] ## GET SCHOOL PROFILE <*/SERPS/School*>