def print_upper_words(words, must_start_with = None):
    """
        if words starts with only letter in 'must_start_with' parameter, it will return words to uppercase 
        
        Example 1)
        print_upper_words(["hello", "hey", "goodbye", "yo", "yes"], "h")
        RETURN  "HELLO", "HEY"
        
        Example 2)
        print_upper_words(["hello", "hey", "goodbye", "yo", "yes"], must_start_with={"y", "h"})
        RETURN "HELLO", "HEY", "YO", "YES"
        
    """
    for word in words:
        if must_start_with is None or any(word.lower().startswith(letter.lower()) for letter in must_start_with):
            print(word.upper())

print_upper_words(["hello", "hey", "goodbye", "yo", "yes"], must_start_with={"y", "h"})