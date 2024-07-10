const userService = {
    authenticate,
};
  
async function authenticate(email, password) {
    try {
        const data = {
            email: email,
            password: password,
        }

        let apiUrl = process.env.API_URL+'/v1/login';

        let response = await fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
          const res = await response.json();
          return res
        } else {
          console.log("HTTP error! Status:", response.status)
          const res = await response.json();
          console.log("HTTP error :", res.message)
          return null;
        }
      } catch (error) {
        console.log("Error", error)
    }
}

export default userService;