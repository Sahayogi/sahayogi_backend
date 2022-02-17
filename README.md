# Backend For Sahayogi
Backend for Sahayogi, allows creation of beneficiary, vendors, bank and aidagency.
View list of beneficiary
View List of aidAgency
Login and authorization
Setting token for logged in session
### npm install to install all dependencies
### Uses mongoDb atlas for database (Register for an account)
### Create a config.env at top root folder alongside server.js
#### Add config in the format
ATLAS_URI=xyz67d8(get urs from mongodbAtlas) <br />
PORT=5000<br />
JWT_SECRET=xyz123<br />
JWT_EXPIRE=10min<br />
