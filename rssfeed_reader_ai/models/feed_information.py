from db import db
import datetime

# Class for the Feed Information Table
class FeedInformation(db.Model):
    # define the source table columns
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False)
    subtitle = db.Column(db.Text, nullable=False)
    link = db.Column(db.Text, nullable=False)
    rss_feed = db.Column(db.Text, nullable=False)
    # when the source is created, this will tell us what date time
    date_added = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    # add a decorator for a method that belong to a class FeedInformation
    @classmethod
    
    def insert_from_feed(cls, feed, feed_source):
        # these are the objects from feed.py get_feed_info() function
        link = feed_source['link']
        title = feed_source['title']
        subtitle = feed_source['subtitle']
        
        # extend with constructed source
        source = FeedInformation(rss_feed=feed, link=link, title=title, subtitle=subtitle)

        # add the objects
        db.session.add(source)

        # commit to the session
        db.session.commit()

        return source