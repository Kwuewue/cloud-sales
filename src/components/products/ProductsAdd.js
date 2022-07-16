import React from "react";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import { useNavigate } from "react-router-dom";
import config from './../../helpers/config.json';

const ProductsAdd = () => {
    let navigate = useNavigate(); 
    const cancel = () => {
        var {productName, MSU, price, stock, MDPrice, MDPercentage} = document.forms[0]; 
        var hasChanges = productName.value.length > 0 ||  MSU.value.length > 0 || price.value.length > 0 || stock.value.length > 0 ||
            MDPrice.value.length > 0 || MDPercentage.value.length > 0;
        if(hasChanges){
            if(window.confirm("Existen cambios sin guardar. ¿Seguro de querer cancelar?")){
                navigate("/products");
            }
        } else {
            navigate("/products")
        }
    }

    const save = async (event) => {
        event.preventDefault();
        var {productName, MSU, price, stock, MDPrice, MDPercentage} = document.forms[0];
        var errors = "";
        errors += parseInt(MDPrice.value) > (parseInt(price) / 2) ? "El descuento por precio no puede superar la mitad del unitario.\n": "";
        errors += parseInt(MDPercentage.value) > 51 ? "El descuento por descuento no puede superar el 50%.\n": "";
        if(errors.length > 0){
            window.alert("Corrija los siguientes errores:\n"+errors);
        } else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ "operatorId": config.operatorId, "name": productName.value,"MSU": MSU.value,"price": price.value,"stock": stock.value,
                "MDPrice": MDPrice.value,"MDPercentage": MDPercentage.value})
              }
              fetch(config.apiURL+"products", requestOptions).then((response) => {
                switch(response.status){
                  case 400:
                    console.log("consulta mal formada");
                    break;
                  case 403:
                    console.log("acceso prohibido");
                    break;
                  default:
                    //
                }
                return response.json();
              }).then((result) => {
                  window.alert("Regitro existoso");
                  navigate("/products");
              })
        }
    }
    return (
        <div>
            <Topbar/>
            <Sidebar/>
        </div>
    )
}

export default ProductsAdd;