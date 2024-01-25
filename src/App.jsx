import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [empleados, setEmpleados] = useState([]);

  const url = "https://fullstack-deploy-production.up.railway.app";
  
  const obtener = async () => {
    try {
      const respuesta = await fetch(`${url}/get`);
      
      const data = await respuesta.json();
      
      setEmpleados(data);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };
  

  useEffect(() => {
    obtener();
  }, []);

  return (
    <>
      <h1>buenas</h1>
      <div>
        {/* {empleados.map((empleado) => {
          return (
            <div key={empleado.id}>
              <p>{empleado.nombre}</p>
            </div>
          );
        })} */}
      </div>
    </>
  );
}

export default App;
