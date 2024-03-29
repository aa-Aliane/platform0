from django.urls import include, path
from .views import (
    WordViewSet,
    ContextViewSet,
    get_context,
    post_context,
    update_word,
    post_word,
    login,
    download,
)
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)


router = routers.DefaultRouter()
router.register("words", WordViewSet)
router.register("contexts", ContextViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("get_context/", get_context, name="get_context"),
    path("post_context/", post_context, name="post_context"),
    path("update_word/", update_word, name="update_word"),
    path("post_word/", post_word, name="post_word"),
    path("login/", login, name="login"),
    path("download/", download, name="download"),
]
