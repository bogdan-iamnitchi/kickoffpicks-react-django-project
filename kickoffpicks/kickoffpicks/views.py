from django.shortcuts import render

def render_frontend(request):
    return render(request, 'index.html')