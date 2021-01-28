from django.shortcuts import render
from dotenv import load_dotenv
import os
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status
from rest_framework.response import Response

load_dotenv()

CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
REDIRECT_URI = os.getenv("REDIRECT_URI")

# Create your views here.


class AuthURL(APIView):
    def get(self, request, format=None):
        scopes = 'user-read-playback-state user-modify-playback state user-read-currently-playing'
        # full list of spotify scopes: https://developer.spotify.com/documentation/general/guides/scopes/

        url = Request('GET', 'https://accounts.spotify.com/authorize', params={
            'scope': scopes,
            'respose_type': 'code',
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID
        }).prepare().url

        return Response({'url': url}, status=status.HTTP_200_OK)
