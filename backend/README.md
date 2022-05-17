# SurvHey! -- Backend

Welcome to the backend of my survey CRUD application. 🤖

The backend uses Node/Express paired with MongoDB/Mongoose. [More about MERN](https://www.mongodb.com/mern-stack)

Database models may be found in [`./models/`](./models/) 

View controllers in [`./controllers/`](./controllers/)

Endpoints are defined in [`./routes/`](./routes/)

## Authentication

🔐 SurvHey! Uses [JsonWebTokens](https://jwt.io/) for authentication.

🧂 [Salt](https://en.wikipedia.org/wiki/Salt_(cryptography)) is used to hash user passwords.

## Safety

SurvHey! was created with everyone in mind. This is why I used [cloudinary.com](https://cloudinary.com/) paired with [AWS Rekognition](https://docs.aws.amazon.com/rekognition/latest/dg/what-is.html) To ensure users may not upload unsafe profile pictures.

All text input is also checked for **profanity** using [Profanity](https://github.com/2Toad/Profanity) by [2Toad](https://github.com/2Toad)


