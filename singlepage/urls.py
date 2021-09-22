from django.conf.urls import include
from django.urls import path

from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('ranges', views.RangesViewSet, basename='Ranges')

urlpatterns = [
    path('', views.index, name='index'),
    path('api/v2/', include(router.urls)),
    path('api/v2/new/<str:model>/', views.new_item, name='api_new_item'),
    path('api/v2/edit/<str:model>/<int:id>/', views.edit_item,
         name='api_edit_item'),

]