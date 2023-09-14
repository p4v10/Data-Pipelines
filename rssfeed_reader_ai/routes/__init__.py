from flask import redirect, request, abort
from app import app
from db import db
from models.articles_summary import ArticlesSummary
from models.feed_information import FeedInformation

# create a index route
@app.route('/', methods=['GET'])
def get_index():
    # query object
    query = ArticlesSummary.query
    
    # filter and order articles
    query = query.filter(ArticlesSummary.unread == True)
    query = query.order_by(ArticlesSummary.date_added.desc())

    # get query results as articles
    articles = query.all()

    return str([article.title for article in articles])

@app.route('/read/<int:article_id>', methods=['GET'])
def get_read_article(article_id):
    return abort(501)

@app.route('/sources', methods=['GET'])
def get_sources():
    return abort(501)

@app.route('/sources', methods=['POST'])
def post_sources():
    return abort(501)
