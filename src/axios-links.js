import axios from 'axios';

const instance = axios.create(
   {
       baseURL : 'https://burgerbuilderreact-bcb85.firebaseio.com/'
   } 
)

export default instance;