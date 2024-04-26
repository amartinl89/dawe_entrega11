

async function borrarCliente(id){
    try {
            const response = await fetch("/user/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id }) // Enviar el ID como objeto JSON
        });
        if (response.ok) {
            // Recargar la página después de eliminar exitosamente
            window.location.reload();
        } else {
            console.error('Error al eliminar cliente:', response.statusText);
        }
    }  catch (error) {
        console.error('Error al eliminar cliente:', error);
    }
}

async function seleccionarCliente(id){
    try {
            const response = await fetch("/user/select", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id }) // Enviar el ID como objeto JSON
        });
        if (response.ok) {
            // Redirigir a la URL con el parámetro clienteEditar
            //const redirectUrl = `/user?clienteEditar=${id}`;
            //window.location.href = redirectUrl;
            const redirectUrl = await response.url;
            console.error('Redirigiendo a:', redirectUrl);
            window.location.href = redirectUrl;
        } else {
            console.error('Error al seleccionar cliente:', response.statusText);
        }
        
    }  catch (error) {
        console.error('Error al  eliminar cliente:', error);
    }
}

async function logoutUser() {
    try {
        const response = await fetch("http://143.198.249.125:3000/logout", {
            method: "GET"
        });
        if (response.ok) {
            const redirectUrl = await response.url;
            console.error('Redirigiendo a:', redirectUrl);
            window.location.href = redirectUrl;
        } else {
            console.error('Error al cerrar sesión:', response.statusText);
        }
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
}



