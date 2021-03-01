import tweepy

#hashtags - array of hashtag strings
#locations - array of location strings
#phrases - array of phrase strings
def build_query (hashtags, locations, phrases ):

    query = ""

        query = query + "("
        for tag in hashtags:
            if (hashtags.index(tag) == len(hashtags) - 1):
                query = query + "#" + tag + ") "
            else:
                query = query + "#" + tag + " OR " 
        
    if (len(locations) != 0):
        query = query + "("
        for loc in locations:
            if (loc.find(" ") != -1):
                loc = "\"" + loc + "\""
            if (locations.index(loc) == len(locations) - 1):
                query = query + "place:" + loc + ") "
            else:
                query = query + "place:" + loc + " OR " 
    if (len(phrases) != 0):
        query = query + "("
        for phrase in phrases:
            if (phrases.index(phrase) == len(phrases) - 1):
                query = query + "\"" + phrase + "\"" + ") "
            else:
                query = query + "\"" + phrase + "\"" + " OR " 
    
    return query

