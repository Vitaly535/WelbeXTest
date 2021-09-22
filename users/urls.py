from django.contrib.auth.views import (PasswordChangeDoneView,
                                       PasswordChangeView)
from django.urls import path

from . import views

urlpatterns = [
    path('signup/', views.sign_up, name="signup"),
    path('password_change/', PasswordChangeView.as_view(
         template_name="registration/password_change_form.html"),
         name='password_change'),
    path('password_change/done/', PasswordChangeDoneView.as_view(),
         name='password_change_done'),

]
