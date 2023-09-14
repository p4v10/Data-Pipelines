from db import db
from sqlalchemy.sql import text
import datetime
import time

class ArticlesSummary(db.Model):
    # define articles table
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False)
    summary = db.Column(db.Text, nullable=False)
    link = db.Column(db.Text, nullable=False)
    author = db.Column(db.Text, nullable=True)
    guid = db.Column(db.String(255), nullable=False)
    unread = db.Column(db.Boolean, default=True, nullable=False)
    source_id = db.Column(db.Integer, db.ForeignKey('feed_information.id'), nullable=False)
    source = db.relationship('FeedInformation', backref=db.backref('articles', lazy=True))
    date_added = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    date_published = db.Column(db.DateTime)
    # make sure there is no duplicate source_id + guid pair in the table
    __table_args__ = (
        db.UniqueConstraint('source_id', 'guid', name='uc_source_guid'),
    )
    
    # add a decorator for a method that belong to a class ArticlesSummary
    @classmethod

    def insert_from_feed(cls, source_id, feed_articles):
        articles = []

        for article in feed_articles:
            # Convert struct_time to string
            published_str = time.strftime('%Y-%m-%d %H:%M:%S', article['published'])
            
            # Create a dictionary of values for the INSERT query
            article_data = {
                'title': article['title'],
                'summary': article['summary'],
                'link': article['link'],
                'author': article['author'],
                'date_published': datetime.datetime.strptime(published_str, '%Y-%m-%d %H:%M:%S'),  # Convert to datetime
                'guid': article['id'],
                'source_id': source_id,
            }
            
            # Append the article data to the list
            articles.append(article_data)

        # Insert or update the articles into the db
        for article in articles:
            try:
                db.session.merge(ArticlesSummary(**article))
                db.session.commit()
            except Exception as e:
                print(f'Error inserting/updating data into the database: {str(e)}')
                db.session.rollback()