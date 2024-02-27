"""SQLAlchemy models for inuit."""

from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy

bcrypt = Bcrypt()
db = SQLAlchemy()

class StarredFeed(db.Model):
    """Mapping user starred feeds"""

    __tablename__ = 'starred_feeds'

    id = db.Column(
        db.Integer,
        primary_key=True,
    )
    
    user_id = db.Column(
        db.Integer,
        db.ForeignKey('users.id', ondelete='cascade'),
        nullable=False,
    )

    feed_id = db.Column(
        db.Integer,
        db.ForeignKey('feeds.id', ondelete='cascade'),
        nullable=False,
    )

    user = db.relationship('User', back_populates='starred_feeds')
    feed = db.relationship('Feed', back_populates='starred_feeds')


class Feed(db.Model):
    """Latest News Feeds"""
    __tablename__ = 'feeds'

    id = db.Column(
        db.Integer,
        primary_key=True,
    )

    title = db.Column(
        db.String(255),
        nullable=False,
        unique=True,
    )

    starred_feeds = db.relationship('StarredFeed', back_populates='feed')

class User(db.Model):
    """User in the system."""
    
    __tablename__ = 'users'

    id = db.Column(
        db.Integer,
        primary_key=True,
    )
    email = db.Column(
        db.String(50),
        nullable=False,
        unique=True,
    )
    username = db.Column(
        db.String(16),
        nullable=False,
        unique=True,
    )
    password = db.Column(
        db.Text,
        nullable=False,
    )
    image_url= db.Column(
        db.Text,
        default="/static/images/default-pic.png",
    )
    bio = db.Column(
        db.Text,
        default="Hi",
    )
    
    starred_feeds = db.relationship('StarredFeed', back_populates='user')






    def __repr__(self):
        return f"<User #{self.id}: {self.username}, {self.email}>"
    
    
    @classmethod
    def signup(cls, username, email, password):
        hashed_pwd = bcrypt.generate_password_hash(password).decode('UTF-8')

        user = User(
            username=username,
            email=email,
            password=hashed_pwd,
        )

        db.session.add(user)
        return user

    
    @classmethod
    def edit(cls, username, email, password, image_url, bio):
        
        hashed_pwd = bcrypt.generate_password_hash(password).decode('UTF-8')
        user = User(
            username = username,
            email = email,
            image_url = image_url,
            password = hashed_pwd,
            bio = bio,
        )

        return user
    
    @classmethod
    def authenticate(cls, username, password):
        
        user = cls.query.filter_by(username=username).first()

        if user:
            is_auth = bcrypt.check_password_hash(user.password, password)
            if is_auth:
                return user
            
        return False
    
def connect_db(app):

    db.app = app
    db.init_app(app)