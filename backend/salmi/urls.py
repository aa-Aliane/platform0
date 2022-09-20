from django.urls import include, path
from .views import WordViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register('words', WordViewSet)

urlpatterns = [
    path('', include(router.urls)),
]