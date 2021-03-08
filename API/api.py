from flask import Flask, jsonify, request, json
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///example.db"
db = SQLAlchemy(app)

# Creat a model
class Todo(db.Model):
   id = db.Column(db.Integer, primary_key = True)
   email = db.Column(db.Text, nullable = False)
   password = db.Column(db.Text, nullable = False)

   def __str__(self):
      return f'{self.id} {self.content}'

def todo_serializer(todo):
   return{
      'id': todo.id,
      'content': todo.content
   }

@app.route('/api', methods=['GET'])
def index():
   todo = Todo.query.all()
   return jsonify([*map(todo_serializer, Todo.query.all())])
   # return {
   #    'name': ['orange', 'apple']
   # }

@app.route('/api/create', methods=['POST'])
def create():
   request_data = json.loads(request.data)
   todo = Todo(password = request_data ['content'])

   db.session.add(todo)
   db.session.commit()

   return {'201': 'todo created successfully'}

#someone goes to /api/ any id, pass back that id
@app.route('/api/<int:id>')
def show(id):
   print ("This is the id: " + str(id))
   return jsonify([*map(todo_serializer, Todo.query.filter_by(id=id))])

@app.route('/api/<int:id>', methods=['POST'])
def delete(id):
   print("entered delete function with id: " + str(id))
   request_data = json.loads(request.data)
   print (request_data)
   Todo.query.filter_by(id = request_data['id']).delete()
   db.session.commit()

   return { '204' : 'Deleted successfully' }

@app.route('/api/loginClicked/', methods = ['GET', 'POST'])
def getLoginPage():
   request_data = json.loads(request.data)
   print(request_data)
   exists = Todo.query.filter_by(email = request_data['email'])
   # Todo.query.filter_by(email = request_data['email'])
   # print (request_data)
   # Query the databse to see if there are users.
   # If there are users, we'
   if(exists):
      print("The user exists. Lock and load")
      return {'200': 'Login Authenticated'}
   else:
     print("ruh roh")
     return {'666': 'Login Failed'}

   

if __name__ == '__main__':
   app.run(debug = True)

#DB model is created.

# To initialize db in console:
# python
# from api import db
# db.create_all ()

# import the model
# from api import Todo
# todo = Todo(content = 'I need to eat')
# db.session.add(todo)
# db.session.commit()
# second_todo = Todo(content = 'I need to learn Flask')
# db.session.add(second_todo)
# db.session.commit()