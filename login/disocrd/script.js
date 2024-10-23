const clientId = '1298616944437628999';  // Замените на ваш Client ID
const redirectUri = 'https://new-user12345.github.io/login/disocrd/index.html';
const scope = 'identify email';  // Запрашиваемые разрешения

// Функция для создания URL для авторизации
function generateAuthUrl() {
    const authUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}`;
    return authUrl;
}

// Функция для получения параметров из URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Функция для обмена авторизационного кода на токен доступа
async function fetchAccessToken(code) {
    const clientSecret = 'DdEEq-hDL74jfwXCeXXcSwgNvV6Qd8qY';  // Замените на ваш Client Secret
    const tokenUrl = 'https://discord.com/api/oauth2/token';

    const body = new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri
    });

    try {
        const response = await fetch(tokenUrl, {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error('Error fetching access token:', error);
    }
}

// Основная логика
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('authButton').addEventListener('click', () => {
        window.location.href = generateAuthUrl();
    });

    const code = getQueryParam('code');

    if (code) {
        // Если код присутствует в URL, получить access_token
        fetchAccessToken(code).then(accessToken => {
            if (accessToken) {
                // Сохраняем accessToken в localStorage
                localStorage.setItem('discordAccessToken', accessToken);
                // Перенаправляем пользователя на безопасную страницу или сообщаем о успешном получении токена
                window.location.href = 'https://new-user12345.github.io/login/discord/index.html'; // замените на ваш редирект URL
            } else {
                document.getElementById('token').textContent = 'Failed to get access token.';
            }
        });
    }
});
