// User authentication and storage handling
class Auth {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Login form submission
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Register form submission
        document.getElementById('registerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister();
        });

        // Password strength checker
        document.getElementById('registerPassword').addEventListener('input', (e) => {
            this.checkPasswordStrength(e.target.value);
        });

        // Login button click
        document.getElementById('loginButton').addEventListener('click', () => {
            openModal('loginModal');
        });

        // Register button click
        document.getElementById('registerButton').addEventListener('click', () => {
            openModal('registerModal');
        });
    }

    handleLogin() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        const user = this.users.find(u => u.email === email && u.password === password);

        if (user) {
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            closeModal('loginModal');
            this.updateUIForLoggedInUser();
            showToast('Successfully logged in!', 'success');
        } else {
            showToast('Invalid email or password', 'error');
        }
    }

    handleRegister() {
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        if (this.users.some(u => u.email === email)) {
            showToast('Email already registered', 'error');
            return;
        }

        const newUser = {
            id: Date.now(),
            name,
            email,
            password,
            createdAt: new Date().toISOString()
        };

        this.users.push(newUser);
        localStorage.setItem('users', JSON.stringify(this.users));
        
        this.currentUser = newUser;
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        closeModal('registerModal');
        this.updateUIForLoggedInUser();
        showToast('Account created successfully!', 'success');
    }

    checkPasswordStrength(password) {
        const strengthBar = document.getElementById('passwordStrength');
        const strength = this.calculatePasswordStrength(password);
        
        strengthBar.style.width = `${strength}%`;
        strengthBar.style.backgroundColor = 
            strength < 33 ? '#ff4444' :
            strength < 66 ? '#ffbb33' : '#00C851';
    }

    calculatePasswordStrength(password) {
        let strength = 0;
        
        if (password.length >= 8) strength += 25;
        if (password.match(/[A-Z]/)) strength += 25;
        if (password.match(/[0-9]/)) strength += 25;
        if (password.match(/[^A-Za-z0-9]/)) strength += 25;
        
        return strength;
    }

    updateUIForLoggedInUser() {
        const authButtons = document.getElementById('authButtons');
        if (this.currentUser) {
            authButtons.innerHTML = `
                <div class="user-menu">
                    <div class="user-welcome" onclick="toggleUserMenu()">
                        <span>${this.currentUser.name}</span>
                        <svg width="12" height="12" viewBox="0 0 12 12">
                            <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </div>
                    <div class="user-menu-dropdown" id="userMenu">
                        <a href="#" class="user-menu-item">Profile</a>
                        <a href="#" class="user-menu-item">Settings</a>
                        <a href="#" class="user-menu-item" onclick="auth.logout()">Logout</a>
                    </div>
                </div>
            `;
        } else {
            authButtons.innerHTML = `
                <button class="btn-secondary" id="loginButton" onclick="openModal('loginModal')">Sign In</button>
                <button class="btn-primary" id="registerButton" onclick="openModal('registerModal')">Sign Up</button>
            `;
        }
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        location.reload();
    }
}

// Toast notification system
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Modal handling
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function switchModal(closeId, openId) {
    closeModal(closeId);
    openModal(openId);
}

// Initialize authentication
const auth = new Auth(); 

// Add this function to handle the user menu
function toggleUserMenu() {
    const userMenu = document.getElementById('userMenu');
    userMenu.classList.toggle('show');
}

// Close user menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.user-menu')) {
        const userMenu = document.getElementById('userMenu');
        if (userMenu) {
            userMenu.classList.remove('show');
        }
    }
}); 