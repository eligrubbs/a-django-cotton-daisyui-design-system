"""
URL configuration for example project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView

from example.views import kitchen_sink_view


urlpatterns = [
    path('admin/', admin.site.urls),
    path("", kitchen_sink_view, name="kitchen_sink"),
    # Showcase
    path('showcase/button/', TemplateView.as_view(template_name='showcase/button_page.html'), name='showcase_button'),
    path('showcase/badge/', TemplateView.as_view(template_name='showcase/badge_page.html'), name='showcase_badge'),
    path('showcase/alert/', TemplateView.as_view(template_name='showcase/alert_page.html'), name='showcase_alert'),
    path('showcase/card/', TemplateView.as_view(template_name='showcase/card_page.html'), name='showcase_card'),
    path('showcase/checkbox/', TemplateView.as_view(template_name='showcase/checkbox_page.html'), name='showcase_checkbox'),
    path('showcase/input/', TemplateView.as_view(template_name='showcase/input_page.html'), name='showcase_input'),
]
