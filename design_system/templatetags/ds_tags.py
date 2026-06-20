from django import template

register = template.Library()


@register.filter
def get_dict_item(dictionary, key):
    """
    Get an item from a dictionary, returning an empty string instead of None
    if the key is not found or the value is None.

    Usage: {{ myDict|get_dict_item:myKey }}
    """
    if dictionary is None:
        return ""

    if not isinstance(dictionary, dict):
        return ""

    value = dictionary.get(key)
    return "" if value is None else value

