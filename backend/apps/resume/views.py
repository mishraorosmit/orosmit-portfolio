from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import FileResponse
from .models import Resume

class LatestResumeAPIView(APIView):
    def get(self, request):
        try:
            resume = Resume.objects.filter(is_active=True).latest('uploaded_at')
            return Response({'url': request.build_absolute_uri(resume.file.url)})
        except Resume.DoesNotExist:
            return Response({'error': 'No resume available'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
