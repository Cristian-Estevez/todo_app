# Todo App

A simple todo application with Django and React frontend.
The React frontend introduces a newer user experience design while maintaining the same functionality.

### Prerequisites

#### Make sure you have the following installed :

- Python==3.\*
- Node.js(\*)
- npm(\*)

(\*) These are optional for using the new React UI.

### Installation in Linux Environments

#### Clone repository:

```sh
git clone https://github.com/cristian-estevez/todo_app.git
```

#### Move into "todo_app" folder:

```sh
cd todo_app
```

#### If needed, grant permissions to "todo.sh" file:

```sh
sudo chmod 777 todo.sh
```

#### Execute:

```sh
source todo.sh
```

- This will create a virtual environment for the python libraries not to be installed globally, then install the libraries needed, run migrations and start de dev server.

#### Open your web browser and go to:

```
http://127.0.0.1:8000/
```

### If you want to use the React frontend:

#### While the Django web server is runing navigate to the "front_v2" directory:

```sh
cd front_v2
```

#### Run:

```sh
npm install
```

The app will start automatically in your browser.

#### If it doesn't:

```
npm run dev
```

#### And then open your web browser and go to:

```
http://127.0.0.1:5173/
```
