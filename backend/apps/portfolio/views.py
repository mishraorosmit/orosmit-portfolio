from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Project, AvailabilityStatus, SiteSettings
from .serializers import ProjectSerializer, AvailabilityStatusSerializer, SiteSettingsSerializer

class ProjectListView(APIView):
    def get(self, request):
        projects = Project.objects.all().order_by('-id')
        return Response(ProjectSerializer(projects, many=True).data)

class ProjectDetailView(APIView):
    def get(self, request, pk):
        try:
            p = Project.objects.get(pk=pk)
            return Response(ProjectSerializer(p).data)
        except Project.DoesNotExist: return Response({'error': 'Not found'}, status=404)

class ProjectCreateView(APIView):
    def post(self, request):
        s = ProjectSerializer(data=request.data)
        if s.is_valid(): s.save(); return Response(s.data, status=201)
        return Response(s.errors, status=400)

class ProjectUpdateView(APIView):
    def put(self, request, pk):
        try:
            p = Project.objects.get(pk=pk)
            s = ProjectSerializer(p, data=request.data, partial=True)
            if s.is_valid(): s.save(); return Response(s.data)
            return Response(s.errors, status=400)
        except Project.DoesNotExist: return Response({'error': 'Not found'}, status=404)
    def patch(self, request, pk): return self.put(request, pk)

class ProjectDeleteView(APIView):
    def delete(self, request, pk):
        try: Project.objects.get(pk=pk).delete(); return Response({'success': True}, status=204)
        except Project.DoesNotExist: return Response({'error': 'Not found'}, status=404)

class AvailabilityStatusView(APIView):
    def get(self, request):
        status_obj = AvailabilityStatus.get_status()
        return Response(AvailabilityStatusSerializer(status_obj).data)
    def patch(self, request):
        status_obj = AvailabilityStatus.get_status()
        s = AvailabilityStatusSerializer(status_obj, data=request.data, partial=True)
        if s.is_valid(): s.save(); return Response(s.data)
        return Response(s.errors, status=400)

class SiteSettingsView(APIView):
    def get(self, request):
        settings_obj = SiteSettings.get_settings()
        return Response(SiteSettingsSerializer(settings_obj).data)
    def patch(self, request):
        settings_obj = SiteSettings.get_settings()
        s = SiteSettingsSerializer(settings_obj, data=request.data, partial=True)
        if s.is_valid(): s.save(); return Response(s.data)
        return Response(s.errors, status=400)

