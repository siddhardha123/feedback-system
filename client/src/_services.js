const getSubmissions = async () => {
    try {
      const response = await fetch('http://localhost:3000');
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Data:', data); // Handle the data received from the server
      return data; // Optionally, return the data
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
      throw error; // Optionally, re-throw the error to handle it elsewhere
    }
  }
  
  export {
      getSubmissions,
  }
  