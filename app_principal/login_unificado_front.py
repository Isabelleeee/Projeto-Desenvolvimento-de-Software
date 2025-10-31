# app_principal/login_unificado_front.py
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.urls import reverse
from django.conf import settings

def login_unificado_view(request):
    error = None

    if request.method == 'POST':
        username = request.POST.get('username', '').strip()
        password = request.POST.get('password', '').strip()
        profile_type = request.POST.get('profile_type', 'estudante').strip()

        if not username or not password:
            error = "Usuário e senha são obrigatórios."
        else:
            user = authenticate(request, username=username, password=password)
            if user is None:
                error = "Credenciais inválidas."
            else:
                # validação de tipo
                if profile_type == 'admin' and not user.is_staff:
                    error = "Este usuário não tem permissão de Administrador."
                elif profile_type == 'estudante' and user.is_staff:
                    error = "Contas de administrador não podem acessar o portal do estudante."
                else:
                    # loga o usuário e redireciona conforme tipo
                    login(request, user)

                    if profile_type == 'admin':
                        return redirect(reverse('admin:index'))

                    # pega o redirect do settings ou usa fallback
                    redirect_url = getattr(settings, 'LOGIN_REDIRECT_URL', '/area-estudante/')
                    return redirect(redirect_url)

    return render(request, 'login_unificado_front.html', {'error': error})
