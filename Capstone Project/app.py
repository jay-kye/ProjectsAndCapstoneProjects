import os
import requests
from flask import Flask, render_template, flash, redirect, session, g, request
from flask_bootstrap import Bootstrap
from flask_cors import CORS
from sqlalchemy.exc import IntegrityError

from models import db, connect_db, User, StarredFeed, Feed
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
        
        except:
            flash('Username already exists', 'danger')
            return render_template('users/signup.html', form=form)

        do_login(user)
        return redirect('/') 
    
    return render_template('users/signup.html', form=form)
        
    # return render_template('users/signup.html', form=form)    

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


@app.route('/users/delete', methods=['POST'])
def delete_user():

    if not g.user:
        flash('Access unauthorized.', 'danger')
        return redirect('/')
    
    do_logout()

    db.session.delete(g.user)
    db.session.commit()

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
                password=form.password.data,
            )
            g.user.username = user.username
            g.user.email = user.email
            g.user.image_url = user.image_url
            
            updated_user = User.authenticate(form.username.data, form.password.data)
            if g.user == updated_user:
                try:
                    db.session.commit()
                    return redirect(f"/")
            
                except IntegrityError:
                    print("@@@@")
                    flash("Invalid Credentials", 'danger')
                    return render_template('/users/edit.html', user_id=user_id, form=form)
            

    else:
        flash("Access unauthorized.", 'danger')
        return redirect('/')
                        
    return render_template('/users/edit.html', user_id=user_id, form=form)

@app.route('/users/<int:user_id>/dashboard', methods=['GET','POST'])
def dashboard(user_id):

    if g.user:
        feeds = Feed.query.all()
        starred_feeds = StarredFeed.query.limit(100).all()
        return render_template('users/dashboard.html', user_id=user_id, starred_feeds=starred_feeds, feeds=feeds)

    else:
        flash('Access unauthorized.', 'danger')
        return redirect('/')

@app.route('/feed/results')
def search_feeds():
    
    search = request.args.get('search')
    print(search)
    if g.user:
        starred_feed = StarredFeed.query.all()
        results = Feed.query.filter(Feed.title.ilike(f'%{search}%')).all()
        print("#######", starred_feed)
        print("@@@@@@@@", results)
    
        
    return render_template('users/index.html', results=results, starred_feed=starred_feed, user_id=g.user.id)

@app.route('/feed/<int:f_id>/star', methods=['POST'])
def add_star(f_id):

    if not g.user:
        flash("Access unauthorized.", 'danger')
        return redirect('/')

    feed = Feed.query.get_or_404(f_id)
    
    # Check if the user has already starred the feed
    starred_feed = StarredFeed.query.filter_by(user_id=g.user.id, feed_id=feed.id).first()

    if starred_feed:
        # User has already starred the feed, so unstar it
        db.session.delete(starred_feed)
    else:
        # User hasn't starred the feed, so star it
        db.session.add(StarredFeed(user_id=g.user.id, feed_id=feed.id))

    db.session.commit()
    return redirect('/')

@app.route('/', methods=['GET','POST'])
def greeting():
    if g.user:
        feeds = Feed.query.all()
        starred_feeds = StarredFeed.query.all()

        resp = requests.get("https://api.coinlore.net/api/tickers/?star=1&limit=10")
        data = resp.json()
        tickers = data.get('data', [])
        resp2 =  requests.get("https://api.coinlore.net/api/global/")
        global_crypto_data = resp2.json()
        
        return render_template('/home.html' , feeds=feeds, starred_feeds=starred_feeds, tickers=tickers, global_crypto_data=global_crypto_data)
    else:  
        return render_template('/home-anon.html')
    
@app.after_request
def add_header(req):
    req.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    req.headers["Pragman"] ="no-cache"
    req.headers["expires"] ="0"
    req.headers["Cache-control"] = "public, max-age=0"

    return req