# **API : SCHOOLROUTER <GET>**

​	These are the list of API_calls/routes accessible over/within this router

STATUSCODES : [CALL(2) :STATUS]

: Authentication : Authorization : Data.Manipulation (DB) : 

* 100 : success :heart:
* 101: failure :broken_heart:
* 103: internal error :black_heart:

- [ ] ## **SIGNUP** <*/SERPS/School/signUp*>

  ​	**PARAMS**:  ( Title [ Type: Description ] ) # comment

    - Name [ String : Full Unique School Name]  # spaces allowed (first Last Middle[Names]), All to Lower Case

    - email [ String : a valid email address ] # case sensitive, receives confirmation link

    - password [ String : valid password ] # 8+ alphabetic characters and numbers only, case sensitive

    - motto [ String : ]

    - Address [] # valid Address /  google map location

    - Logo [ Image : ] # max Image size is  ?MB

    - Images [ Image[] : ] # Array of Images, max Image size is  ?MB



      **PAYLOAD:** ( Title [ Type: Description]) # comment

      - statusCode [ String/Integer : determines the state of the transaction ]
      - Token [ Token : temporarily authenticates user (15mins) ] # refresh Token

- [ ] ## **LOGIN** <*/SERPS/School/activateAccount*>  ??? 

- [ ] ## **LOGIN** <*/SERPS/School/login*>

  ​	**PARAMS**:  ( Title [ Type: Description ] ) #comment

  - Username [ String : registered username / school Alias ]  # case sensitive

  - email [ String : registered email address ] # case sensitive

  - password [ String : registered-valid password ] # 8+ alphabetic characters and numbers only, case sensitive



    **PAYLOAD:** ( Title [ Type: Description]) # comment

    - statusCode [ String/Integer : determines the state of the transaction ]
    - Token [ Token : authenticates user ] # Token+
      - **/local/register**
      - **/local/login**
      - **/local/link**
      - **/local/send-verification-email**
      - **/local/verify**
      - **/local/forgot-password**
      - **/local/reset-password**
      - **/local/change-password**