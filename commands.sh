CREATE PROJECT
cd event-planner-app
python3 -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

mkdir server && cd server
django-admin startproject config .
python3 manage.py startapp events

pip install djangorestframework django-cors-headers

README.SH
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver




# CREATE TABLE EVENT_TYPES
CREATE TABLE event_types (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

INSERT INTO event_types (name)
VALUES ('Merger'), ('Dividends'), ('New Capital'), ('Hire');


admin credentials: 
username: nekkunjpilani
email: nekkunjpilani@gmail.com
password: nekkunj24