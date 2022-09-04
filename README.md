# express-user-management

User management application built with React that integrates with APIs built with Python and FastAPI and Node.js and Express.js. 
The user data is stored in a PostgreSQL database.

![users_table](https://user-images.githubusercontent.com/104270514/188318080-4e775d98-88ab-4833-b5d8-3920f16ed2a3.jpg)


![add_user](https://user-images.githubusercontent.com/104270514/188318219-90269e1e-7112-4f18-a446-d98393b0af55.jpg)


- [Installation](#installation)
- [Usage](#usage)

## Installation

1. Clone this project to your computer with:

```sh
git clone https://github.com/coutinhoa/express-user-management.git
```

2. Move to the project root directory and install the client and server packages:

```sh
cd express-user-management/client
yarn
```

```sh
cd express-user-management/server
pip install "fastapi[all]"
pip install sqlalchemy
```

## Usage

1. Create a database called pythonserver using PostgreSQL.

2. Run the web application for the client in the terminal:

```sh
cd express-user-management/client
yarn dev

```
3. Run the web application for the server in the terminal:

For FastAPI:
```sh
cd express-user-management/server/sql_app
uvicorn main:app  --reload --host 0.0.0.0 --port 8000
```

