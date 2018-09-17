import tweepy
import json, config, datetime, time, pytz, re, sys, traceback
from requests_oauthlib import OAuth1Session
import itertools

FRIENDS_IDS_URL = "https://api.twitter.com/1.1/friends/ids.json"
USERS_LOOKUP_URL = "https://api.twitter.com/1.1/users/lookup.json"
FOLLOWERS_IDS_URL = "https://api.twitter.com/1.1/followers/ids.json"

twitter = None

twitter = OAuth1Session(config.CONSUMER_KEY, config.CONSUMER_SECRET, config.ACCESS_TOKEN, config.ACCESS_TOKEN_SECRET)

class NotFollowMe:
    def __init__(self, screen_name):
        self.screen_name = screen_name
        self.followings = self.requestCheck(FRIENDS_IDS_URL, {'screen_name' : screen_name})
        self.followers = self.requestCheck(FOLLOWERS_IDS_URL, {'screen_name' : screen_name})
    
    def requestCheck(self, uri, _params):
        req = twitter.get(uri, params = _params)
        if req.status_code == 200:
            return json.loads(req.text)
        else:
            return None
    
    def output(self):
        if self.followings == None or self.followers == None:
            print("Except: no data")

        for hundred_box in itertools.zip_longest(*[iter(list( set(self.followings['ids']) - set(self.followers['ids']) ))]*100):
            hundlred_ids_str = ",".join(map(str, hundred_box))
            not_follow_me_guys = json.loads(twitter.get(USERS_LOOKUP_URL, params = {'user_id' : hundlred_ids_str}).text)
            for not_follow_me_guy in not_follow_me_guys:
                print(not_follow_me_guy["name"] + ' : ' + not_follow_me_guy["screen_name"] +
                 ' : ' + not_follow_me_guy["profile_image_url"] + ' : ' + not_follow_me_guy["profile_image_url_https"])
                # print(not_follow_me_guy["screen_name"])
                # print(not_follow_me_guy["profile_image_url"])
                # print prameters ...

if __name__ == '__main__':
    not_follow_me = NotFollowMe('crittoo96')
    not_follow_me.output()