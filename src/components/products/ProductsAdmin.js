import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import { Link, useNavigate } from "react-router-dom";
import config from './../../helpers/config.json';
import { render } from "@testing-library/react";

class ProductsAdmin extends React.Component{
    state={
        productList: []
    }
    componentDidMount(){
        const requestOptions = {
            method: 'GET', headers: {'Content-Type': 'application/json'}
        };
        fetch(config.apiURL+"products/"+config.operatorId, requestOptions).then((response)=>{
            return response.json();
        }).then((result)=>{
            this.setState({productList: result.data.map((product)=>{return product;})});
        });
    }
    render(){
        let rowData;
        if(this.state.productList.length ===0){
            rowData = <tr><td colSpan="4" className="text-center">No existen productos</td></tr>;
        }else{
            rowData=this.state.productList.map(p=>{
                let button;
                if(p.active){
                    button=<button className="btn btn-secondary"><i className="fas fa-eye-slash"></i>Deshabilitar</button>;
                }else{
                    button=<button className="btn btn-secondary"><i className="fas fa-eye"></i>Habilitar</button>;
                }
                return(<tr>
                    <td>{p.name}</td><td className="text-right">${p.price}</td><td className="text-right">{p.stock}</td>
                    <td>
                        {button}
                    </td>
                </tr>);
            });
        }
        return(
            <div>
                <Topbar/>
                <Sidebar/>
            </div>
        )
    }
}
export default ProductsAdmin;