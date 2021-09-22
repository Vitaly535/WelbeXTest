"""WelbeXTest URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
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
from django.conf import settings
from django.conf.urls import include, url
from django.contrib import admin
from django.urls import path
from django.views.static import serve


urlpatterns = [
    path("auth/", include("users.urls")),
    path('admin/', admin.site.urls),
    path("auth/", include("django.contrib.auth.urls")),
    path("", include("singlepage.urls")),
]
if settings.DEBUG:
    urlpatterns += ( *static(settings.MEDIA_URL,
                           document_root=settings.MEDIA_ROOT),
                    *static(settings.STATIC_URL,
                           document_root=settings.STATIC_ROOT), )

if not settings.DEBUG:
    urlpatterns += [url(r'^media/(?P<path>.*)$', serve,
                        {'document_root': settings.MEDIA_ROOT}),
                    url(r'^static/(?P<path>.*)$', serve,
                        {'document_root': settings.STATIC_ROOT}), ]


admin.autodiscover()
admin.site.enable_nav_sidebar = False