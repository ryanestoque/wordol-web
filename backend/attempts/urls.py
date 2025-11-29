from django.urls import path
from . import views

urlpatterns = [
    path("create/", views.create_attempt, name="create_attempt"),
    path("history/", views.get_attempt_history, name="attempt_history"),
]