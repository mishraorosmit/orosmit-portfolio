from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings
from .serializers import ContactMessageSerializer

class ContactTestAPIView(APIView):
    def get(self, request, *args, **kwargs):
        if not getattr(settings, 'DEBUG', False):
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            send_mail(
                subject="Test Contact Form Email",
                message="This is a test email from the portfolio contact system.",
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=['study.orosmit21@gmail.com'],
                fail_silently=False,
            )
            return Response({'success': True, 'message': 'Test email sent successfully!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ContactAPIView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            serializer = ContactMessageSerializer(data=request.data)
            if serializer.is_valid():
                # Check honeypot
                if serializer.validated_data.get('website'):
                    return Response({'success': True}, status=status.HTTP_200_OK)
                
                contact = serializer.save()

                try:
                    send_mail(
                        subject=f"New Portfolio Contact from {contact.name}",
                        message=f"Name: {contact.name}\nEmail: {contact.email}\n\nMessage:\n{contact.message}",
                        from_email=settings.EMAIL_HOST_USER,
                        recipient_list=['study.orosmit21@gmail.com'],
                        fail_silently=False,
                    )
                except Exception as e:
                    pass

                return Response({'success': True}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
