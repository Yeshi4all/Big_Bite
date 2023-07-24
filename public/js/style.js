<script>
    function checkAuthentication() {
        fetch('/checkAuth')
            .then(response => response.json())
            .then(data => {
                const loginLogoutLink = document.getElementById('loginLogoutLink');

                if (data.isAuthenticated) {
                    loginLogoutLink.textContent = 'Logout';
                    loginLogoutLink.href = '/logout';
                    loginLogoutLink.dataset.auth = 'true';
                } else {
                    loginLogoutLink.textContent = 'Login';
                    loginLogoutLink.href = '/login';
                    loginLogoutLink.dataset.auth = 'false';
                }

                // Enable or disable the link based on the authentication status
                loginLogoutLink.disabled = loginLogoutLink.dataset.auth === 'false';
            })
            .catch(error => {
                console.error(error);
            })
    }

    // Call the checkAuthentication function when the page loads
    checkAuthentication();
</script>
