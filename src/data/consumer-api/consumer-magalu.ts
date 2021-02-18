import axios from 'axios'

export class ConsumerMagalu {
  constructor(){

  }

  async getProduct(id: string): Promise<any> {
    return axios.get<any>(`http://challenge-api.luizalabs.com/api/product/${id}/`)
    .then((response) => {
        console.log('response axios', response.data);
        return response.data
    })
    .catch((error) => { throw new Error(error) })
  }  
}


