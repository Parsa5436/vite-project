export const register = async (email, password) => {
    const response = await fetch('http://localhost:5173/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }
};



export const login = async (email, password) => {
    const response = await fetch(`http://localhost:5173/users?email=${email}&password=${password}`);
    const users = await response.json();

    if (users.length === 0) {
        throw new Error('Invalid email or password');
    }
};
