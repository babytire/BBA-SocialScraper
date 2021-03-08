def build_query (hashtags=None, locations=None, phrases=None):
    """ Query builder function for calling Twitter's API. Returns a query built
    from the parameters passed into it. 

    Arguments:
    - hashtags - String array of hashtags, this is None by default.
    - locations - String array of locations, this is None by default.
    - phrases - String array of phrases, this is None by default.

    """

    query = ""

    if (hashtags != None):
        query = query + "("
        for tag in hashtags:
            if (tag.find("#") != 0):
                tag = "#" + tag
            if (hashtags.index(tag) == len(hashtags) - 1):
                query = query + tag + ") "
            else:
                query = query + tag + " OR " 
        
    if (locations != None):
        query = query + "("
        for loc in locations:
            if (loc.find(" ") != -1):
                loc = "\"" + loc + "\""
            if (locations.index(loc) == len(locations) - 1):
                query = query + "place:" + loc + ") "
            else:
                query = query + "place:" + loc + " OR " 

    if (phrases != None):
        query = query + "("
        for phrase in phrases:
            if (phrases.index(phrase) == len(phrases) - 1):
                query = query + "\"" + phrase + "\"" + ") "
            else:
                query = query + "\"" + phrase + "\"" + " OR " 
    
    return query