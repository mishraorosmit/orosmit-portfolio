from rest_framework import generics, status
from rest_framework.response import Response
from .models import Writing
from .serializers import WritingSerializer

class WritingListAPIView(generics.ListAPIView):
    queryset = Writing.objects.all().order_by('-created_at')
    serializer_class = WritingSerializer
    
    def list(self, request, *args, **kwargs):
        try:
            return super().list(request, *args, **kwargs)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class WritingDetailAPIView(generics.RetrieveAPIView):
    queryset = Writing.objects.all()
    serializer_class = WritingSerializer
    
    def retrieve(self, request, *args, **kwargs):
        try:
            return super().retrieve(request, *args, **kwargs)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
