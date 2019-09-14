import React, { Component } from "react";
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css';

export default class Main extends Component {
  state = { //Lembre-se do state e useState
    products: [],
    productInfo: {},
    page: 1,
  };

  componentDidMount(){
    this.loadProducts();
  }

  loadProducts = async (page = 1) => {
    const response = await api.get(`/products?page=${page}`);

    const { docs, ...productInfo } = response.data; // { docs, resto } de response.data

    this.setState({ products: docs, productInfo, page });
    // console.log(response); //Aqui vai mostrar todo o conteúdo "da resposta"
    // console.log(response.data.docs); //Aqui estamos selecionando o que queremos, os documentos em data... Logo, fica > response.data.docs
  };

  prevPage = () => {
    const { page } = this.state;

    if(page === 1) return;

    const pageNumber = page - 1;

    this.loadProducts(pageNumber);
  }
  
  nextPage = () => {
    const { page, productInfo } = this.state;

    if(page === productInfo.pages) return;

    const pageNumber = page + 1;

    this.loadProducts(pageNumber);
  }

  render(){
    //return <h1>Contagem de produtos: {this.state.products.length}</h1>

    const { products, page, productInfo } = this.state;

    return (
      <div className="product-list">
        {products.map( product => ( //A função .map() serve para percorrer o array/"objeto"
          //<h2 key={product._id}>{product.title}</h2>
          <article key={product._id}>
            <strong>{product.title}</strong>
            <p>{product.description}</p>

            <Link to={`/products/${product._id}`}>Acessar</Link>
          </article>
        ))}
        <div className='actions'>
          <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
          <button disabled={page === productInfo.pages} onClick={this.nextPage}>Próxima</button>
        </div>
      </div>
    );
  }
}