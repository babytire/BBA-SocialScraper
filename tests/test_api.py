import sys
import os
import tempfile

import pytest

sys.path.insert(1, '../API')
from api import m_app

@pytest.fixture
def client():
    db_fd, m_app.app.config['DATABASE'] = tempfile.mkstemp()
    m_app.app.config['TESTING'] = True

    with m_app.app.test_client() as client:
        with m_app.app.app_context():
            m_app.init_db()
        yield client

    os.close(db_fd)
    os.unlink(m_app.app.config['DATABASE'])

def should_Create_User(client, email, name, password):
   {"email": "email@email.com", "name": "First Last", "password": "password"
    return client.post('/api/createUser/', data=dict(
        email=email,
        name=name,
        password = password
    ), follow_redirects=True)

def test_should_create_user (client):
   """Start with a blank database."""

   rv = login(client, 'a@a.a', 'foo', 'bar pie')
   # rv = login(client, flaskr.app.config['USERNAME'], flaskr.app.config['PASSWORD'])
   assert b'User has been created' in rv.data