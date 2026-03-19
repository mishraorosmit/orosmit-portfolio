from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Writing
from .serializers import WritingSerializer

class WritingListView(APIView):
    def get(self, request):
        writings = Writing.objects.all().order_by('-id')
        return Response(WritingSerializer(writings, many=True).data)

class WritingDetailView(APIView):
    def get(self, request, pk):
        try:
            w = Writing.objects.get(pk=pk)
            return Response(WritingSerializer(w).data)
        except Writing.DoesNotExist: return Response({'error': 'Not found'}, status=404)

class WritingCreateView(APIView):
    def post(self, request):
        s = WritingSerializer(data=request.data)
        if s.is_valid(): s.save(); return Response(s.data, status=201)
        return Response(s.errors, status=400)

class WritingUpdateView(APIView):
    def put(self, request, pk):
        try:
            w = Writing.objects.get(pk=pk)
            s = WritingSerializer(w, data=request.data, partial=True)
            if s.is_valid(): s.save(); return Response(s.data)
            return Response(s.errors, status=400)
        except Writing.DoesNotExist: return Response({'error': 'Not found'}, status=404)
    def patch(self, request, pk): return self.put(request, pk)

class WritingDeleteView(APIView):
    def delete(self, request, pk):
        try: Writing.objects.get(pk=pk).delete(); return Response({'success': True}, status=204)
        except Writing.DoesNotExist: return Response({'error': 'Not found'}, status=404)

