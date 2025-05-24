      resolve("Acceso concedido");
    } else {
      reject("Acceso denegado");
    }
  });
}

verificarUsuario("admin")
  .then((mensaje) => console.log(mensaje))
  .catch((error) => console.error(error));

verificarUsuario("Carol")
  .then((mensaje) => console.log(mensaje))
  .catch((error) => console.error(error));
