export const token = localStorage.getItem("accessToken");

//console.log(token);

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    console.error("No refresh token found.");
    return null;
  }

  try {
    const response = await fetch("/api/refresh_token", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${refreshToken}`, 
      },
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("accessToken", data.access_token);
      return data.access_token; 
    } else {
      console.error("Failed to refresh access token.");
      const errorData = await response.json();
      console.error("Error details:", errorData);
      return null;
    }
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
};


setInterval(() => {
  refreshAccessToken();
}, 10 * 60 * 1000);
