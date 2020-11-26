from rest_framework.decorators import api_view


@api_view(['GET', 'POST'])
def test(request):
    print('hit it')