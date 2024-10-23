// Основная логика
document.getElementById('authButton').addEventListener('click', () => {
    window.location.href = generateAuthUrl();
});

window.onload = async () => {
    const code = getQueryParam('code');

    if (code) {
        // Если код присутствует в URL, получить access_token
        const accessToken = await fetchAccessToken(code);

        if (accessToken) {
            // Сохраняем accessToken в localStorage
            localStorage.setItem('discordAccessToken', accessToken);
            // Перенаправляем пользователя на безопасную страницу или сообщаем о успешном получении токена
            window.location.href = 'https://new-user12345.github.io/login/discord/index.html'; // замените на ваш редирект URL
        } else {
            document.getElementById('token').textContent = 'Failed to get access token.';
        }
    }
};
