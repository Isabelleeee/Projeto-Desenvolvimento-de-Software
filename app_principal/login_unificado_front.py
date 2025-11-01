# app_principal/login_unificado_front.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.conf import settings
import json

@csrf_exempt
def login_unificado_view(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Método não permitido'}, status=405)

    try:
        data = json.loads(request.body.decode('utf-8'))
    except json.JSONDecodeError:
        return JsonResponse({'error': 'JSON inválido'}, status=400)

    username = data.get('username', '').strip()
    password = data.get('password', '').strip()
    profile_type = data.get('profile_type', 'estudante').strip()

    if not username or not password:
        return JsonResponse({'error': 'Usuário e senha são obrigatórios.'}, status=400)

    user = authenticate(request, username=username, password=password)
    if user is None:
        return JsonResponse({'error': 'Credenciais inválidas.'}, status=401)

    # validação de tipo
    if profile_type == 'admin' and not user.is_staff:
        return JsonResponse({'error': 'Usuário não tem permissão de Administrador.'}, status=403)
    elif profile_type == 'estudante' and user.is_staff:
        return JsonResponse({'error': 'Administradores não podem acessar o portal do estudante.'}, status=403)

    login(request, user)

    if profile_type == 'admin':
        redirect_url = f"{request.build_absolute_uri('/admin/')}"
    else:
        redirect_url = getattr(settings, 'FRONTEND_URL', 'http://localhost:3000/')

    return JsonResponse({
        'message': 'Login realizado com sucesso.',
        'redirect_url': redirect_url,
        'user': user.username,
        'profile_type': profile_type
    })
@csrf_exempt
def api_login_unificado(request):
    """
    Endpoint de login usado pelo front em React.
    Retorna JSON com redirecionamento baseado no tipo de usuário.
    """
    if request.method != 'POST':
        return JsonResponse({'error': 'Método não permitido'}, status=405)

    import json
    data = json.loads(request.body.decode('utf-8'))
    username = data.get('username', '').strip()
    password = data.get('password', '').strip()
    profile_type = data.get('profile_type', 'estudante').strip()

    from django.contrib.auth import authenticate, login

    user = authenticate(username=username, password=password)
    if user is None:
        return JsonResponse({'error': 'Credenciais inválidas'}, status=401)

    if profile_type == 'admin' and not user.is_staff:
        return JsonResponse({'error': 'Usuário não tem permissão de administrador.'}, status=403)
    elif profile_type == 'estudante' and user.is_staff:
        return JsonResponse({'error': 'Contas de administrador não podem acessar o portal do estudante.'}, status=403)

    login(request, user)

    # Retorna o destino correto
    if profile_type == 'admin':
        return JsonResponse({'redirect': '/admin/'})
    else:
        return JsonResponse({'redirect': 'http://localhost:3000/dashboard'})