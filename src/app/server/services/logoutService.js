const userService = {
    logout,
};

async function logout(token) {
    try {
        
        let apiUrl = process.env.API_URL+'/v1/logout'
        
        const response = await fetch(apiUrl, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
  
        if (!response.ok) {
          throw new Error('unable to logout');
        }
  
        const data = await response.json();
        console.log('Protected data:', data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export default userService;