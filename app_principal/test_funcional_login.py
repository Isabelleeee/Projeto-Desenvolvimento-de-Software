#Versão do teste para o navegador EDGE

import time
from selenium import webdriver
from selenium.webdriver.common.by import By

SUPERUSER_USERNAME = 'giovanna'
SUPERUSER_PASSWORD = '20042001'
LIVE_SERVER_URL = 'http://127.0.0.1:8000/admin/'

# --- O TESTE ---
# Inicializa o driver do Edge
print("Inicializando o WebDriver do Edge...")
driver = webdriver.Edge()
print("WebDriver inicializado.")

try:
    print("Iniciando teste funcional de login...")

    # 1. Navegar para a URL
    driver.get(LIVE_SERVER_URL)
    print(f"Navegando para {LIVE_SERVER_URL}")
    time.sleep(2) # Pausa para a página carregar

    # 2. Encontrar campos e preencher
    print("Encontrando campos de usuário e senha...")
    username_input = driver.find_element(By.ID, 'id_username')
    password_input = driver.find_element(By.ID, 'id_password')
    print("Campos encontrados.")

    username_input.send_keys(SUPERUSER_USERNAME)
    password_input.send_keys(SUPERUSER_PASSWORD)
    print("Preencheu usuário e senha.")
    time.sleep(1)

    # 3. Encontrar e clicar no botão de login
    print("Encontrando botão de login...")
    login_button = driver.find_element(By.CSS_SELECTOR, 'input[type="submit"]')
    print("Botão encontrado.")
    login_button.click()
    print("Clicou em 'Log in'.")
    time.sleep(3) # Pausa para a página de admin carregar

    # 4. Verificação
    print("Verificando se o login foi bem-sucedido...")
    body_text = driver.find_element(By.TAG_NAME, 'body').text
    # Verifica se algum texto esperado está na página pós-login
    if "Bem-vindo" in body_text or "ADMINISTRAÇÃO ESTUDAAI" in body_text.upper() or "Site administration" in body_text:
        print("VERIFICAÇÃO: OK - Login realizado com sucesso!")
        print("Status do Teste: Sucesso")
    else:
        print("VERIFICAÇÃO: FALHA - Não foi possível confirmar o login. Texto da página:")
        print("--------------------")
        print(body_text[:500]) # Mostra os primeiros 500 caracteres da página
        print("--------------------")
        print("Status do Teste: Falha")

except Exception as e:
    print(f"Ocorreu um erro durante o teste: {e}")
    print("Status do Teste: Falha")

finally:
    # Fecha o navegador no final
    print("Teste finalizado. Fechando o navegador...")
    if 'driver' in locals() and driver:
        driver.quit()
    print("Navegador fechado.")