from django.shortcuts import render

def kitchen_sink_view(request):

    return render(request, "example_proj/kitchen.html", {})
