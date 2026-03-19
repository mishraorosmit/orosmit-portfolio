from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Project, AvailabilityStatus, SiteSettings
from .serializers import ProjectSerializer, AvailabilityStatusSerializer, SiteSettingsSerializer
from django.conf import settings

class AvailabilityStatusAPIView(APIView):
    def get(self, request, *args, **kwargs):
        status_obj = AvailabilityStatus.get_status()
        serializer = AvailabilityStatusSerializer(status_obj)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        api_key = request.headers.get('X-Studio-Key')
        if api_key != getattr(settings, 'STUDIO_API_KEY', 'om-studio-key-2024'):
            return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
            
        status_obj = AvailabilityStatus.get_status()
        status_obj.status = request.data.get('status', status_obj.status)
        status_obj.message = request.data.get('message', status_obj.message)
        status_obj.save()
        return Response({'success': True, 'status': status_obj.status})

    def put(self, request, *args, **kwargs):
        return self.patch(request, *args, **kwargs)


class SiteSettingsAPIView(APIView):
    def get(self, request, *args, **kwargs):
        settings_obj = SiteSettings.get_settings()
        serializer = SiteSettingsSerializer(settings_obj)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        api_key = request.headers.get('X-Studio-Key')
        if api_key != getattr(settings, 'STUDIO_API_KEY', 'om-studio-key-2024'):
            return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
        
        settings_obj = SiteSettings.get_settings()
        serializer = SiteSettingsSerializer(settings_obj, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        return self.patch(request, *args, **kwargs)



class ProjectListAPIView(generics.ListAPIView):
    queryset = Project.objects.all().order_by('-created_at')
    serializer_class = ProjectSerializer
    
    def list(self, request, *args, **kwargs):
        try:
            return super().list(request, *args, **kwargs)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request, *args, **kwargs):
        api_key = request.headers.get('X-Studio-Key')
        if api_key != getattr(settings, 'STUDIO_API_KEY', 'om-studio-key-2024'):
            return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProjectDetailAPIView(generics.RetrieveAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def retrieve(self, request, *args, **kwargs):
        try:
            return super().retrieve(request, *args, **kwargs)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def patch(self, request, *args, **kwargs):
        api_key = request.headers.get('X-Studio-Key')
        if api_key != getattr(settings, 'STUDIO_API_KEY', 'om-studio-key-2024'):
            return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def put(self, request, *args, **kwargs):
        return self.patch(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        api_key = request.headers.get('X-Studio-Key')
        if api_key != getattr(settings, 'STUDIO_API_KEY', 'om-studio-key-2024'):
            return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
