from flask import Flask, jsonify, request, json
from flask_sqlalchemy import SQLAlchemy
import sys

sys.path.insert(1, './twitter')
from TweetExtractor import scrape_tweet, build_query

sys.path.insert(1, './instagram')
from InstagramKeywordURLExtractor import url_extractor
from PostExtractor import read_to_queue

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///example.db"
db = SQLAlchemy(app)

# Initialize the DB Model with a user example.
# python3
# from api import db
# db.create_all ()

# from api import Todo
# user = UserDB(email = "a2a.a", password = "foo", first = "bar", last = "pie")
# db.session.add(user)
# db.session.commit()

# second_user = UserDB(email = "b2b.b", password = "oof", first = "rab", last = "eip")
# db.session.add(second_user)
# db.session.commit()

# Creat a model
class UserDB(db.Model):
   email = db.Column(db.Text, nullable = False, primary_key = True)
   password = db.Column(db.Text, nullable = False)
   first = db.Column(db.Text, nullable = False)
   last = db.Column(db.Text, nullable = False)
   # todo: PendingAccount colum = True/False
   # todo: Need to add last x searches for search histroy functionality

   def __str__(self):
      return f'{self.id} {self.content}'

def user_serializer(user):
   return{
      'email': user.email,
      'password': user.password,
      'first_name': user.first,
      'last_name': user.last
   }

@app.route('/api', methods=['GET'])
def index():
   users = UserDB.query.all()
   return jsonify([*map(user_serializer, UserDB.query.all())])

# todo: Must return what date range the uses can select from so the calendar can be generated with that information.
# todo: app.route to send email
@app.route('/api/getTwitterDateRange', methods=['GET'])
def getEarlyLateRange():
   pass

@app.route('/api/scrapeInstagram/', methods =['GET', 'POST'])
def scrapeInstagram():
   # Get the user information. JSON body: {"search_term": "hashtag/person/location", ""}
   request_data = json.loads(request.data)
   url_extractor(request_data['search_term'], )

   pass

# Make sure this isn't set to have GET with it as well.
@app.route('/api/scrapeTwitter/', methods=['POST'])
def scrapeTwitter():
   # Get the user information. All lists are comma-serparated. JSON body: {"#hashTags": "list,of,tags", "locations": "list,of,locations", "phrases": "list,of,phrases", "earliestDate": "yyyyMMddHHmm", "latestDate": "yyyyMMddHHmm"}
   request_data = json.loads(request.data)

   hashTags = request_data['hashTags'].split(",")
   hashTags = hashTags[0].split("#")
   hashTags.pop(0)
   locations = request_data['locations'].split(",")
   locations = locations[0].split("#")
   locations.pop(0)
   phrases = request_data['phrases'].split(",")
   phrases = phrases[0].split("#")
   phrases.pop(0)
   earliestDate = None
   latestDate = None  

   if(request_data['earliestDate'] != "" and request_data['latestDate'] != ""):
      earliestDate = request_data['earliestDate']
      latestdate = request_data['latestDate']

   # todo: Prune input data for any empty strings listed.
   # Set empty lists (['']) to None
   # for x in hashTags:
   #    if 

   # Set empty lists ([]) to None
   if (len(hashTags) <= 0):
      hashTags = None
   elif (len(locations) <= 0):
      locations = None
   elif (len(phrases) <= 0):
      phrases = None
   
   query = build_query(hashTags, locations, phrases)
   scrape_tweet(query, None, None)

   return  jsonify({'result': 'Query Complete'})


# #someone goes to /api/ any id, pass back that id
# @app.route('/api/<int:id>')
# def show(id):
#    print ("This is the id: " + str(id))
#    return jsonify([*map(user_serializer, UserDB.query.filter_by(id=id))])

#InProgress
@app.route('/api/deleteUser', methods=['POST'])
def delete():
   # Get the user information. JSON Body: {"email": "email@email.com"}
   request_data = json.loads(request.data)

   # Check to see if the user exists
   if(UserDB.query.filter_by(email = request_data['email']).delete()):
      return jsonify({'result': 'OK User deleted'})
   else:
      return jsonify({'result': 'OK User not deleted'})

   db.session.commit()
   return { '204' : 'Deleted successfully' }

# User creation is happening. Check to see if the email is already in use and if not,
# Create a new user entry.
@app.route('/api/createUser/', methods = ['POST'])
def createUser():
   # Get the user information. JSON Body: {"email": "email@email.com", "name": "First Last", "password": "password"}
   request_data = json.loads(request.data)
   
   # Grab all inputs
   inputEmail = request_data['email']
   inputPassword = request_data['password']
   inputFirstName = ""
   inputLastName = ""

   # Special logic to split the name that is passed in.
   splitNames = request_data['name'].split(" ")
   if(len(splitNames) > 2):
      return jsonify({'result': "NOK Too Few Names Passed In"})
   elif(len(splitNames) < 2):
      return jsonify({'result': "NOK Too Many Names Passed In"})
   else:
      inputFirstName = splitNames[0]
      inputLastName = splitNames[1]

   #This needs to be better handled to return a list of what input fields are empty.
   if(inputEmail != ""):
      if(inputPassword != ""):
         if(inputFirstName != ""):
            if(inputLastName != ""):
               # Build out a user to put into the DB
               user = UserDB(email = inputEmail, first = inputFirstName, last = inputLastName, password = inputPassword)
               # Store the user in the User DB
               db.session.add(user)
               db.session.commit()
               return jsonify({'result': 'OK User Created'})
            else:
               return jsonify({'result': 'NOK No Last Name Found'})
         else:
            return jsonify({'result': 'NOK No First Name Found'})
      else:
         return jsonify({'result': 'NOK No Password Found'})
   else:
      return jsonify({'result': 'NOK No Email Input'})

#User is trying to login. Check to see if the email and password are correct.
@app.route('/api/loginUser/', methods = ['POST'])
def loginUser():
   # Get the login information. JSON Body: {"email": "email@email.com", "password": "password"}
   request_data = json.loads(request.data)
   # Check if the information is within the database
   user = UserDB.query.filter_by(email = request_data['email'])
   if(user is not None):
      # Check to see if the password is the empty
      password = user.password
      if(password is not None):
         # Check to see if the password matches the one in the DB
         if(password == user.password):
            return jsonify({'result': 'OK Email/Password Validated'})
         else:
            return jsonify({'result': 'NOK Email/Password Invalid'})
      else:
         return jsonify({'result': 'NOK Password Field Blank'})
   else:
      return jsonify({'result': 'NOK User Not Found'})

if __name__ == '__main__':
   app.run(debug = True)