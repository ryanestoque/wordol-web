from django.urls import path
from . import views

urlpatterns = [
    path("get/", views.get_stats, name="get_stats"),
    path("update/", views.update_stats, name="update_stats"),
]
