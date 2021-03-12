def build_query (hashtags=None, locations=None, phrases=None):
    """ Query builder function for calling Twitter's API. Returns a query built
    from the parameters passed into it. 
    Arguments:
    - hashtags - String array of hashtags, this is None by default.
    - locations - String array of locations, this is None by default.
    - phrases - String array of phrases, this is None by default.
    """

    query = ""

    if (hashtags != None and hashtags != [""]):
        query = query + "("
        for tag in hashtags:
            old_tag = tag
            if (tag.find("#") != 0):
                tag = "#" + tag
            if (hashtags.index(old_tag) == len(hashtags) - 1):
                query = query + tag + ") "
            else:
                query = query + tag + " OR " 
        
    if (locations != None and locations != [""]):
        query = query + "("
        for loc in locations:
            old_loc = loc
            if not(loc.startswith("\"") and loc.endswith("\"")):
                loc = "\"" + loc + "\""
            if (locations.index(old_loc) == len(locations) - 1):
                query = query + "place:" + loc + ") "
            else:
                query = query + "place:" + loc + " OR " 

    if (phrases != None and phrases != [""]):
        query = query + "("
        for phrase in phrases:
            old_phrase = phrase
            if not(phrase.startswith("\"") and phrase.endswith("\"")):
                phrase = "\"" + phrase + "\""
            if (phrases.index(old_phrase) == len(phrases) - 1):
                query = query + phrase + ") "
            else:
                query = query + phrase + " OR " 
    
    return query
