import os

from flask import Flask, render_template, request, flash, redirect, session, g, abort
from flask_bootstrap import Bootstrap
from flask_cors import CORS
from sqlalchemy.exc import IntegrityError

from models import db, connect_db, User, StarredFeed,Feed
from forms import UserEditForm, UserLoginForm, UserSignupForm

CURR_USER_KEY = "curr_user"

app = Flask(__name__)

CORS(app)
bootstrap = Bootstrap(app)
app.config['SQLALCHEMY_DATABASE_URI'] = (
    os.environ.get('DATABASE_URL', 'postgresql:///inuit'))

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', "private key")

connect_db(app)


@app.before_request
def add_user_to_g():
    if CURR_USER_KEY in session:
        g.user = User.query.get(session[CURR_USER_KEY])
    else:
        g.user = None

def do_login(user):

    session[CURR_USER_KEY] = user.id

def do_logout():
    if CURR_USER_KEY in session:
        del session[CURR_USER_KEY]

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    
    form = UserSignupForm()

    if form.validate_on_submit():
        try:
            user = User.signup(
                username=form.username.data,
                password=form.password.data,
                email=form.email.data,
            )
            db.session.commit()

        except IntegrityError:
            flash('Username already exists', 'danger')
            return render_template('users/signup.html', form=form)
        
        do_login(user)
        return redirect('/')
    
    else:
        return render_template('users/signup.html', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login():

    form = UserLoginForm()

    if form.validate_on_submit():
        user = User.authenticate(form.username.data, form.password.data)

        if user:
            do_login(user)
            return redirect('/')
        
        flash('Invalid Credentials.', 'danger')

    return render_template('users/login.html', form=form)

@app.route('/logout')
def logout():

    do_logout()
    return redirect('/')

@app.route('/users/<int:user_id>', methods=['GET', 'POST'])
def profile(user_id):
    form = UserEditForm()

    if g.user:
        if form.validate_on_submit():
            user = User.edit(
                username=form.username.data,
                email=form.email.data,
                image_url=form.image_url.data or User.image_url.default.arg,
                bio=form.bio.data or User.bio.default.arg,
                password=form.password.data,
            )
            g.user.username = user.username
            g.user.bio = user.bio
            g.user.email = user.email
            g.user.image_url = user.image_url
            
            updated_user = User.authenticate(form.username.data, form.password.data)
            if g.user == updated_user:
                db.session.commit()
                return redirect(f"/")
            
            else:
                flash("Invalid Credentials", 'danger')
            

    else:
        flash("Access unauthorized.", 'danger')
        return redirect('/')
                        
    return render_template('/users/edit.html', user_id=user_id, form=form)

@app.route('/users/delete', methods=['POST'])
def delete_user():

    if not g.user:
        flash('Access unauthorized.', 'danger')
        return redirect('/')
    
    do_logout()

    db.session.delete(g.user)
    db.session.commit()

    return redirect('/signup')

@app.route('/users/<int:user_id>/dashboard', methods=['GET','POST'])
def dashboard(user_id):

    if g.user:
        feeds = Feed.query.all()
        starred_feeds = StarredFeed.query.limit(100).all()
        return render_template('users/dashboard.html', user_id=user_id, starred_feeds=starred_feeds, feeds=feeds)
    
    else:
        # flash('Access unauthorized.', 'danger')
        return redirect('/')
    
@app.route('/feed/<int:feed_id>/star', methods=['POST'])
def add_star(feed_id):

    if not g.user:
        flash("Access unauthorized.", 'danger')
        return redirect('/')
    
    user_starred_feed = Feed.query.get_or_404(feed_id)
    if user_starred_feed in g.user.starred_feeds:
        g.user.starred_feeds = [feed for feed in g.user.starred_feeds if feed != user_starred_feed]
    else:
        g.user.starred_feeds.append(user_starred_feed)
    
    db.session.commit()
    return redirect('/')

@app.route('/', methods=['GET','POST'])
def greeting():
    
    if g.user:
        feeds = Feed.query.limit(100).all()
        starred_feeds = StarredFeed.query.all()

        return render_template('/home.html' , feeds=feeds, starred_feeds=starred_feeds)
    else:  
        return render_template('/home-anon.html')
    
@app.after_request
def add_header(req):
    req.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    req.headers["Pragman"] ="no-cache"
    req.headers["expires"] ="0"
    req.headers["Cache-control"] = "public, max-age=0"

    return req